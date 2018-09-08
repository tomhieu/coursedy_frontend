import * as types from '../../constants/Courses';
import * as asyncAtcs from '../../actions/AsyncActionCreator';

const CourseListReducer = (state = {
  data: []
}, action) => {
  switch (action.type) {
    case types.FETCH_COURSES + asyncAtcs.FULFILLED:
      return { ...state, data: action.payload };
    case types.FETCH_COURSES + asyncAtcs.REJECTED:
      return { ...state, data: [] };
    default:
      return state;
  }
};

export default CourseListReducer;
