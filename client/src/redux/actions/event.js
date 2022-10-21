import { CREATE_EVENT } from "./actions";
import axios from "axios";

const URL = 'http://localhost:3001/events'

export const createEvent = (datos) => {
    return async () => { 
        return axios.post(`${URL}/create`, datos)
            .then(res => res.data)
            .then(data => {
                console.log(data, 'creado con exito');
            })
    }
}