import {
  GET_EVENTS,
  DELETE_EVENT,
  CREATE_EVENT,
  EDIT_EVENT
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

export function deleteEvent(id) {
  return async function (dispatch) {
  try {
      await axios.delete(`/events/delete/${id}`)
      let {data} = await axios.get('/events')
      return dispatch ({
        type: DELETE_EVENT,
        payload: data
      })
    } catch (error) {
      console.log(error)
    } 
  }
}

export function createEvent(payload) {
  return async function (dispatch) {
    await axios.post('/events/create',payload)
    let {data} = await axios.get('/events')
    return dispatch({
      type: CREATE_EVENT,
      payload: data
    })
  }
} 

export function editEvent(id, property, value) { // <------- REVISAR
  return async function (dispatch) {
  try {
      await axios.put(`/events/update/${id}`, {[property]: value}) // <------- REVISAR
      let {data} = await axios.get('/events')
      return dispatch ({
        type: EDIT_EVENT,
        payload: data
      })
    } catch (error) {
      console.log(error)
    } 
  }
}
