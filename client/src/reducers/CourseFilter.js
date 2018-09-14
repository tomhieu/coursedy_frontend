import { RESET_COURSE_FILTER } from 'constants/Courses';
import * as asyncActs from '../actions/AsyncActionCreator';
import * as courseActionTypes from '../constants/Courses';
import { PUBLIC_COURSE_LIST_MAX_ITEM_PER_PAGE } from '../constants/WebConstants';

const initialState = {
  isFetching: true,
  courses: [],
  totalResult: 0,
  perPage: PUBLIC_COURSE_LIST_MAX_ITEM_PER_PAGE,
  currentPage: 1,
  displayMode: 'grid',
  selectedCourses: [],
  sortBy: '',
  orderBy: 'time_asc',
  sortOrder: 'desc',
  sugestions: [],
  filters: {
    selectedWeekDays: [],
    selectedLocations: [],
    selectedCategories: [],
    selectedSpecializes: [],
    resetMinFee: false,
    resetMaxFee: false,
    term: ''
  },
  showSuggestion: false,
  loadingSuggestion: false
};

const CourseFilter = (state = initialState, action) => {
  switch (action.type) {
    case courseActionTypes.FETCH_COURSES + asyncActs.PENDING:
      return { ...state, isFetching: true };
    case courseActionTypes.FETCH_COURSES + asyncActs.FULFILLED:
      return {
        ...state,
        courses: action.payload,
        totalResult: parseInt(action.headers.xTotal, 10),
        currentPage: parseInt(action.headers.xPage, 10),
        isFetching: false
      };
    case asyncActs.CHANGE_DISPLAY_MODE:
      return { ...state, displayMode: action.payload };
    case asyncActs.CHANGE_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case asyncActs.CHANGE_SORT_BY:
      return { ...state, sortBy: action.payload };
    case asyncActs.SELECT_COURSE:
      return {
        ...state, selectedCourses: [...state.selectedCourses, action.payload]
      };
    case asyncActs.SELECT_ALL_COURSES:
      return {
        ...state,
        selectedCourses: state.courses.map((course) => { return course.id; })
      };
    case asyncActs.REMOVE_COURSE:
      return {
        ...state,
        selectedCourses: state.selectedCourses.filter((courseId) => { return courseId !== action.payload; })
      };
    case asyncActs.REMOVE_ALL_COURSES:
      return { ...state, selectedCourses: [] };
    /**
     * handle action to load suggestion to filter Course
     */
    case asyncActs.LOAD_SUGGESTION + asyncActs.FULFILLED:
      return {
        ...state,
        sugestions: action.payload,
        loadingSuggestion: false,
        showSuggestion: true
      };
    case asyncActs.LOAD_SUGGESTION + asyncActs.PENDING:
      return {
        ...state, sugestions: [], showSuggestion: true, loadingSuggestion: true
      };
    case asyncActs.LOAD_SUGGESTION + asyncActs.REJECTED:
    case asyncActs.CLOSE_COURSE_FILTER_SUGGESTION:
      return {
        ...state,
        sugestions: [],
        showSuggestion: false,
        loadingSuggestion: false
      };
    case asyncActs.CLEAR_SUGGESTION:
      return {
        ...state,
        filters: { ...state.filters, term: '' },
        sugestions: [],
        showSuggestion: false,
        loadingSuggestion: false
      };
    case asyncActs.UPDATE_FILTER_CRITERIA: {
      const rawFilters = JSON.parse(JSON.stringify(action.data));
      const {
        selectedWeekDays, selectedLocations,
        selectedCategories, selectedSpecializes
      } = state.filters;
      const newFilters = Object.assign({}, rawFilters, {
        selectedWeekDays: rawFilters.selectedWeekDays || selectedWeekDays,
        selectedLocations: rawFilters.selectedLocations || selectedLocations,
        selectedCategories: rawFilters.selectedCategories || selectedCategories,
        selectedSpecializes: rawFilters.selectedSpecializes || selectedSpecializes
      });
      return {
        ...state,
        ...{ filters: newFilters },
        orderBy: rawFilters.orderBy || state.orderBy
      };
    }
    case RESET_COURSE_FILTER:
      return Object.assign({}, state, {
        filters: initialState.filters,
      }, {
        orderBy: initialState.orderBy
      });
    default:
      return state;
  }
};

export default CourseFilter;
