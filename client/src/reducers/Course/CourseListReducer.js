import * as types from '../../constants/Courses';

const CourseListReducer = (state = {
    data: []
  }, action) => {
  switch (action.type) {
    case types.FETCH_COURSES_SUCCESS:
      return {...state, data: action.payload }
    case types.FETCH_COURSES_FAIL:
      return {...state, data: [] }
    default:
      return state;
  }
};

export default CourseListReducer;
