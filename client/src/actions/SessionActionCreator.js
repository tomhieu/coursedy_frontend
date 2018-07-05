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
import {CourseStatus} from "../constants/CourseStatus";

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

export const confirmUser = () => {
  return dispatch => {
    const confirmation = queryString.parse(globalHistory.location.search)

    if (confirmation.account_confirmation_success == 'true' && confirmation.token) {
      localStorage.setItem('ezyLearningToken', confirmation.token)
      localStorage.setItem('ezyLearningClient', confirmation.client_id)
      localStorage.setItem('ezyLearningUid', confirmation.uid)
      dispatch(setCurrentUser())
    }
  }
}

export const setCurrentUser = () => {
  return dispatch => {
    dispatch(fetchCurrentUser()).then(({value, action}) => {
      if (value.roles.indexOf(UserRole.ADMIN) >= 0) {
        globalHistory.push('/admin/dashboard');
      } else if (value.roles.indexOf(UserRole.TEACHER) >= 0 || value.roles.indexOf(UserRole.STUDENT) >= 0) {
        globalHistory.push('/dashboard/profile');
        dispatch(fetchActiveCourses());
      } else {
        throw new Error('Not authorized');
      }
    })
  };
}

export const fetchActiveCourses = () => {
  return {
    type: asyncActions.FETCH_TUTOR_ACTIVE_COURSES,
    payload: Network().get('users/courses', {per_page: 100, status: CourseStatus.STARTED})
  }
}

export const loginUser = (email, password) => {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: Network().post('auth/sign_in', {email, password}),
      meta: 'loginPlaceholder'
    }).then(() => {
      dispatch(setCurrentUser())
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
      clearAuthenticationData();
      globalHistory.push('/');
    })
  }
}

export const clearAuthenticationData = () => {
  localStorage.removeItem('ezyLearningToken');
  localStorage.removeItem('ezyLearningClient');
  localStorage.removeItem('ezyLearningUid');
}