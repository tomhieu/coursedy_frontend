import * as types from '../constants/LoginComponent';
import * as Actions from '../actions/SessionActionCreator'
import Network from '../utils/network'
import {globalHistory} from '../utils/globalHistory'

export const loginUser = (email, password, redirectPage = '/') => {
  return dispatch => {
    let body = {email, password}

    Network().post('auth/sign_in', body).then((response) => {
      dispatch(Actions.setCurrentUser(() => {
        globalHistory.push(redirectPage);
      }))
    }, (errors) => {

    })
  }
}

export const clearError = () => {
  return dispatch => {
    dispatch({
      type: types.CLEAR_ERROR,
      payload: {errors: null}
    })
  }
}