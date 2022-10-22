<<<<<<< HEAD
import {
  GET_EVENTS,
} from "./actions";
import axios from "axios";

export function getEvents() {
  return async function (dispatch) {
    try {
      let {data} = await axios.get('/events')
      return dispatch ({
        type: GET_EVENTS,
        payload: data
      })
    } catch (error) {
      console.log(error)
    } 
  }
}

export const deleteEvent = (id, datos) => {
    return async (dispatch) => {
        return axios
            .delete(`${axios.defaults.baseURL}/events/delete/${id}`, datos)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
            });
    };
};

export const createEvent = (datos) => {
    return async () => {
        try {
            let response = await axios.post(`${axios.defaults.baseURL}/events/create`, datos);
            return response.data;
        } catch (error) {
            return { error: error.response.data.error }
        }
    }
}

export const editEvent = (id, datos) => {
    return async (dispatch) => {
        return axios
            .put(`${axios.defaults.baseURL}/events/update/${id}`, datos)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
            });
    };
};

