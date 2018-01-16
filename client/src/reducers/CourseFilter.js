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
  groupSugestions: [],
  filters: {selectedWeekDays: [], selectedLocations: [], selectedCategories: [], selectedSpecializes: [],
    resetMinFee: false, resetMaxFee: false},
  showSuggestion: false,
  loadingSuggestion: false
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
    case types.LOADING_SUGGESTION:
      return {...state, groupSugestions: [], showSuggestion: true, loadingSuggestion: true}
    case types.LOAD_SUGGESTION_ERROR:
      return {...state, groupSugestions: [], showSuggestion: false, loadingSuggestion: false}
    case types.ADD_FILTER_CRITERIA:
      const currentFilters = Object.assign({}, state.filters, {resetMinFee: false, resetMaxFee: false})
      let selectedFilters = currentFilters[action.data.type]
      const newSelectedFilters = selectedFilters == undefined ? [] : JSON.parse(JSON.stringify(selectedFilters))
      newSelectedFilters.push(action.data.value)
      currentFilters[action.data.type] = newSelectedFilters
      return Object.assign({}, state, {filters: currentFilters})
    case types.REMOVE_FILTER_CRITERIA:
      const removedFilters = Object.assign({}, state.filters)
      if (Array.isArray(removedFilters[action.data.type])) {
        const clonedFilters = JSON.parse(JSON.stringify(removedFilters[action.data.type]))
        const updatedSelectedFilters = clonedFilters.filter(f => f.id != Number(action.data.filterId))
        removedFilters[action.data.type] = updatedSelectedFilters
      } else {
        removedFilters[action.data.type] = true;
      }
      return {...state, filters: removedFilters}
    default:
      return state;
  }
};

export default CourseFilter;
