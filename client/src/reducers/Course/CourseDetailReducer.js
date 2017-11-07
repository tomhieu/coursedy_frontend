import * as types from '../../constants/Courses';

const CourseDetailReducer = (state = {
    course: {}
  }, action) => {
  switch (action.type) {
    case types.FETCH_COURSE_SUCCESS:
      return {...state, course: action.payload.data }
    case types.FETCH_COURSE_FAIL:
      return {...state, course: [] }
    default:
      return state;
  }
};

export default CourseDetailReducer;
