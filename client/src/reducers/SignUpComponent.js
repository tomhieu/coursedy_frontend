import * as types from '../constants/SignUpComponent';

const SignUpComponent = (state = {
  success: false
}, action) => {
  switch (action.type) {
    case types.SIGN_UP_SUCCESS:
      return {...state, success: true};
    case types.RESET_FORM:
      return {...state, success: false};
    case types.SIGNUP_FAILED:
      return {...state, success: false, errors: action.payload};
    case types.CLEAR_ERROR:
      return {...state, success: false, errors: null};
    default:
      return state;
  }
};

export default SignUpComponent;
