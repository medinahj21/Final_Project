import { CREATE_PLAYER, GET_PLAYERS_FROM_DB } from "./actions";
import axios from "axios";

export const createPlayer = (personalInfo) => {
  return async (dispatch) => {
    await axios.post(`${axios.defaults.baseURL}/players/create`, personalInfo);
    dispatch({ type: CREATE_PLAYER });
  };
};

export const getPlayersFromDB = () => {
  return async(dispatch)=>{
    let players = await axios.get(`${axios.defaults.baseURL}/players`).data;
    dispatch({type: GET_PLAYERS_FROM_DB, payload: players})
  }
}
