import * as types from '../constants/Courses';
import * as asyncActs from './AsyncActionCreator.js';
import Network from '../utils/network';
import { TT } from '../utils/locale';
import * as PublicCourseConstants from '../constants/PublicCourseConstants';

export const fetchPublicCourse = (courseId) => {
  return (dispatch) => {
    dispatch({
      type: types.FETCH_PUBLIC_COURSE,
      payload: Network().get(`courses/${courseId}`),
      meta: 'ezylearningFullLoader'
    }).then(({ value, action }) => {
      dispatch(fetchPublicCourseSections(courseId));
      dispatch(fetchPublicCourseTutor(value.user.id));

      setTimeout(() => {
        dispatch(submitViewCourse(courseId, value.token || ''));
      }, PublicCourseConstants.PUBLIC_COURSE_DETAIL_SUBMIT_VIEW_TIMEOUT);
    }, () => {
      const error_messages = [TT.t('fetch_course_fail')];
      dispatch({
        type: types.FETCH_PUBLIC_COURSE_FAIL,
        payload: { errors: error_messages }
      });
    });
  };
};

export const fetchPublicCourseSections = (courseId) => {
  return (dispatch) => {
    dispatch({
      type: types.FETCH_PUBLIC_COURSE_SECTIONS,
      payload: Network().get('course_sections', { course_id: courseId })
    });
  };
};

export const fetchPublicCourseTutor = (tutorId) => {
  return (dispatch) => {
    dispatch({
      type: types.FETCH_PUBLIC_COURSE_TUTOR,
      payload: Network().get('tutors/tutor_by_user', { user_id: tutorId })
    });
  };
};

export const submitFollowCourse = (courses = []) => {
  const params = {
    courses
  };
  return (dispatch) => {
    dispatch({
      type: asyncActs.STORE_COURSE_FOLLOW,
      payload: Network().post('courses/follow', params)
    });
  };
};

export const submitEnrollCourse = (courseId) => {
  return {
    type: types.PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL,
    payload: Network().post(`courses/${courseId}/enroll`, {})
  };
};

export const addCourseToCart = (course) => {
  return {
    type: types.PUBLIC_COURSE_DETAIL_ADD_COURSE_TO_CART + '_FULFILLED',
    payload: course
  }
  // return {
  //   type: types.PUBLIC_COURSE_DETAIL_ADD_COURSE_TO_CART,
  //   payload: Network().post(`courses/${course.id}/add-to-cart`, {})
  // }
}

export const clearError = () => {
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_ERROR,
      payload: { errors: null }
    });
  };
};

export const fetchCourseComments = (courseId, page = 1) => {
  const params = {
    per_page: types.PUBLIC_COURSE_MAX_NUMBER_COMMENTS_PER_LOAD,
    page
  };
  return (dispatch) => {
    Network().get(`courses/${courseId}/comments`, params).then((response) => {
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_FETCH_COMMENTS_SUCCESSFULLY,
        payload: {
          comments: response,
          page
        }
      });
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0)
        ? errors
        : [TT.t('fetch_comments_fail')];
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_FETCH_COMMENTS_FAIL,
        payload: { errors: error_messages }
      });
    });
  };
};

export const submitCourseComment = (comment, courseId, userId) => {
  const params = {
    content: comment
  };
  return {
    type: types.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT,
    payload: Network().post(`courses/${courseId}/comments`, params),
    meta: 'commentPlaceholder'
  };
};


export const submitViewCourse = (courseId, token) => {
  return (dispatch) => {
    dispatch({
      type: types.PUBLIC_COURSE_DETAIL_SUBMIT_VIEW,
      payload: Network().post(`courses/${courseId}/view`, { token })
    });
  };
};

export const fetchRelatedCourses = (params) => {
  return (dispatch) => {
    dispatch({
      type: types.PUBLIC_COURSE_DETAIL_RELATED_COURSES,
      payload: Network().get('courses/related_courses', params)
    });
  };
};

export const changeActiveMenu = (payload) => {
  return (dispatch) => {
    dispatch({
      type: types.PUBLIC_COURSE_DETAIL_UPDATE_ACTIVE_MENU,
      payload
    });
  };
};
