import React, { useState } from "react";
import "./ShowProductDetail.css";
import { useDispatch, useSelector } from "react-redux";

import {
  incrementProductInCart,
  addToCart,
} from "../../../redux/actions/shoppingCart";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ShowProductDetail.css";

export default function ShowProductDetail() {
  const product = useSelector(
    (state) => state.productsReducer.productDetail
  )[0];
  const {
    id,
    name,
    image,
    price,
    description,
    filterTags,
    modifiers,
    isOrder,
    stock,
    paymentTerm,
  } = { ...product };

  const dispatch = useDispatch();

  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);

  const handleAddToCart = () => {
    //hay que hacer control de stock !!
    let itemToAdd = { id, price };
    itemToAdd.modifiers = { ...modifiersChosen };
    let productInCart = productsInCart?.find(
      (prod) =>
        prod.product.id === id &&
        JSON.stringify(itemToAdd.modifiers) ===
          JSON.stringify(prod.product.modifiers)
    );

    if (
      modifiers &&
      Object.keys(modifiers).length &&
      !Object.keys(modifiersChosen).length
    ) {
      notifyError("Elije algún modificador");
    } else if (productInCart) {
      dispatch(incrementProductInCart(id, itemToAdd.modifiers));
      notify(
        `Se añadió otro ${name.toLowerCase()} al carrito | cant: ${
          productInCart.quant
        }`
      );
    } else {
      dispatch(addToCart(itemToAdd));
      notify(`${name} añadido al carrito`);
    }
  };

  const [modifiersChosen, setModifiersChosen] = useState({});

  const handleModifiers = (e) => {
    setModifiersChosen({
      ...modifiersChosen,
      [e.target.name]: e.target.value,
    });
  };

  const notify = (message) => toast.success(message);
  const notifyError = (message) =>
    toast.error(message, {
      hideProgressBar: true,
      theme: "colored",
    });

  return (
    <>
      <ToastContainer />
      {product ? (
        <>
          {/* <label>{state ? "habilitado" : "deshabilitado"}</label> */}
          <h1 className="detail-product-title">{name}</h1>
          <div className="detail-product-content">
            <div>
              <img alt="imgProduct" src={image} className="image-detail" />
              <p className="price-detail">
                Precio <span>${price}</span>
              </p>
            </div>
            <div className="details-container">
              <div className="modify_container-detail">
                {modifiers?.map((obj, index) => {
                  if (Object.values(obj)[0] === "") {
                    return (
                      <div className="modify-container">
                        <label key={index}>
                          <input
                            placeholder={Object.keys(obj)[0]}
                            name={Object.keys(obj)[0]}
                            onChange={handleModifiers}
                          ></input>
                        </label>
                      </div>
                    );
                  } else {
                    return (
                      <div className="size-container">
                        {Object.values(obj)[0]?.map((option, i) => (
                          <label className="check__label">
                            {option}{" "}
                            <input
                              name="genre"
                              value={option}
                              type="radio"
                              onChange={handleModifiers}
                            />
                            <span className="check"></span>
                          </label>
                        ))}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="description-content">
                <span>Descripción:</span>
                <p>{description}</p>
                <span className="span-pedido">
                  Producto bajo {isOrder ? "pedido" : "stock"}
                </span>
                {!isOrder ? <label>Existencias: {stock}</label> : <></>}
                <button
                  className="card__title-product btn-product"
                  onClick={handleAddToCart}
                >
                  {" "}
                  <span>Añadir al carrito</span>{" "}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2>No hay info</h2>
      )}
    </>
  );
}
