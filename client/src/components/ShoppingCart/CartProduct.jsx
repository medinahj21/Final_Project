import { useDispatch, useSelector } from "react-redux";
import {
  incrementProductInCart,
  decrementProductInCart,
} from "../../redux/actions/shoppingCart";
import { FiTrash2 } from "react-icons/fi";

export default function CartProduct({ prod }) {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.productsReducer.allProducts);
  const product = allProducts?.find(
    (product) => product.id === prod.product.id
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
      <div>
        <span className="item-name name-position">{name}</span>
        <img className="image__cart" src={image} alt="item" />
      </div>
      <span className="item-price">$ {price}</span>
      <span className="item-quantity">Cantidad: {prod.quant}</span>
      <div className="cart__container-button">
        <button
          className="modify__button modify__button-cart"
          onClick={() => handleDecrementProduct(id, prod.product.modifiers)}
        >
          {" "}
          -{" "}
        </button>
        <button
          className="modify__button  modify__button-cart"
          onClick={() => handleIncrementProduct(id, prod.product.modifiers)}
        >
          {" "}
          +{" "}
        </button>
        <div className="button-trash">
          <FiTrash2 />
        </div>
      </div>
      <span className="item-name">
        {" "}
        {Object.keys(prod.product.modifiers)?.map((key) => {
          return (
            <>
              {key} : {prod.product.modifiers[key]}{" "}
            </>
          );
        })}
      </span>
      <hr />
    </li>
  );
}
