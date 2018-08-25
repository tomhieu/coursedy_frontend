import * as courseActionTypes from 'constants/Courses';
import Network from 'utils/network';
import * as asyncActs from 'actions/AsyncActionCreator';


export const fetchPopularCourses = () => {
  return (dispatch) => {
    dispatch({
      type: courseActionTypes.POPULAR_COURSES,
      payload: Network().get('courses', { sort_by: 'popularity' }),
      meta: 'popularCourseListPlaceholder'
    });
  };
};

export const fetchNewCourses = () => {
  return (dispatch) => {
    dispatch({
      type: courseActionTypes.NEW_COURSES,
      payload: Network().get('courses', { sort_by: 'time_desc' }),
      meta: 'newCourseListPlaceholder'
    });
  };
};

export const fetchTopTeachers = () => {
  return (dispatch) => {
    dispatch({
      type: asyncActs.TOP_TEACHERS,
      payload: Network().get('tutors/top_teachers'),
      meta: 'topTeacherPlaceholder'
    });
  };
};
