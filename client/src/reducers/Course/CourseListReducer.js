import * as types from '../../constants/Courses';

const CourseListReducer = (state = {
    courses: []
  }, action) => {
  switch (action.type) {
    case types.FETCH_COURSES_SUCCESS:
      return {...state, courses: action.payload }
    case types.FETCH_COURSES_FAIL:
      return {...state, courses: [] }
    default:
      return state;
  }
};

export default CourseListReducer;
