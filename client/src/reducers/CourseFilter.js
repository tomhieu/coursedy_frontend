import * as types from '../constants/CourseFilter';
import * as courseActionTypes from '../constants/Courses';

const CourseFilter = (state = {
  courses: [],
  categories: [],
  locations: {},
  weekdays: {},
  totalResult: 0,
  viewType: 'grid',
  pageSize: 4,
  currentPage: 1,
  selectedCourses: [],
  filters: []
}, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESSFULLY:
      return {...state, categories: action.payload}
    case courseActionTypes.FETCH_COURSES_SUCCESS:
      return {...state, courses: action.payload, totalResult: action.payload.length}
    case types.FETCH_WEEKDAYS_SUCCESSFULLY:
      return {...state, weekdays: action.payload}
    case types.FETCH_LOCATIONS_SUCCESSFULLY:
      return {...state, locations: action.payload}
    case types.CHANGE_VIEW_TYPE:
      return {...state, viewType: action.payload}
    case types.CHANGE_CURRENT_PAGE:
      return {...state, currentPage: action.payload}
    case types.LOAD_SUGGESTION_COMPLETE:
      return {...state, groupSugestions: action.payload}
    case types.ADD_FILTER_CRITERIA:
      let filters = JSON.parse(JSON.stringify(state.filters));
      filters.push(action.data);
      return {...state, filters: filters}
    default:
      return state;
  }
};

export default CourseFilter;
