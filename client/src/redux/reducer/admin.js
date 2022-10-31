import { GET_ADMIN } from "../actions/actions";
  
  const initialState = {
    admins: [],
  }
  
  export default function adminReducer(state = initialState, {type, payload}) {      
    switch (type) {
      case GET_ADMIN:
        return {
          ...state,
          admins: payload
        };
      default:
        return state;
    }
  }
  