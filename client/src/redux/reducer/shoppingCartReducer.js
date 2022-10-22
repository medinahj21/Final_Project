import {
  ADD_TO_CART,
  INCREMENT_QUANT_PRODUCT,
  DECREMENT_QUANT_PRODUCT,
  CLEAR_CART,
  SET_INITIAL_CART,
} from "./../actions/actions";

const initialState = {
  cart: [],
  total: 0,
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (!state.cart){
        return {
          ...state,
          cart: [{quant: 1, product: action.payload}]
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, { quant: 1, product: action.payload }],
        };
      }
      

    case INCREMENT_QUANT_PRODUCT:
      let findProduct = state.cart.find(
        (prod) => prod.product.id === action.payload
      );
      if (!findProduct) return state;
    
      findProduct.quant++;
      return {
        ...state,
        cart: [...state.cart],
      };

    case DECREMENT_QUANT_PRODUCT:
      if (state.cart.length > 0){
        var productToDecrement = state.cart.find(
          (prod) => prod.product.id === action.payload
        );
      }
      
      if (!productToDecrement) return state;
      let filteredProd = state.cart.filter(
        (prod) => prod.quant > 0 );
      productToDecrement.quant--;
      console.log("ProductTDecre:", productToDecrement)
      console.log("Filtrados:",filteredProd)
      if(productToDecrement.quant===0){
        return {
          ...state,
          cart: [...filteredProd]
        }
      }else {
        return { 
          ...state,
          cart: [ ...state.cart] };
      }
      

    case CLEAR_CART:
      return {
        cart: initialState.cart,
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
