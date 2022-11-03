import { combineReducers } from "redux";
import groupReducer from "./group";
import authReducer from "./auth";
import eventReducer from "./event";
import playerReducer from "./player"
import productsReducer from "./products";
import shoppingCartReducer from "./shoppingCartReducer";
import adminReducer from './admin'


import { RESET_REDUX_STATE } from "../actions/actions";

const appReducer = combineReducers({
  authReducer,
  eventReducer,
  groupReducer,
  playerReducer,
  productsReducer,
  shoppingCartReducer,
  adminReducer,
});

export function rootReducer(state, action) {
  switch (action.type) {
    case RESET_REDUX_STATE:
      return appReducer(undefined, action);
    default:
      return appReducer(state, action);
  }
}

export default rootReducer;
