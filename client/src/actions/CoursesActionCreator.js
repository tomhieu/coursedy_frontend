import * as courseActionTypes from 'constants/Courses';
import * as types from 'constants/CourseFilter';
import Network from 'utils/network';


export const fetchPopularCourses = () => {
  return dispatch => {
    //FIXME: Comment for dummy data
    // Network().get('courses', query).then((response) => {
    //   dispatch({
    //     type: courseActionTypes.FETCH_POPULAR_COURSES_SUCCESS,
    //     payload: response
    //   })
    // })

    //FIXME: Remove me
    dispatch({
      type: courseActionTypes.FETCH_POPULAR_COURSES_SUCCESS,
      payload: types.dummyPopularCourses
    })
  }
}

export const fetchNewCourses = (query) => {
  return dispatch => {
    //FIXME: Comment for dummy data
    // Network().get('courses', query).then((response) => {
    //   dispatch({
    //     type: courseActionTypes.FETCH_NEW_COURSES_SUCCESS,
    //     payload: response
    //   })
    // })

    //FIXME: Remove me
    dispatch({
      type: courseActionTypes.FETCH_NEW_COURSES_SUCCESS,
      payload: types.dummyPopularCourses
    })
  }
}
