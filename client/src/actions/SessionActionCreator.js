import * as types from '../constants/Session'
import {globalHistory} from '../utils/globalHistory'
import queryString from 'query-string'
import Network from '../utils/network'
import {LOGIN} from "./AsyncActionCreator";
import * as WebConstants from "constants/WebConstants";
import * as asyncActions from "actions/AsyncActionCreator";
import {LOGIN_FAILED} from "constants/LoginComponent";
import {TT} from "utils/locale";
import {UserRole} from "constants/UserRole";
import {REMOVE_CURRENT_USER, SET_CURRENT_USER} from "constants/Session";

export const fetchCurrentUser = () => {
  return {
    type: types.FETCH_CURRENT_USER,
    payload: Network().get('current_user')
  }
};

export const fetchNotificationOfCurrentUser = () => {
  return {
    type: types.FETCH_NOTIFICATION_USER,
    payload: Network().get('notification')
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

export const setCurrentUser = (user) => {
  return dispatch => {
    const confirmation = queryString.parse(globalHistory.location.search)
    localStorage.setItem(WebConstants.AUTHENTICATED, true);

    if (confirmation.account_confirmation_success == 'true' && confirmation.token) {
      // redirect from api devise's confirmation when activating account
      localStorage.setItem('ezyLearningToken', confirmation.token)
      localStorage.setItem('ezyLearningClient', confirmation.client_id)
      localStorage.setItem('ezyLearningUid', confirmation.uid)
      return dispatch(fetchCurrentUser());
    } else if (localStorage.getItem('ezyLearningToken')) {
      return dispatch(fetchCurrentUser());
    } else {
      dispatch({
        type: types.REMOVE_CURRENT_USER
      })
      localStorage.removeItem('ezyLearningToken')
      localStorage.removeItem('ezyLearningClient')
      localStorage.removeItem('ezyLearningUid')
    }
  };
}

export const loginUser = (email, password) => {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: Network().post('auth/sign_in', {email, password}),
      meta: 'loginPlaceholder'
    }).then(() => {
      dispatch(fetchCurrentUser()).then(({value, action}) => {
        if (value.roles.indexOf(UserRole.ADMIN) >= 0) {
          globalHistory.push('/admin/dashboard');
        } else if (value.roles.indexOf(UserRole.TEACHER) >= 0 || value.roles.indexOf(UserRole.STUDENT) >= 0) {
          globalHistory.push('/dashboard/account');
        } else {
          throw new Error('Not authorized');
        }
      })
    }, ({value, action}) => {
      dispatch({
        type: LOGIN_FAILED,
        payload: {errors: [TT.t('email_or_password_incorrect')]}
      })
    })
  }
}

export const signOutUser = () => {
  return dispatch => {
    dispatch({
      type: types.SIGN_OUT,
      payload: Network().delete('auth/sign_out'),
      meta: 'ezylearningFullLoader'
    }).then(({value, action}) => {
      localStorage.removeItem('ezyLearningToken');
      localStorage.removeItem('ezyLearningClient');
      localStorage.removeItem('ezyLearningUid');
      globalHistory.push('/');
    })
  }
}