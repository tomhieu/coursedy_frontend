import * as types from '../constants/Session';
import * as asyncActs from '../actions/AsyncActionCreator'
import {TT} from "utils/locale";


const session = (state = {
  currentUser: null,
  fetchingUser: false,
  userBalance: 0,
  errors: [],
  notifications: []
}, action) => {
  switch (action.type) {
    case types.FETCH_CURRENT_USER + asyncActs.FULFILLED:
      if (action.payload.id) {
        return {...state, currentUser: action.payload, fetchingUser: false};
      } else {
        return {...state, fetchingUser: false};
      }
    case types.REMOVE_CURRENT_USER:
      return {...state, currentUser: null};
    case types.FETCH_CURRENT_USER + asyncActs.PENDING:
      return {...state, fetchingUser: true};
    case asyncActs.FETCH_USER_BALANCE + asyncActs.PENDING:
      return { ...state, userBalance: 0, fetchingUser: false}
    case asyncActs.FETCH_USER_BALANCE + asyncActs.FULFILLED:
      return { ...state, userBalance: action.payload.value, fetchingUser: false }
    case types.UPDATE_CURRENT_USER + asyncActs.FULFILLED:
      return {...state, currentUser: action.payload, fetchingUser: false}
    case asyncActs.FETCH_USER_BALANCE + asyncActs.REJECTED:
      const errorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
        errors : [TT.t('fetch_user_balance_fail')];
      return {...state, userBalance: 0, errors: errorMessages, fetchingUser: false }
    case types.FETCH_NOTIFICATION_USER + asyncActs.FULFILLED:
      return { ...state, notifications: action.payload}
    default:
      return state;
  }
};

export default session;
