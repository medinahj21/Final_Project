import { GET_ADMIN } from "./actions";
import axios from 'axios'

export const getAdmin = () => {
    return async (dispatch) => {
        return axios
            .get(`${axios.defaults.baseURL}/admins`)
            .then((res) => res.data)
            .then((data) => {
                dispatch({
                    type: GET_ADMIN,
                    payload: data,
                });
            })
            .catch((error => {
                console.log(error);
            }))
    };
};