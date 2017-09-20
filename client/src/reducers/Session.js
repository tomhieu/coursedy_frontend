import * as types from '../constants/LoginComponent';

const session = (state = {
  currentUser: null,
  roles: []
}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {...state, token: action.payload.token, signedIn: true};
    default:
      return state;
  }
};

export default session;
