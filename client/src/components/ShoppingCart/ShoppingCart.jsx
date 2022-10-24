import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import Modal from "../UI/Modal";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);

  return (
    <Modal>
      <div className="cart_container">
        <h3>Carrito de Compras</h3>
        {productsInCart
          ?.filter((item) => item.quant !== 0)
          .map((prod, index) => {
            return <CartProduct key={index} prod={prod} />;
          })}
        <div>
          <h3>Total</h3>
          <h4>
            ${" "}
            {productsInCart?.reduce(
              (a, item) => a + item.product.price * item.quant,
              0
            )}
            .00
          </h4>
        </div>
      </div>
    </Modal>
  );
};

export default ShoppingCart;
