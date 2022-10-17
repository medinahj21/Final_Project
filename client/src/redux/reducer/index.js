import { combineReducers } from "redux";
import groupReducer from "./group";
import authReducer from "./auth";

import { RESET_REDUX_STATE } from "../actions/actions";

const appReducer = combineReducers({
  authReducer, 
  groupReducer,
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
