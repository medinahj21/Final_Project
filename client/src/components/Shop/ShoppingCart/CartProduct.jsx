import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  incrementProductInCart,
  decrementProductInCart,
  removeProductFromCart,
} from "../../../redux/actions/shoppingCart";

export default function CartProduct({ prod, checkOut }) {
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);

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

  const handleConfirm = (id, modifiers) => {
    if (window.confirm("¿Seguro desea eliminar este item?")) {
      setIsDelete(true);
      setTimeout(() => {
        setIsDelete(false);
      }, 2200);

      setTimeout(() => {
        dispatch(removeProductFromCart(id, modifiers));
      }, 2000);
    }
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
        {!checkOut && (
          <>
            <button
              className="modify__button modify__button-cart"
              onClick={() => handleDecrementProduct(id, prod.product.modifiers)}
              disabled={prod.quant <= 1}
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
            <button
              className={
                isDelete ? "button-trash delete-trash" : "button-trash"
              }
              onClick={() => handleConfirm(id, prod.product.modifiers)}
            >
              <div className="icon-trash">
                <svg className="top">
                  <use href="#top" />
                </svg>
                <svg className="bottom">
                  <use href="#bottom" />
                </svg>
              </div>
              <span>Eliminar</span>
            </button>
          </>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="top"
          >
            <path d="M15,4 C15.5522847,4 16,4.44771525 16,5 L16,6 L18.25,6 C18.6642136,6 19,6.33578644 19,6.75 C19,7.16421356 18.6642136,7.5 18.25,7.5 L5.75,7.5 C5.33578644,7.5 5,7.16421356 5,6.75 C5,6.33578644 5.33578644,6 5.75,6 L8,6 L8,5 C8,4.44771525 8.44771525,4 9,4 L15,4 Z M14,5.25 L10,5.25 C9.72385763,5.25 9.5,5.47385763 9.5,5.75 C9.5,5.99545989 9.67687516,6.19960837 9.91012437,6.24194433 L10,6.25 L14,6.25 C14.2761424,6.25 14.5,6.02614237 14.5,5.75 C14.5,5.50454011 14.3231248,5.30039163 14.0898756,5.25805567 L14,5.25 Z"></path>
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="bottom"
          >
            <path d="M16.9535129,8 C17.4663488,8 17.8890201,8.38604019 17.9467852,8.88337887 L17.953255,9.02270969 L17.953255,9.02270969 L17.5309272,18.3196017 C17.5119599,18.7374363 17.2349366,19.0993109 16.8365446,19.2267053 C15.2243631,19.7422351 13.6121815,20 12,20 C10.3878264,20 8.77565288,19.7422377 7.16347932,19.226713 C6.76508717,19.0993333 6.48806648,18.7374627 6.46907425,18.3196335 L6.04751853,9.04540766 C6.02423185,8.53310079 6.39068134,8.09333626 6.88488406,8.01304774 L7.02377738,8.0002579 L16.9535129,8 Z M9.75,10.5 C9.37030423,10.5 9.05650904,10.719453 9.00684662,11.0041785 L9,11.0833333 L9,16.9166667 C9,17.2388328 9.33578644,17.5 9.75,17.5 C10.1296958,17.5 10.443491,17.280547 10.4931534,16.9958215 L10.5,16.9166667 L10.5,11.0833333 C10.5,10.7611672 10.1642136,10.5 9.75,10.5 Z M14.25,10.5 C13.8703042,10.5 13.556509,10.719453 13.5068466,11.0041785 L13.5,11.0833333 L13.5,16.9166667 C13.5,17.2388328 13.8357864,17.5 14.25,17.5 C14.6296958,17.5 14.943491,17.280547 14.9931534,16.9958215 L15,16.9166667 L15,11.0833333 C15,10.7611672 14.6642136,10.5 14.25,10.5 Z"></path>
          </symbol>
        </svg>
        {/* <div className="button-trash" onClick= {()=> handleConfirm(id, prod.product.modifiers) }>
          <FiTrash2 />
        </div> */}
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
      <div id="button-checkout"></div>
    </li>
  );
}
