import {
  ADD_TO_CART,
  INCREMENT_QUANT_PRODUCT,
  DECREMENT_QUANT_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_CART,
} from "./actions";

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

export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
    });
  };
};
