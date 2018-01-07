import * as types from '../constants/CourseFilter';
import * as courseActionTypes from '../constants/Courses';

const CourseFilter = (state = {
  courses: [],
  locations: {},
  weekdays: {},
  totalResult: 0,
  displayMode: 'grid',
  pageSize: 4,
  currentPage: 1,
  selectedCourses: [],
  sortBy: '',
  sortOrder: 'desc',
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
    case types.CHANGE_DISPLAY_MODE:
      return {...state, displayMode: action.payload}
    case types.CHANGE_CURRENT_PAGE:
      return {...state, currentPage: action.payload}
    case types.CHANGE_SORT_BY:
      return {...state, sortBy: action.payload}
    case types.SELECT_COURSE:
      return {...state, selectedCourses: [...state.selectedCourses, action.payload]}
    case types.SELECT_ALL_COURSES:
      return {...state, selectedCourses: state.courses.map((course) => {return course.id})}
    case types.REMOVE_COURSE:
      return {...state, selectedCourses: state.selectedCourses.filter((courseId) => {return courseId != action.payload})}
    case types.REMOVE_ALL_COURSES:
      return {...state, selectedCourses: []}
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
