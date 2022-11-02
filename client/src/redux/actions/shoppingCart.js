import {
  ADD_TO_CART,
  INCREMENT_QUANT_PRODUCT,
  DECREMENT_QUANT_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_CART,
  SET_INITIAL_CART,
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

export const incrementProductInCart = (id, modifiers) => {
  return (dispatch) => {
    dispatch({
      type: INCREMENT_QUANT_PRODUCT,
      payload: [id, modifiers],
    });
  };
};

export const decrementProductInCart = (id, modifiers) => {
  return (dispatch) => {
    dispatch({
      type: DECREMENT_QUANT_PRODUCT,
      payload: [id, modifiers],
    });
  };
};

export const removeProductFromCart = (id, modifiers) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: [id, modifiers],
    });
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
    });
  };
};

export const setInitialCart = (cart = []) => {
  return (dispatch) => {
    dispatch({
      type: SET_INITIAL_CART,
      payload: cart,
    });
  };
};

export const getPreference = (datos, origin, orderId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${axios.defaults.baseURL}/products/comprar`,
        {
          datos,
          origin,
          orderId,
        }
      );
      return res;
    } catch (error) {
      return error;
    }
  };
};
