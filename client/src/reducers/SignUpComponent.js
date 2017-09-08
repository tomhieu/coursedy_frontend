import * as types from '../constants/SignUpComponent';

const SignUpComponent = (state = {
  signedIn: false
}, action) => {
  switch (action.type) {
    case types.SIGN_UP_SUCCESS:
      return {...state, token: action.payload.token, signedIn: true};
    default:
      return state;
  }
};

export default SignUpComponent;
