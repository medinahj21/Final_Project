import {
  ADD_TO_CART,
  INCREMENT_QUANT_PRODUCT,
  DECREMENT_QUANT_PRODUCT,
  CLEAR_CART,
  SET_INITIAL_CART,
  REMOVE_PRODUCT,
} from "./../actions/actions";

const initialState = {
  cart: [],
  total: 0,
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (!state.cart) {
        return {
          ...state,
          cart: [{ quant: 1, product: action.payload }],
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { quant: 1, product: action.payload }],
        };
      }

    case INCREMENT_QUANT_PRODUCT:
      let findProduct = state.cart.find(
        (prod) =>
          prod.product.id === action.payload[0] &&
          JSON.stringify(prod.product.modifiers) ===
            JSON.stringify(action.payload[1])
      );
      if (!findProduct) return state;

      findProduct.quant++;
      return {
        ...state,
        cart: [...state.cart],
      };

    case DECREMENT_QUANT_PRODUCT:
      if (state.cart.length > 0) {
        var productToDecrement = state.cart.find(
          (prod) =>
            prod.product.id === action.payload[0] &&
            JSON.stringify(prod.product.modifiers) ===
              JSON.stringify(action.payload[1])
        );
      }

      if (!productToDecrement) return state;
      let filteredProd = state.cart.filter((prod) => prod.quant > 0);
      productToDecrement.quant--;
      if (productToDecrement.quant === 0) {
        return {
          ...state,
          cart: [...filteredProd],
        };
      } else {
        return {
          ...state,
          cart: [...state.cart],
        };
      }

    case REMOVE_PRODUCT:
      var itemToDelete = state.cart.find(
        (prod) =>
          prod.product.id === action.payload[0] &&
          JSON.stringify(prod.product.modifiers) ===
            JSON.stringify(action.payload[1])
      );

      if (!itemToDelete) return state;
      else {
        let filteredCart = state.cart.filter((item) => item !== itemToDelete);
        return {
          ...state,
          cart: [...filteredCart],
        };
      }

    case CLEAR_CART:
      return {
        cart: [],
      };

    case SET_INITIAL_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
}
