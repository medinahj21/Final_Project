import { useDispatch } from "react-redux";
import {
  incrementProductInCart,
  decrementProductInCart,
} from "../../redux/actions/shoppingCart";

export default function ShoppingCart(prod) {
  const dispatch = useDispatch();

  const handleIncrementProduct = (id) => {
    dispatch(incrementProductInCart(id));
  };

  const handleDecrementProduct = (id) => {
    dispatch(decrementProductInCart(id));
  };

  return (
    <div className="cart-container-prod">
      <div className="cart-content">
        <h4 className="cart__product-title">{prod.prod.product.name}</h4>
        <span>$ {prod.prod.product.price}.00</span>
        <span>Cant: {prod.prod.quant}</span>
        <div className="cart__container-button">
          <button
            className="modify__button"
            onClick={() => handleDecrementProduct(prod.prod.product.id)}
          >
            {" "}
            -{" "}
          </button>
          <button
            className="modify__button"
            onClick={() => handleIncrementProduct(prod.prod.product.id)}
          >
            {" "}
            +{" "}
          </button>
        </div>
      </div>
      <h4>Subtotal: ${prod.prod.quant * prod.prod.product.price}</h4>
    </div>
  );
}
