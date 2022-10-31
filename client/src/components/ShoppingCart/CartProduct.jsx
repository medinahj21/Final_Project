import { useDispatch, useSelector } from "react-redux";
import {
  incrementProductInCart,
  decrementProductInCart,
<<<<<<< HEAD:client/src/components/ShoppingCart/CartProduct.jsx
} from "../../redux/actions/shoppingCart";
=======
  removeProductFromCart,
} from "../../../redux/actions/shoppingCart";
>>>>>>> 33b76f07feb633e6a8ea3716a9827274de1ae5bd:client/src/components/Shop/ShoppingCart/CartProduct.jsx
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

  const handleConfirm = (id, modifiers)=> {
    if (window.confirm("¿Seguro desea eliminar este item?")){
      dispatch(removeProductFromCart(id, modifiers))
    }
  }

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
          disabled= {prod.quant <= 1}
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
        <div className="button-trash" onClick= {()=> handleConfirm(id, prod.product.modifiers) }>
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
