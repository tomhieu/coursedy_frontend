import * as types from '../constants/SignUpComponent';

export const signUpUser =  (email, password) => {
  return dispatch => {
    var response = {
      token: '123'
    }

    dispatch({
      type: types.SIGN_UP_SUCCESS,
      payload: response
    })
  }

}