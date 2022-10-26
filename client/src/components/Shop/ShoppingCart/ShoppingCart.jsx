import { useSelector } from "react-redux";

import CartProduct from "./CartProduct";

import "./ShoppingCart.css";

const ShoppingCart = () => {
  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);
  const totalInCart = productsInCart?.map((item) => item.quant);
  const total = totalInCart?.length > 0 && totalInCart?.reduce((a, b) => a + b);

  return (
    <>
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

        { !userInfoFirestore.isAdmin &&
          <a href="#!" className="button">
          Comprar
        </a>
        }
      </div>
    </>
  );
};

export default ShoppingCart;
