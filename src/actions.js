import { apiCall } from './api/api'
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
 } from './constants';

export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text })

export const USERS_API = 'https://jsonplaceholder.typicode.com/users';

export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING })
  return apiCall(USERS_API)
    .then(response => {
      dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: response.data });
      return response;
    })
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
}