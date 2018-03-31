import * as types from '../constants/Session';
import * as asyncActs from '../actions/AsyncActionCreator'


const session = (state = {
  currentUser: null,
  fetchingUser: false,
  userBalance: 0,
  redirectPage: '/',
  errors: []
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

    case asyncActs.FETCH_USER_BALANCE + asyncActs.PENDING:
      return { ...state, userBalance: 0}
    case asyncActs.FETCH_USER_BALANCE + asyncActs.FULFILLED:
      return { ...state, userBalance: action.payload.value }
    case asyncActs.FETCH_USER_BALANCE + asyncActs.REJECTED:
      const errorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
        errors : [TT.t('fetch_user_balance_fail')];
      return {...state, userBalance: 0, errors: errorMessages }
    default:
      return state;
  }
};

export default session;
