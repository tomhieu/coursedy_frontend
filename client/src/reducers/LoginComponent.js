import * as types from '../constants/LoginComponent';

const LoginComponent = (state = {
  signedIn: false
}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {...state, token: action.payload.token, signedIn: true};
    default:
      return state;
  }
};

export default LoginComponent;
