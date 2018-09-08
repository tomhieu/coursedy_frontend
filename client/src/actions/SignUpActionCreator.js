import { reset } from 'redux-form';
import * as types from '../constants/SignUpComponent';
import Network from '../utils/network';

export const signUpUser = (email, password, password_confirmation, name, phone_number, role) => {
  return (dispatch) => {
    const body = {
      email,
      password,
      password_confirmation,
      name,
      phone_number,
      role
    };

    Network().post('auth', body).then((response) => {
      dispatch({
        type: types.SIGN_UP_SUCCESS,
        payload: response
      });
      dispatch(reset('signUp'));
    }, ({ errors }) => {
      dispatch({
        type: types.SIGNUP_FAILED,
        payload: errors.full_messages[0]
      });
    });
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_SIGNUP_ERROR
    });
  };
};

export const resetForm = () => {
  return (dispatch) => {
    dispatch({
      type: types.RESET_SIGNUP_FORM,
      payload: {}
    });
  };
};
