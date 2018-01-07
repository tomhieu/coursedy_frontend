import * as types from '../constants/Courses';
import * as sessionTypes from '../constants/Session';
import Network from '../utils/network'
import {globalHistory} from '../utils/globalHistory'
import {TT} from '../utils/locale'

export const fetchPublicCourse = (courseId) => {
  return dispatch => {
    //FIXME: Comment for dummy data
    // Network().get('courses/'+courseId).then((response) => {
    //   dispatch(fetchPublicCourseSections(courseId));
    //   dispatch(fetchPublicCourseTutor(response.user.id));
    //   dispatch({
    //     type: types.FETCH_PUBLIC_COURSE_SUCCESSFULLY,
    //     payload: response
    //   })
    // }, (errors) => {
    //   const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
    //     errors :
    //     [TT.t('fetch_course_fail')]

    //   dispatch({
    //     type: types.FETCH_PUBLIC_COURSE_FAIL,
    //     payload: {errors: error_messages}
    //   })
    // })

    //FIXME: Remove me
    dispatch({
      type: types.FETCH_PUBLIC_COURSE_SUCCESSFULLY,
      payload: types.dummyCourse
    })

  }
}

export const fetchPublicCourseSections = (courseId) => {
  return dispatch => {
    Network().get('course_sections', {course_id: courseId}).then((response) => {
      dispatch({
        type: types.FETCH_PUBLIC_COURSE_SECTIONS_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
        errors :
        [TT.t('fetch_course_fail')]

      dispatch({
        type: types.FETCH_PUBLIC_COURSE_SECTIONS_FAIL,
        payload: {errors: error_messages}
      })
    })
  }
}

export const fetchPublicCourseTutor = (tutorId) => {
  return dispatch => {
    Network().get('tutors/tutor_by_user', {user_id: tutorId}).then((response) => {
      dispatch({
        type: types.FETCH_PUBLIC_COURSE_TUTOR_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
        errors :
        [TT.t('fetch_course_fail')]

      dispatch({
        type: types.FETCH_PUBLIC_COURSE_TUTOR_FAIL,
        payload: {errors: error_messages}
      })
    })
  }
}

export const showPublishCourseFollowModal = () => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_SHOW_FOLLOW_MODAL,
    })
  }
}
export const closePublishCourseFollowModal = () => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_CLOSE_FOLLOW_MODAL,
    })
  }
}

export const showPublishRequireLoginModal = () => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_SHOW_REQUIRE_LOGIN_MODAL,
    })
  }
}
export const closePublishRequireLoginModal = () => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_CLOSE_REQUIRE_LOGIN_MODAL,
    })
  }
}

export const showPublishEnrollStatusModal = () => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_SHOW_ENROLL_STATUS_MODAL,
    })
  }
}
export const closePublishEnrollStatusModal = () => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_CLOSE_ENROLL_STATUS_MODAL,
    })
  }
}
export const submitFollowEmail = (courseId, email = '') => {
  const params = email == '' ? {} : {email: email}
  return dispatch => {
    Network().post('courses/'+courseId+'/follow', params).then((response) => {
      dispatch({
        type: types.PUBLIC_COURSE_SUBMIT_FOLLOW_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
        errors :
        [TT.t('submit_follow_fail')]
      dispatch({
        type: types.PUBLIC_COURSE_SUBMIT_FOLLOW_FAILL,
        payload: {errors: error_messages}
      })
    })
  }
}

export const submitEnrollCourse = (courseId) => {
  return dispatch => {
    Network().post('courses/'+courseId+'/enroll', {}).then((response) => {
      dispatch({
        type: types.PUBLIC_COURSE_SUBMIT_ENROLL_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
        errors : {errors: [{status_code: 1, message: TT.t('submit_enroll_fail')}]}
      //FIXME: Comment for dummy data
      // dispatch({
      //   type: types.PUBLIC_COURSE_SUBMIT_ENROLL_FAILL,
      //   payload: {errors: error_messages}
      // })

      //FIXME: Remove me
      dispatch({
        type: types.PUBLIC_COURSE_SUBMIT_ENROLL_FAILL,
        payload: {errors: [{
          status_code: 2,
          message: "Không đủ số dư"
        }]}
      })      
    })
  }
}

export const redirectEnrollCourse = (courseId) => {
  return dispatch => {
    globalHistory.push('/login');
    dispatch({
      type: sessionTypes.SET_REDIRECT_PAGE,
      payload: 'course/'+courseId
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