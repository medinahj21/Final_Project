import {
  ADD_TO_CART,
  INCREMENT_QUANT_PRODUCT,
  DECREMENT_QUANT_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PLAYER_SHOPPING_CART,
  CLEAR_CART,
} from "./actions";

import axios from "axios";

export const addToCart = (product) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };
};

export const incrementProductInCart= (id)=> {
  return (dispatch)=> {
    dispatch({
      type: INCREMENT_QUANT_PRODUCT,
      payload:id,
    })
  }
}

export const decrementProductInCart = (id) => {
  return (dispatch) => {
    dispatch({
      type: DECREMENT_QUANT_PRODUCT,
      payload: id,
    });
  };
};

export const removeProductFromCart = (id) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: id,
    });
  };
};

export const updatePlayerCart = (id, payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      const shoppingCart= {shoppingCart: payload};
      console.log("SOPIINGCART:", shoppingCart);
      let response = await axios.put(
        `http://localhost:3001/players/update/${id}`,
        shoppingCart
      );
      return dispatch({
        type: UPDATE_PLAYER_SHOPPING_CART,
        payload: response.data,
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
    });
  };
};
