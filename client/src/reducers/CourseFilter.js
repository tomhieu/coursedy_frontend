import * as types from '../constants/CourseFilter';
import * as courseActionTypes from '../constants/Courses';

const CourseFilter = (state = {
  courses: [],
  locations: {},
  weekdays: {},
  totalResult: 0,
  viewType: 'grid',
  pageSize: 4,
  currentPage: 1,
  selectedCourses: [],
  filters: [],
  showSuggestion: false
}, action) => {
  switch (action.type) {
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
      return {...state, groupSugestions: action.payload, showSuggestion: action.payload.length > 0}
    case types.ADD_FILTER_CRITERIA:
      let newFilters = JSON.parse(JSON.stringify(state.filters))
      newFilters.push(action.data)
      return {...state, filters: newFilters, showSuggestion: false}
    case types.REMOVE_FILTER_CRITERIA:
      const clonedFilters = JSON.parse(JSON.stringify(state.filters))
      const removedFilters = clonedFilters.filter(f => f.id != Number(action.data))
      return {...state, filters: removedFilters}
    default:
      return state;
  }
};

export default CourseFilter;
