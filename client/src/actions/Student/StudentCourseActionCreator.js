import Network from 'utils/network';
import {
  FETCH_STUDENT_ENROLL_COURSES,
  FETCH_STUDENT_FOLLOW_COURSES
} from '../AsyncActionCreator';
import { FINISH_COURSE } from '../AsyncActionCreator';

export const fetchListStudentEnrollCourses = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_STUDENT_ENROLL_COURSES,
      payload: Network().get('users/enrolled_courses')
    });
  };
};

export const fetchListStudentFollowCourses = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_STUDENT_FOLLOW_COURSES,
      payload: Network().get('users/followed_courses')
    });
  };
};

export const finishCourse = (courseId) => {
  return (dispatch) => {
    dispatch({
      type: FINISH_COURSE,
      payload: Network().update(`users/finish_courses/${courseId}`)
    });
  };
};
