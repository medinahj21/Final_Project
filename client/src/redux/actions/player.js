import {
  CLEAR_PLAYER_DETAIL,
  CREATE_PLAYER,
  GET_PLAYERS_FROM_DB,
  GET_PLAYER_DETAIL,
  UPDATE_PLAYER_SHOPPING_CART,
} from "./actions";
import axios from "axios";

export const createPlayer = (personalInfo) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${axios.defaults.baseURL}/players/create`,
        personalInfo
      );
      dispatch({ type: CREATE_PLAYER });
      return response;
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getPlayersFromDB = () => {
  return async (dispatch) => {
    let players = await axios.get(`${axios.defaults.baseURL}/players`);
    dispatch({ type: GET_PLAYERS_FROM_DB, payload: players.data });
  };
};

export const getPlayerDetail = (id) => {
  return async (dispatch) => {
    try {
      let playerById = await axios.get(`${axios.defaults.baseURL}/players/${id}`);
      return dispatch({
        type: GET_PLAYER_DETAIL,
        payload: playerById.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_PLAYER_DETAIL,
        payload: { error },
      });
    }
  };
};

export const updatePlayerCart = (id, payload) => {
  return async (dispatch) => {
    try {
      const shoppingCart = { shoppingCart: payload };
      let response = await axios.put(
        `${axios.defaults.baseURL}/players/update/${id}`,
        shoppingCart
      );
      return dispatch({
        type: UPDATE_PLAYER_SHOPPING_CART,
        payload: response.data,
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};

export const clearPlayerDetail = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_PLAYER_DETAIL,
    });
  };
};

export const deletePlayer = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(`${axios.defaults.baseURL}/players/delete/${id}`)
      let responseRol = await axios.delete(`${axios.defaults.baseURL}/roleRequests/delete/${id}`)
      if (response.error) {
        return response.error;
      } else if (responseRol.error) {
        return responseRol.error;
      } else {
        return response.message;
      }
    } catch (error) {
      return error
    }
  }
}

// export const updatePlayerEvents = (groups,event) => {
//   return async (dispatch) => {
//     try {
//       const event = { events: event };
//       let response = await axios.put(
//         `http://localhost:3001/players/update/${id}`,
//         shoppingCart
//       );
//       return dispatch({
//         type: UPDATE_PLAYER_SHOPPING_CART,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log({ error: error.message });
//     }
//   };
// };
