import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_DETAIL,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  CLEAN_PRODUCTS,
  GET_FILTER_TAGS,
  MODIFY_PRODUCTS,
} from "./actions";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      let allProducts = await axios.get("http://localhost:3001/products");
      return dispatch({
        type: GET_PRODUCTS,
        payload: allProducts.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductsByName = (name) => {
  return async (dispatch) => {
    try {
      let productByName = await axios.get(
        `http://localhost:3001/products?name=${name}`
      );
      return dispatch({
        type: GET_PRODUCT_BY_NAME,
        payload: productByName.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductDetail = (id) => {
  return async (dispatch) => {
    try {
      let productById = await axios.get(`http://localhost:3001/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: productById.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProduct = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        "http://localhost:3001/products/create",
        payload
      );
      return dispatch({
        type: CREATE_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      console.log({ error: error.message });
    }
  };
};

export const updateProduct = (id, payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `http://localhost:3001/products/update/${id}`,
        payload
      );
      return dispatch({
        type: UPDATE_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};

export const cleanProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAN_PRODUCTS,
    });
  };
};

export const getFilterTags = () => {
  return async (dispatch) => {
    const filterTags = await axios("http://localhost:3001/tags/");
    dispatch({ type: GET_FILTER_TAGS, payload: filterTags.data });
  };
};

export const modifyProducts = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: MODIFY_PRODUCTS,
      payload,
    });
  };
};
