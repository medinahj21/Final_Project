import { combineReducers } from "redux";

import authReducer from "./auth";
import playerReducer from "./player"

import { RESET_REDUX_STATE } from "../actions/actions";

const appReducer = combineReducers({
  authReducer,
  playerReducer
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
