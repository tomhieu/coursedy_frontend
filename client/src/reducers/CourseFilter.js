import * as types from '../constants/CourseFilter';

const CourseFilter = (state = {
  categories: [],
  locations: {},
  selectedCategoryIds: []
}, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESSFULLY:
      return {...state, categories: action.payload}
    case types.FETCH_LOCATIONS_SUCCESSFULLY:
      return {...state, locations: action.payload}
    case types.RELOAD_COURSE_LEVELS:
      return {...state, selectedCategoryIds: action.payload}
    default:
      return state;
  }
};

export default CourseFilter;
