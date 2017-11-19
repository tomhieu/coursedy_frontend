import * as types from '../constants/Courses';
import Network from '../utils/network'
import {globalHistory} from '../utils/globalHistory'
import {TT} from '../utils/locale'

export const fetchPublicCourse = (courseId) => {
  return dispatch => {
    Network().get('courses/'+courseId).then((response) => {
      dispatch(fetchPublicCourseSections(courseId));
      dispatch(fetchPublicCourseTutor(response.user.id));
      dispatch({
        type: types.FETCH_PUBLIC_COURSE_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
        errors :
        [TT.t('fetch_course_fail')]

      dispatch({
        type: types.FETCH_PUBLIC_COURSE_FAIL,
        payload: {errors: error_messages}
      })
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

export const clearError = () => {
  return dispatch => {
    dispatch({
      type: types.CLEAR_ERROR,
      payload: {errors: null}
    })
  }
}