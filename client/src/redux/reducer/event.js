import {
  GET_EVENTS,
} from "../actions/actions";

const initialState = {
  events: [],
}

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    default:
      return state;
  }
}
