import { CREATE_PLAYER, GET_PLAYERS_FROM_DB } from "../actions/actions";

const initialState = {
  players: [],
  playersDB: [],
};

export default function playerReducer(state = initialState, action) {
    switch(action.type){
        case CREATE_PLAYER:
            return { ...state, players: []}

        case GET_PLAYERS_FROM_DB:
            return {...state, playersDB:action.payload}
        default:
            return state

    }

}
