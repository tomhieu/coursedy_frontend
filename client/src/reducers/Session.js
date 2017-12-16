import * as types from '../constants/Session';

const session = (state = {
  currentUser: null,
  fetchingUser: false,
  redirectPage: '/',
}, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {...state, currentUser: action.payload};
    case types.REMOVE_CURRENT_USER:
      return {...state, currentUser: null};
    case types.START_FETCHING_CURRENT_USER:
      return {...state, ...{fetchingUser: true}};
    case types.FINISHED_FETCHING_CURRENT_USER:
      return {...state, ...{fetchingUser: false}};
    case types.SET_REDIRECT_PAGE:
      return {...state, redirectPage: action.payload};
    default:
      return state;
  }
};

export default session;
