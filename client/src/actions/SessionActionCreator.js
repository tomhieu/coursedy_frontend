import * as types from '../constants/Session'
import {globalHistory} from '../utils/globalHistory'
import queryString from 'query-string'
import Network from '../utils/network'
import {SIGN_OUT} from "./AsyncActionCreator";
import * as WebConstants from "constants/WebConstants";

export const fetchCurrentUser = () => {
  return {
    type: types.FETCH_CURRENT_USER,
    payload: Network().get('current_user')
  }
};

export const checkRole = (authorizedRoles, unauthorizedPath) => {
  return dispatch => {
    fetchCurrentUser(dispatch, (currentUser) => {
      const authorized = authorizedRoles.map((role) => currentUser.roles.indexOf(role) >= 0).reduce((x, y) => x || y)
      if (!authorized) globalHistory.replace(unauthorizedPath)
    })
  }
}

export const setCurrentUser = () => {
  return dispatch => {
    const confirmation  = queryString.parse(globalHistory.location.search)
    localStorage.setItem(WebConstants.AUTHENTICATED, true);

    if (confirmation.account_confirmation_success == 'true' && confirmation.token) {
      // redirect from api devise's confirmation when activating account
      localStorage.setItem('ezyLearningToken', confirmation.token)
      localStorage.setItem('ezyLearningClient', confirmation.client_id)
      localStorage.setItem('ezyLearningUid', confirmation.uid)
      dispatch(fetchCurrentUser());
    } else if (localStorage.getItem('ezyLearningToken')) {
      dispatch(fetchCurrentUser());
    } else {
      dispatch({
        type: types.REMOVE_CURRENT_USER
      })
    }
  };
}

export const signOutUser = () => {
  return {
    type: SIGN_OUT,
    payload: Network().delete('auth/sign_out'),
    meta: 'ezylearningFullLoader'
  }
}