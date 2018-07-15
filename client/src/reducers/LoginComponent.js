import * as types from '../constants/LoginComponent';
import * as asyncAction from 'actions/AsyncActionCreator';
const LoginComponent = (state = {
  errors: null
}, action) => {
  switch (action.type) {
    case types.LOGIN_FAILED:
      return {...state, ...action.payload};
    case types.CLEAR_LOGIN_ERROR:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default LoginComponent;
