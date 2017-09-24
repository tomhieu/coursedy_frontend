import * as types from '../constants/SignUpComponent';

const SignUpComponent = (state = {
  success: false
}, action) => {
  switch (action.type) {
    case types.SIGN_UP_SUCCESS:
      return {...state, success: true, userFirstName: action.payload.data.first_name};
    case types.RESET_FORM:
      return {...state, success: false, userFirstName: ''};
    default:
      return state;
  }
};

export default SignUpComponent;
