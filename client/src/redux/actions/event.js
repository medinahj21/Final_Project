import { CREATE_EVENT } from "./actions";
import axios from "axios";

const URL = 'http://localhost:3001/events'

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

export const updateEvent = (id, datos) => {
    if (!datos) return 'Faltan datos obligatorios'
    return async (dispatch) => {
        return axios
            .put(`${axios.defaults.baseURL}/events/update/${id}`, datos)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
            });
    };
};

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