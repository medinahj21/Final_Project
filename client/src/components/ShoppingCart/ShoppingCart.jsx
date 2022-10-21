import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const productItems = useSelector((state) => state.shoppingCartReducer.cart);
  console.log("PRODUCT ITEMS:", productItems);

  const delFromCart = () => {};

  const clearCart = () => {};

  
  return (
    <div>
      <h2>Carrito de Compras</h2>
      {      
      productItems?.map((prod, index) => {
        return (
          <div>
            <h3 key={index}>{prod.product.name}</h3>
            <h3>${prod.product.price}.00</h3>
            <h5>Cantidad: {prod.quant}</h5>
            <button> - </button>
            <button> + </button>
            <h4>Subtotal: ${prod.quant * prod.product.price}</h4>
            
            
          </div>

      )})}
      <div>
        <h2>Total</h2>
        <h4>$ {productItems?.reduce((a,item)=> a +  item.product.price * item.quant, 0)}.00</h4>
      </div>
    </div>
  );
};

export default ShoppingCart;
