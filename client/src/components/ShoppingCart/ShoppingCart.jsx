import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";

import "./ShoppingCart.css";

const ShoppingCart = () => {
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);

  const totalInCart = productsInCart.map((item) => item.quant);

  const total = totalInCart.reduce((a, b) => a + b);

  return (
    <>
      <div class="shopping-cart">
        <div class="shopping-cart-header">
          <i class="fa fa-shopping-cart cart-icon"></i>
          <span class="badge">{total}</span>
          <div class="shopping-cart-total">
            <span class="lighter-text">Total: </span>
            <span class="main-color-text">
              $
              {productsInCart?.reduce(
                (a, item) => a + item.product.price * item.quant,
                0
              )}
            </span>
          </div>
        </div>
        {productsInCart.length ? (
          <ul class="shopping-cart-items">
            {productsInCart
              ?.filter((item) => item.quant !== 0)
              .map((prod, index) => {
                return <CartProduct key={index} prod={prod} />;
              })}
          </ul>
        ) : (
          <h4>Aún no hay productos en el carrito</h4>
        )}

        <a href="#!" class="button">
          Comprar
        </a>
      </div>
    </>
  );
};

export default ShoppingCart;
