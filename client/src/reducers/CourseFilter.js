import * as types from '../constants/CourseFilter';

const CourseFilter = (state = {
  categories: []
}, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESSFULLY:
      return {...state, categories: action.payload}
    default:
      return state;
  }
};

export default CourseFilter;
