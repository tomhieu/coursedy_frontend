import * as types from '../constants/CourseFormComponent';

const CourseFormComponent = (state = {
  errors: null
}, action) => {
  switch (action.type) {
    case types.CREATE_SUCCESSFULLY:
      state
    case types.CREATE_COURSE_FAILED:
      state
    default:
      return state;
  }
};

export default CourseFormComponent;
