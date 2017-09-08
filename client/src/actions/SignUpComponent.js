import * as types from '../constants/SignUpComponent';

export const signUpUser = function (email, password) {
  var response = {
    token: '123'
  }
  return {
    type: types.SIGN_UP_SUCCESS,
    payload: response
  }
}