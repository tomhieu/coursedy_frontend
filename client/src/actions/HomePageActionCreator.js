import * as courseActionTypes from 'constants/Courses';
import Network from 'utils/network';
import * as homePageTypes from 'constants/HomePage';


export const fetchPopularCourses = () => {
  return dispatch => {
    dispatch({
      type: courseActionTypes.POPULAR_COURSES,
      payload: Network().get('courses', {sort_by: 'popularity'})
    });
  };
};

export const fetchNewCourses = () => {
  return dispatch => {
    dispatch({
      type: courseActionTypes.NEW_COURSES,
      payload: Network().get('courses', {sort_by: 'time_desc'})
    });
  };
};

export const fetchTopTeachers = () => {
  return dispatch => {
    dispatch({
      type: homePageTypes.TOP_TEACHERS,
      payload: Network().get('teachers', {sort_by: 'top'})
    });
  };
};
