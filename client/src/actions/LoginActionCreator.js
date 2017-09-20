import * as types from '../constants/LoginComponent';
import * as Actions from '../actions/SessionActionCreator'
import Network from '../utils/network'
import {globalHistory} from '../utils/globalHistory'
import {TT} from '../utils/locale'

export const loginUser = (email, password) => {
  return dispatch => {
    let body = {email, password}

    Network().post('auth/sign_in', body).then((response) => {
      dispatch(Actions.setCurrentUser())
      globalHistory.replace('/');
    }, (errors) => {
      dispatch({
        type: types.LOGIN_FAILED,
        payload: {errors: [TT.t('email_or_password_incorrect')]}
      })
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