import { GET_USERS } from "../actions/actions";

const initialState = {
  alog: "",
};

export function rootReducer(initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return;
    default:
      return;
  }
}

export default rootReducer;
