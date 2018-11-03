import * as types from 'constants/Session';
import {SET_CURRENT_USER} from 'constants/Session';
import {globalHistory} from 'utils/globalHistory';
import queryString from 'query-string';
import * as asyncActions from 'actions/AsyncActionCreator';
import {LOGIN_FAILED} from 'constants/LoginComponent';
import {TT} from 'utils/locale';
import {UserRole} from 'constants/UserRole';
import {CourseStatus} from 'constants/CourseStatus';
import {SecurityUtils} from 'utils/SecurityUtils';
import {LOGIN} from './AsyncActionCreator';
import Network from '../utils/network';
import {FETCH_TUTOR_DATA} from '../constants/Session';


export const fetchCurrentUser = () => {
  return {
    type: types.FETCH_CURRENT_USER,
    payload: Network().get('current_user')
  };
};

export const fetchNotificationOfCurrentUser = () => {
  return {
    type: types.FETCH_NOTIFICATION_USER,
    payload: Network().get('notification')
  };
};

export const checkRole = (authorizedRoles, unauthorizedPath) => {
  return (dispatch) => {
    fetchCurrentUser(dispatch, (currentUser) => {
      const authorized = authorizedRoles.map(role => currentUser.roles.indexOf(role) >= 0).reduce((x, y) => x || y);
      if (!authorized) globalHistory.replace(unauthorizedPath);
    });
  };
};

export const confirmUser = () => {
  return (dispatch) => {
    const confirmation = queryString.parse(globalHistory.location.search);

    if (confirmation.account_confirmation_success == 'true' && confirmation.token) {
      const { token, client_id, uid } = confirmation;
      dispatch(autoLogin(token, client_id, uid));
    }
  };
};

export const editPassword = () => {
  return (dispatch) => {
    const auth_info = queryString.parse(globalHistory.location.search);
    if (auth_info.reset_password == 'true' && auth_info.token) {
      const { token, client_id, uid } = auth_info;
      dispatch(autoLogin(token, client_id, uid));
    }
  };
};

export const loginFacebook = (facebookToken, facebookId, role = null) => {
  return (dispatch) => {
    dispatch({
      type: 'NO_ACTION',
      payload: Network().post('users/connect_facebook', { token: facebookToken, app_user_id: facebookId, role }),
      meta: 'ezylearningFullLoader'
    }).then(({ value, action }) => {
      dispatch(autoLogin(value.token, value.client_id, value.uid)).then(({ value, action }) => {
        dispatch(redirectToDashboard(value));
      });
    });
  };
};

export const loginGoogle = (idToken, role = null) => {
  return (dispatch) => {
    dispatch({
      type: 'NO_ACTION',
      payload: Network().post('users/connect_google', { token: idToken, role }),
      meta: 'ezylearningFullLoader'
    }).then(({ value, action }) => {
      dispatch(autoLogin(value.token, value.client_id, value.uid)).then(({ value, action }) => {
        dispatch(redirectToDashboard(value));
      });
    });
  };
};

export const autoLogin = (token, clientId, uid) => {
  return (dispatch) => {
    localStorage.setItem('ezyLearningToken', token);
    localStorage.setItem('ezyLearningClient', clientId);
    localStorage.setItem('ezyLearningUid', uid);
    return dispatch(setCurrentUser(null));
  };
};


export const setCurrentUser = (nextUrl) => {
  return (dispatch) => {
    dispatch(fetchCurrentUser()).then(({ value, action }) => {
      if (nextUrl) {
        return globalHistory.push(nextUrl);
      }

      if (SecurityUtils.isTeacher(value)) {
        // fetch current tutor details to check their status
        const fetchTutor = dispatch(fetchCurrentTutor());

        fetchTutor.then(() => {
          return dispatch(redirectToDashboard(value));
        });
      } else {
        return dispatch(redirectToDashboard(value));
      }
    });
  };
};

export const fetchCurrentTutor = () => (dispatch) => {
  return dispatch({
    type: FETCH_TUTOR_DATA,
    payload: Network().get('tutors/current_tutor'),
    meta: 'ezylearningFullLoader'
  });
};

export const redirectToDashboard = user => (dispatch) => {
  if (user.roles.indexOf(UserRole.ADMIN) >= 0) {
    globalHistory.push('/admin/dashboard/account');
  } else if (user.roles.indexOf(UserRole.TEACHER) >= 0) {
    globalHistory.push('/dashboard/profile');
    dispatch(fetchActiveCourses(user));
  } else if (user.roles.indexOf(UserRole.STUDENT) >= 0) {
    globalHistory.push('/student/dashboard/profile');
    dispatch(fetchActiveCourses(user));
  } else {
    throw new Error('Not authorized');
  }
};

export const fetchActiveCourses = (user) => {
  if (SecurityUtils.isTeacher(user)) {
    return {
      type: asyncActions.FETCH_TUTOR_ACTIVE_COURSES,
      payload: Network().get('users/courses', { per_page: 100, status: CourseStatus.STARTED })
    };
  } if (SecurityUtils.isStudent(user)) {
    return {
      type: asyncActions.FETCH_STUDENT_ACTIVE_COURSES,
      payload: Network().get('users/enrolled_courses', { per_page: 100, status: CourseStatus.STARTED })
    };
  }
};

export const loginUser = (email, password, nextUrl) => {
  return (dispatch) => {
    return dispatch({
      type: LOGIN,
      payload: Network().post('auth/sign_in', { email, password }),
      meta: 'loginPlaceholder'
    }).then(() => {
      dispatch(setCurrentUser(nextUrl));
    }, ({ value, action }) => {
      dispatch({
        type: LOGIN_FAILED,
        payload: { errors: [TT.t('email_or_password_incorrect')] }
      });
    });
  };
};

export const signOutUser = () => {
  return (dispatch) => {
    dispatch({
      type: types.SIGN_OUT,
      payload: Network().delete('auth/sign_out'),
      meta: 'ezylearningFullLoader'
    }).then(({ value, action }) => {
      clearAuthenticationData();
      globalHistory.push('/');
    });
  };
};

export const clearAuthenticationData = () => {
  localStorage.removeItem('ezyLearningToken');
  localStorage.removeItem('ezyLearningClient');
  localStorage.removeItem('ezyLearningUid');
};
