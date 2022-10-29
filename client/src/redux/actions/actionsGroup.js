import {
  GET_GROUPS,
  GET_GROUP_DETAIL,
  CLEAN_GROUP_DETAIL,
  GET_ROLE_REQUESTS,
  CLEAN_ROLE_REQUESTS,
} from "./actions.js";

import axios from "axios";

export const getGroups = () => {
  return async (dispatch) => {
    return axios
      .get(`${axios.defaults.baseURL}/groups`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: GET_GROUPS,
          payload: data,
        });
      });
  };
};

export const getGroupDetail = (id) => {
  return async (dispatch) => {
    const valueAxios = await axios.get(
      `${axios.defaults.baseURL}/groups/${id}`
    );
    return dispatch({ type: GET_GROUP_DETAIL, payload: valueAxios.data });
  };
};

export const createGroup = (datos) => {
  return async () => {
    try {
      var response = await axios.post(
        `${axios.defaults.baseURL}/groups/create`,
        datos
      );
      return response.data;
    } catch (error) {
      return { error: error.response.data.message };
    }
  };
};

export const updateGroup = (id, datos) => {
  return async (dispatch) => {
    return axios
      .put(`${axios.defaults.baseURL}/groups/update/${id}`, datos)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });
  };
};

export const deleteGroup = (id, datos) => {
  return async (dispatch) => {
    return axios
      .post(`${axios.defaults.baseURL}/groups/delete/${id}`, datos)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });
  };
};

export const cleanGroupDetail = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAN_GROUP_DETAIL,
    });
  };
};

export const getRoleRequests = () => {
  return async (dispatch) => {
    try {
      let payload = await axios.get(`${axios.defaults.baseURL}/roleRequests`);
      dispatch({
        type: GET_ROLE_REQUESTS,
        payload: payload.data,
      });
      return { message: "process successful" };
    } catch (error) {
      return { error: error.error.response.data.error };
    }
  };
};

export const createNewRoleRequest = (roleRequest) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${axios.defaults.baseURL}/roleRequests/create`,
        roleRequest
      );
      dispatch({ type: "CREATE_RR" });
      return response.data;
    } catch (error) {
      return { error: error.response.data.error_DB };
    }
  };
};

export const deleteRoleRequest = (id) => {
  return async (dispatch) => {
    try {
        await axios.delete(
        `${axios.defaults.baseURL}/roleRequests/delete/${id}`
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const cleanRoleRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: CLEAN_ROLE_REQUESTS });
  };
};

