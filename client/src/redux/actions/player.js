import { CREATE_PLAYER, GET_PLAYERS_FROM_DB } from "./actions";
import axios from "axios";

export const createPlayer = (personalInfo) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`http://localhost:3001/players/create`, personalInfo);
      dispatch({ type: CREATE_PLAYER });
      return response
      
    } catch (error) { 
      return {error:error.message}
          
    }
    
  };
};

export const getPlayersFromDB = () => {
  return async(dispatch)=>{
    let players = await axios.get(`http://localhost:3001/players`); 
    console.log(players)
    dispatch({type: GET_PLAYERS_FROM_DB, payload: players.data})
  }
}
