import * as courseActionTypes from 'constants/Courses';
import Network from 'utils/network';
import * as homePageTypes from 'constants/HomePage';


export const fetchPopularCourses = (query={sort_by: 'popularity'}) => {
  return dispatch => {
    dispatch({
      type: courseActionTypes.POPULAR_COURSES,
      payload: Network().get('courses', query)
    });
  };
};

export const fetchNewCourses = (query={sort_by: 'time_desc'}) => {
  return dispatch => {
    dispatch({
      type: courseActionTypes.NEW_COURSES,
      payload: Network().get('courses', query)
    });
  };
};

export const fetchTopTeachers = (query={sort_by: 'top'}) => {
  return dispatch => {
    dispatch({
      type: homePageTypes.TOP_TEACHERS,
      payload: Network().get('teachers', query)
    });
  };
};
