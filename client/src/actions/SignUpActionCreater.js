import * as types from '../constants/SignUpComponent';
import Network from '../utils/network';

export const signUpUser =  (email, password, password_confirmation, first_name, last_name, phone_number, role) => {
  return dispatch => {
    let body = {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      phone_number,
      role
    }

    Network().post('auth', body).then((response) => {
      console.log(response)
      dispatch({
        type: types.SIGN_UP_SUCCESS,
        payload: response
      })
    }, (errors) => {
      console.log(errors)
    })
  }

}