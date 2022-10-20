import {
  ADD_TO_CART,
  INCREMENT_QUANT_PRODUCT,
  DECREMENT_QUANT_PRODUCT,
  CLEAR_CART,
} from "./../actions/actions";

const initialState = {
  cart: [],
  total: 0,
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { quant: 1, product: action.payload }],
      };

    case INCREMENT_QUANT_PRODUCT:
      let findProduct = state.cart.find(
        (prod) => prod.product.id === action.payload
      );
      console.log(findProduct);
      if (!findProduct) return state;
      let filterProd = state.cart.filter(
        (p) => p.product.id !== action.payload
      );
      findProduct.quant++;
      return {
        ...state,
        cart: [...filterProd, findProduct],
      };

    case DECREMENT_QUANT_PRODUCT:
      return {};

    case CLEAR_CART:
      return {
        cart: initialState.cart,
      };

    default:
      return state;
  }
}
