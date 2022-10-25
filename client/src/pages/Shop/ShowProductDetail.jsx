import React from "react";
import "./ShowProductDetail.css";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementProductInCart,
  addToCart,
} from "../../redux/actions/shoppingCart";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    // state,
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
    <div className="detail__container-product">
      <ToastContainer />
      {product ? (
        <>
          <div>
            {/* <label>{state ? "habilitado" : "deshabilitado"}</label> */}
            <h1>{name}</h1>
            <img alt="imgProduct" src={image} height="300" />
            <h3>{`Precio: ${price}`}</h3>
            <h3>Detalles:</h3>
            <p>{description}</p>
            <h4>Etiquetas:</h4>
            <ul>
              {filterTags?.map((obj) => {
                return (
                  <li key={obj.id} value={obj.id}>
                    {obj["name"]}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="detail__container-modifier">
            <h3>Modificadores</h3>
            {modifiers?.map((obj, index) => {
              if (Object.values(obj)[0] === "") {
                return (
                  <label key={index}>
                    {Object.keys(obj)[0]}:
                    <input
                      placeholder={Object.keys(obj)[0]}
                      name={Object.keys(obj)[0]}
                      onChange={handleModifiers}
                    ></input>
                  </label>
                );
              } else {
                return (
                  <label key={index}>
                    {Object.keys(obj)[0]}:
                    <select
                      name={Object.keys(obj)[0]}
                      id={index}
                      defaultValue={0}
                      readOnly={true}
                      onChange={handleModifiers}
                    >
                      <option value={0} disabled={true}>
                        {"selecciona una"}
                      </option>
                      {Object.values(obj)[0]?.map(
                        (option, i) => (
                          <option value={option} key={i}>
                            {option}
                          </option>
                        ) //cambiar a input type radio
                      )}
                    </select>
                  </label>
                );
              }
            })}
            <h4>Producto bajo {isOrder ? "pedido" : "stock"}</h4>
            {!isOrder ? <label>Existencias: {stock}</label> : <></>}
            <h4> Plazo máximo de pago: {paymentTerm} días</h4>
            <button onClick={handleAddToCart}> Añadir al carrito </button>
          </div>
        </>
      ) : (
        <h2>No hay info</h2>
      )}
    </div>
  );
}
