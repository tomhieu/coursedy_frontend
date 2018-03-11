import * as asyncActs from '../actions/AsyncActionCreator';
import * as courseActionTypes from '../constants/Courses';

const CourseFilter = (state = {
  courses: [],
  totalResult: 0,
  displayMode: 'grid',
  currentPage: 1,
  selectedCourses: [],
  sortBy: '',
  sortOrder: 'desc',
  sugestions: [],
  filters: {selectedWeekDays: [], selectedLocations: [], selectedCategories: [], selectedSpecializes: [],
    resetMinFee: false, resetMaxFee: false, term: ''},
  showSuggestion: false,
  loadingSuggestion: false
}, action) => {
  switch (action.type) {
    case courseActionTypes.FETCH_COURSES + asyncActs.FULFILLED:
      return {...state, courses: action.payload, totalResult: action.payload.length}
    case asyncActs.CHANGE_DISPLAY_MODE:
      return {...state, displayMode: action.payload}
    case asyncActs.CHANGE_CURRENT_PAGE:
      return {...state, currentPage: action.payload}
    case asyncActs.CHANGE_SORT_BY:
      return {...state, sortBy: action.payload}
    case asyncActs.SELECT_COURSE:
      return {...state, selectedCourses: [...state.selectedCourses, action.payload]}
    case asyncActs.SELECT_ALL_COURSES:
      return {...state, selectedCourses: state.courses.map((course) => {return course.id})}
    case asyncActs.REMOVE_COURSE:
      return {...state, selectedCourses: state.selectedCourses.filter((courseId) => {return courseId != action.payload})}
    case asyncActs.REMOVE_ALL_COURSES:
      return {...state, selectedCourses: []}
    /**
     * handle action to load suggestion to filter Course
     */
    case asyncActs.LOAD_SUGGESTION + asyncActs.FULFILLED:
      return {...state, sugestions: action.payload, showSuggestion: action.payload.length > 0, loadingSuggestion: false}
    case asyncActs.LOAD_SUGGESTION + asyncActs.PENDING:
      return {...state, sugestions: [], showSuggestion: true, loadingSuggestion: true}
    case asyncActs.LOAD_SUGGESTION + asyncActs.REJECTED:
      return {...state, sugestions: [], showSuggestion: false, loadingSuggestion: false}
    case asyncActs.UPDATE_FILTER_CRITERIA:
      return Object.assign({}, state, {filters: action.data})
    default:
      return state;
  }
};

export default CourseFilter;
