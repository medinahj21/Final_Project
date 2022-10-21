import { CREATE_PLAYER, GET_PLAYERS_FROM_DB, GET_PLAYER_DETAIL } from "../actions/actions";

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
        default:
            return state

    }

}
