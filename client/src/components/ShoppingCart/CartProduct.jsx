import React from "react";
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
    <div>
      <div style={{borderBottom: "thin solid green"}}>
        <h3>{prod.prod.product.name}</h3>
        <h3>${prod.prod.product.price}.00</h3>
        <h5>Cantidad: {prod.prod.quant}</h5>
        <button onClick={() => handleDecrementProduct(prod.prod.product.id)}>
          {" "}
          -{" "}
        </button>
        <button onClick={() => handleIncrementProduct(prod.prod.product.id)}>
          {" "}
          +{" "}
        </button>
        <h4>Subtotal: ${prod.prod.quant * prod.prod.product.price}</h4>
      </div>
    </div>
  );
}
