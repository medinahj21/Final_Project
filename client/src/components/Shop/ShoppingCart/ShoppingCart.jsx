import { useSelector } from "react-redux";

import CartProduct from "./CartProduct";

import { ToastContainer, toast } from "react-toastify";

import "./ShoppingCart.css";
import axios from "axios";

const ShoppingCart = () => {
  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);
  const totalInCart = productsInCart?.map((item) => item.quant);
  const total = totalInCart?.length > 0 && totalInCart?.reduce((a, b) => a + b);

  const notify = (message) => toast.success(message);
  const notifyError = (message) =>
    toast.error(message, {
      hideProgressBar: true,
      theme: "colored",
    });

  const handleCheckout = (e) => {
    console.log(productsInCart.length);
    if (!productsInCart.length) {
      notifyError("No hay productos en el carrito");
    } else {
      notify("Empezando proceso de compra, no recargues la página");
      try {
        let productRequests = [];
        productsInCart.forEach((prod) => {
          let add = Array(prod.quant).fill({
            infoProduct: prod.product.modifiers,
            productId: prod.product.id,
            playerId: userInfoFirestore.uid,
          });
          productRequests = [...productRequests, ...add];
        });

        productRequests.forEach(async (pr) => {
          axios.post(`${axios.defaults.baseURL}/productRequests/create`, pr);
        });

        notify("Ahora puedes ver tus solicitudes de producto en tu dashboard");

        


        console.log("Checkout");
      } catch (error) {
        console.log(error);
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
            {productsInCart
              ?.filter((item) => item?.quant !== 0)
              ?.map((prod, index) => {
                return <CartProduct key={index} prod={prod} />;
              })}
          </ul>
        ) : (
          <h3 className="main-color-text">
            Aún no hay productos en el carrito
          </h3>
        )}

        {!userInfoFirestore.isAdmin && (
          <a href="#!" className="button" onClick={handleCheckout}>
            Comprar
          </a>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
