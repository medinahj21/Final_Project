import { useDispatch, useSelector } from "react-redux";
import {
  incrementProductInCart,
  decrementProductInCart,
} from "../../redux/actions/shoppingCart";

export default function CartProduct(prod) {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.productsReducer.allProducts);
  const product = allProducts?.find(
    (product) => product.id === prod.prod.product.id
  );

  const { id, name, price, image } = { ...product };

  const handleIncrementProduct = (id, modifiers) => {
    dispatch(incrementProductInCart(id, modifiers));
  };

  const handleDecrementProduct = (id, modifiers) => {
    dispatch(decrementProductInCart(id, modifiers));
  };

  return (
    <li className="clearfix">
      <img className="image__cart" src={image} alt="item" />
      <span className="item-name">{name}</span>
      <span className="item-price">$ {price}</span>
      <span className="item-quantity">Cantidad: {prod.prod.quant}</span>
      <div className="cart__container-button">
        <button
          className="modify__button modify__button-cart"
          onClick={() =>
            handleDecrementProduct(id, prod.prod.product.modifiers)
          }
        >
          {" "}
          -{" "}
        </button>
        <button
          className="modify__button  modify__button-cart"
          onClick={() =>
            handleIncrementProduct(id, prod.prod.product.modifiers)
          }
        >
          {" "}
          +{" "}
        </button>
      </div>
    </li>
  );
}
