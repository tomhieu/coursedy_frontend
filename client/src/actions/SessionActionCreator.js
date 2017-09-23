import { push } from 'react-router-redux';
import * as types from '../constants/Session'
import {globalHistory} from '../utils/globalHistory'
import queryString from 'query-string'
import Network from '../utils/network'

const fetchCurrentUser = (dispatch, callback) => {
  Network().get('current_user')
    .then((data) => {
      dispatch({
        type: types.SET_CURRENT_USER,
        payload: data
      })
      if (callback) callback()
    }, (errors) => {
      dispatch({
        type: types.REMOVE_CURRENT_USER
      })
    })
}

export const setCurrentUser = (callback) => {
  return dispatch => {
    const confirmation  = queryString.parse(globalHistory.location.search)

    if (confirmation.account_confirmation_success == 'true' && confirmation.token) {
      // redirect from api devise's confirmation when activating account
      localStorage.setItem('ezyLearningToken', confirmation.token)
      localStorage.setItem('ezyLearningClient', confirmation.client_id)
      localStorage.setItem('ezyLearningUid', confirmation.uid)
      fetchCurrentUser(dispatch, callback);
    } else if (localStorage.getItem('ezyLearningToken')) {
      fetchCurrentUser(dispatch, callback);
    } else {
      dispatch({
        type: types.REMOVE_CURRENT_USER
      })
    }
  };
}

export const signOutUser = () => {
  return dispatch => {
    Network().delete('auth/sign_out').then((data) => {
      localStorage.removeItem('ezyLearningToken')
      localStorage.removeItem('ezyLearningClient')
      localStorage.removeItem('ezyLearningUid')

      dispatch({
        type: types.REMOVE_CURRENT_USER
      })

      globalHistory.replace('/')
    })
  }
}