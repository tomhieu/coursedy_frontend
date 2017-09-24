import * as types from '../constants/SignUpComponent';
import {reset} from 'redux-form';
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
      dispatch({
        type: types.SIGN_UP_SUCCESS,
        payload: response
      })
      dispatch(reset('signUp'));
    }, (errors) => {
      console.log(errors)
    })
  }

}

export const resetForm = () => {
  return dispatch => {
    dispatch({
      type: types.RESET_FORM,
      payload: {}
    })
  }
}