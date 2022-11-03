import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import { notify, notifyError } from "../utils/toastify";

import {
  cleanProductDetail,
  getFilterTags,
  getProducts,
} from "../redux/actions/products";
import { updatePlayerCart } from "../redux/actions/player";
import { clearCart } from "../redux/actions/shoppingCart";

import CreateProduct from "../components/Shop/CreateProducts/CreateProduct";
import ShowProducts from "../components/Shop/ProductCard/ShowProducts";
import SearchbarProduct from "../components/Shop/navbarshop/SearchbarProduct";
import Modal from "../components/UI/Modal";
import ContactForm from "../components/ContactForm/ContactForm";

import "./Shop.css";
const customId = "custom-id-yes";

const notifyPayment = (message) => {
  toast(message, { toastId: customId, position: toast.POSITION.TOP_CENTER });
};

function Shop() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [creationDiv, setCreationDiv] = useState(false);
  const [paymentStatus, setPaymenStatus] = useState(false);

  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const { allProducts } = useSelector((state) => state.productsReducer);
  const { cart } = useSelector((state) => state.shoppingCartReducer);

  useEffect(() => {
    if (!userInfoFirestore.isAdmin)
      dispatch(updatePlayerCart(userInfoFirestore.uid, cart));
  }, [dispatch, cart, userInfoFirestore]);

  useEffect(() => {
    dispatch(getProducts(userInfoFirestore.isAdmin));
    dispatch(getFilterTags());
    dispatch(cleanProductDetail());
  }, [dispatch]);

  useEffect(() => {
    console.log(location);
    setPaymenStatus(
      location.search.split("&").filter((d) => d.includes("status"))
    );
  }, [location.search]);

  const paymentDate = () => {
    var options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const day = new Date();
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

  if (
    paymentStatus[0]?.includes("approved") ||
    paymentStatus[1]?.includes("approved")
  ) {
    notifyPayment("Pago realizado");
    if (!cart.length) {
      notifyError("No hay productos en el carrito");
    } else {
      // ---------------- genero las órdenes -----------------------------------
      try {
        let newOrders = [];
        cart.forEach((item) => {
          const product = allProducts.find(
            (products) => products.id === item.product.id
          );

          const add = Array(item.quant).fill({
            value: product.price,
            concept: `Compra por tienda de ${product.name.toLowerCase()}`,
            description: formatModifiers(item.product.modifiers), //Revisar formato
            order_state: "Paid", //validar según el caso de la pasarela de pago y método de pago.
            payment_mode: location.search
              .split("&")
              .filter((d) => d.includes("payment_type"))[0]
              .split("=")[1], //validar según el caso de la pasarela de pago y método de pago.
            payment_term: product.paymentTerm,
            type_order: "product",
            product: product.id,
            playerId: userInfoFirestore.uid,
            payment_date: paymentDate(),
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
        cart.forEach((prod) => {
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

      dispatch(clearCart());
      //re-direct a pagos y deudas
    }
  }

  if (
    paymentStatus[0]?.includes("pending") ||
    paymentStatus[1]?.includes("pending")
  ) {
    notifyPayment("Recuerda hacer tu pago en los próximos 4 días");
    if (cart.length) dispatch(clearCart());
    if (!cart.length) {
      notifyError("No hay productos en el carrito");
    }
  }

  if (
    paymentStatus[0]?.includes("null") ||
    paymentStatus[1]?.includes("null")
  ) {
    notifyError("No se pudo realizar el pago");
    if (!cart.length) {
      notifyError("No hay productos en el carrito");
    }
  }

  return (
    <div className="shop__container">
      <SearchbarProduct setCreationDiv={setCreationDiv} />
      <ToastContainer />
      {creationDiv ? (
        <Modal clickHandler={() => setCreationDiv(false)}>
          {" "}
          <CreateProduct setCreationDiv={setCreationDiv} />{" "}
        </Modal>
      ) : (
        <></>
      )}
      <ShowProducts />
      <div className="home_footer">
        <ContactForm />
      </div>
    </div>
  );
}

export default Shop;

/* 
  
      
      const formatModifiers = (mod) => {
        return JSON.stringify(mod) !== "{}"
          ? JSON.stringify(mod)
              .replace("{", "")
              .replace("}", "")
              .replaceAll('"', " ")
          : " ";
      };
        
    
      }
    }
  };
 */
