import { GET_GROUPS, GET_GROUP_DETAIL, CLEAN_GROUP_DETAIL} from "./actions.js";

import axios from 'axios'

const URL = 'http://localhost:3001/groups'

export const getGroups = () => {
    return async (dispatch) => {
        return axios.get(URL)
            .then(res => res.data)
            .then(data => {
                //console.log(data);
                dispatch({
                    type: GET_GROUPS,
                    payload: data,
                })
            })
    }
}

export const getGroupDetail = (id) => {
    return async (dispatch) => {
        return axios.get(`${URL}/${id}`)
            .then(res => res.data)
            .then(data => {
                dispatch({
                    type: GET_GROUP_DETAIL,
                    payload: data,
                })
            })
    }
}

export const createGroup = (datos) => {
    return async () => { 
        try {
            var response =  await axios.post(`${URL}/create`, datos);
            return response.data            
        } catch (error) {
            return {error: error.response.data.message}
        }
    }
}

export const updateGroup = (id, datos) => {
    return async (dispatch) => {
        return axios.put(`${URL}/update/${id}`, datos)
            .then(res => res.data)
            .then(data => {
                console.log(data);
            })
    }
}

export const deleteGroup = (id, datos) => {
    return async (dispatch) => {
        return axios.post(`${URL}/delete/${id}`, datos)
            .then(res => res.data)
            .then(data => {
                console.log(data);
            })
    }
}

export const cleanGroupDetail = () => {
    return async (dispatch) => {
      dispatch({
        type: CLEAN_GROUP_DETAIL,
      });
    };
  };

