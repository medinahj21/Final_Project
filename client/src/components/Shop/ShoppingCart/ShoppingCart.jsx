import { useDispatch, useSelector } from "react-redux";

import CartProduct from "./CartProduct";

import { ToastContainer, toast } from "react-toastify";

import "./ShoppingCart.css";
import axios from "axios";
import { clearCart } from "../../../redux/actions/shoppingCart";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const { allProducts } = useSelector((state) => state.productsReducer);
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);
  const totalInCart = productsInCart?.map((item) => item.quant);
  const total = totalInCart?.length > 0 && totalInCart?.reduce((a, b) => a + b);

  const notify = (message) =>
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    });
  const notifyError = (message) =>
    toast.error(message, {
      hideProgressBar: true,
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });

  const handleCheckout = () => {
    //console.log("checkouut");
    if (!productsInCart.length) {
      notifyError("No hay productos en el carrito");
    } else {
      if (window.confirm("¿Desea confirmar esta compra?")) {
        notify("Empezando proceso de compra, no recargues la página");
        const paymentDate = (product) => {
          var options = { year: "numeric", month: "2-digit", day: "2-digit" };
          const day = new Date();
          day.setDate(day.getDate() + Number(product.paymentTerm));
          const array = day.toLocaleDateString("es-US", options).split("/");
          const formatedDate = [array[2], array[1], array[0]].join("-");
          return formatedDate;
        };
        const formatModifiers = (mod) => {
          return JSON.stringify(mod) !== "{}"
            ? JSON.stringify(mod)
                .replace("{", "")
                .replace("}", "")
                .replaceAll('"', " ")
            : " ";
        };
        // ---------------- genero las órdenes -----------------------------------
        try {
          let newOrders = [];
          productsInCart.forEach((item) => {
            const product = allProducts.find(
              (products) => products.id === item.product.id
            );
            const add = Array(item.quant).fill({
              value: product.price,
              concept: `Compra por tienda de ${product.name.toLowerCase()}`,
              description: formatModifiers(item.product.modifiers), //Revisar formato
              order_state: "Pending", //validar según el caso de la pasarela de pago y método de pago.
              payment_date: product.paymentTerm,
              payment_mode: "App", //validar según el caso de la pasarela de pago y método de pago.
              payment_term: paymentDate(product).toString(),
              type_order: "product",
              product: product.id,
              playerId: userInfoFirestore.uid,
            });

            newOrders = [...newOrders, ...add];
          });

          newOrders.forEach(async (order) => {
            await axios.post(`${axios.defaults.baseURL}/orders/create`, order);
          });
          notify("Órdenes creadas");
        } catch (error) {
          notifyError("No se generaron las órdenes");
          console.log({ error_order: error });
        }

        // ---------------- genero las product requests --------------------------
        try {
          let productRequests = [];
          productsInCart.forEach((prod) => {
            // falta hacer confirmación por stock-orden
            let add = Array(prod.quant).fill({
              infoProduct: prod.product.modifiers,
              productId: prod.product.id,
              playerId: userInfoFirestore.uid,
            });
            productRequests = [...productRequests, ...add];
          });

          productRequests.forEach(async (pr) => {
            await axios.post(
              `${axios.defaults.baseURL}/productRequests/create`,
              pr
            );
          });
          notify("Solicitudes de producto creadas");
        } catch (error) {
          notifyError("No se generaron las solicitudes de producto");
          console.log({ error_pr: error });
        }

        // ---------------- genero los eventos -----------------------------------
        try {
          let newEvents = [];

          productsInCart.forEach((item) => {
            const product = allProducts.find(
              (products) => products.id === item.product.id
            );
            let add = Array(1).fill({
              name: `pago de ${product.name.toLowerCase()}`,
              location:
                "Puedes realizar el pago en el dashboard componente de perfil", //modificar a link
              start: "00:00:00",
              end: "23:59:59",
              date: [paymentDate(product).toString().split("T")[0]],
              description: `Fecha máxima de pago de ${
                product.name
              } | ${formatModifiers(item.product.modifiers)}`,
              repetitive: false,
              state: "Pending",
              player: userInfoFirestore.uid,
            });

            newEvents = [...newEvents, ...add];
          });

          newEvents.forEach(async (event) => {
            await axios.post(`${axios.defaults.baseURL}/events/create`, event);
          });
          notify("Eventos creados");
        } catch (error) {
          notifyError("No se generaron los eventos");
          console.log({ error_events: error });
        }
        
        dispatch(clearCart());
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          <i className="fa fa-shopping-cart cart-icon"></i>
          <span className="badge">{total}</span>
          <div className="shopping-cart-total">
            <span className="lighter-text">Total: </span>
            <span className="main-color-text">
              $
              {productsInCart?.reduce(
                (a, item) => a + item.product.price * item.quant,
                0
              )}
            </span>
          </div>
        </div>
        {productsInCart?.length ? (
          <ul className="shopping-cart-items">
            {productsInCart?.map((prod, index) => {
              return <CartProduct key={index} prod={prod} />;
            })}
          </ul>
        ) : (
          <h4 className="main-color-text">
            Aún no hay productos en el carrito
          </h4>
        )}

        {!userInfoFirestore.isAdmin && (
          <a href="#!" className="button" onClick={() => handleCheckout()}>
            Comprar
          </a>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
