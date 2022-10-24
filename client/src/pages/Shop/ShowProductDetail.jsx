import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ShowProductDetail.css";
import { incrementProductInCart, addToCart } from "../../redux/actions/shoppingCart";

export default function ShowProductDetail({id}) {
  const product = useSelector(
    (state) => state.productsReducer.productDetail
  )[0];
  const {
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
  const [modifier, setModifier]= useState([]);
  const [disabled, setDisabled]= useState(false);
  const dispatch = useDispatch();
  
  const allProducts = useSelector((state) => {
    return state.productsReducer.allProducts;
  });
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);

  const handleModifiers = (e)=> {


  }
  

  const handleAddToCart = ()=>{
    let itemToAdd = allProducts.find((product) => product.id === id);
    let productToAdd = productsInCart?.find((prod) => prod.product.id === id);

    if (productToAdd) {
      dispatch(incrementProductInCart(id));
    } else {
      dispatch(addToCart(itemToAdd));
    }
  }

  return (
    <div className="detail__container-product">
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
                    <input placeholder={Object.keys(obj)[0]}
                    name={Object.keys(obj)[0]}
                    value={Object.values(obj)[0]} ></input>
                  </label>
                );
              } else {
                return (
                  <label key={index}>
                    {Object.keys(obj)[0]}:
                    <select
                      name={Object.keys(obj)[0]}
                      id={index}
                      value={0}
                      readOnly={true}
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
            <button className="card__title card__title-recipe" 
            onClick={()=> handleAddToCart(id)}
            disabled= {disabled} >Agregar al carrito</button>
          </div>
        </>
      ) : (
        <h2>No hay info</h2>
      )}
    </div>
  );
}
