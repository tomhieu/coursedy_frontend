import * as types from '../constants/LoginComponent';

export const loginUser = function (email, password) {
  var response = {
    token: '123'
  }
  return {
    type: types.LOGIN_SUCCESS,
    payload: response
  }
}