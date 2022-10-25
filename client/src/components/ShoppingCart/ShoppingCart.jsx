import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import Modal from "../UI/Modal";
import "./ShoppingCart.css";

const ShoppingCart = ({setShowCart}) => {
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);

  return (
    <Modal>
      { productsInCart.length?
        <div className="cart_container">
        <button onClick={()=>setShowCart(false)}> X </button>
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
          </h4>
          <button className="modify__button">Comprar</button>
        </div>
      </div>
      :
      <>
        <button onClick={()=>setShowCart(false)}> X </button>
        <h2>Aún no hay productos en el carrito</h2>      
      </>
    }
    </Modal>
  );
};

export default ShoppingCart;
