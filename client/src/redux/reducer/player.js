import { CLEAR_PLAYER_DETAIL, CREATE_PLAYER, GET_PLAYERS_FROM_DB, GET_PLAYER_DETAIL, UPDATE_PLAYER_SHOPPING_CART } from "../actions/actions";

const initialState = {
  players: [],
  playersDB: [],
  playerDetail: "",
};

export default function playerReducer(state = initialState, action) {
    switch(action.type){
        case CREATE_PLAYER:
            return { ...state, players: []}

        case GET_PLAYERS_FROM_DB:
            return {...state, playersDB:action.payload}
        
        case GET_PLAYER_DETAIL:
          return {
            ...state,
            playerDetail: action.payload,
          }

        case UPDATE_PLAYER_SHOPPING_CART:      
            return {
              ...state,
            }
        
        case CLEAR_PLAYER_DETAIL:
          return{
            ...state,
            playerDetail : []
          }

        default:
            return state

    }

}
