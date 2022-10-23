import {
  GET_EVENTS,
  EDIT_EVENT,
  DELETE_EVENT,
  CREATE_EVENT
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
    case EDIT_EVENT:
      return {
        ...state,
        events: action.payload
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: action.payload,
      };
    case CREATE_EVENT:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
}
