import * as types from '../constants/CourseFilter';

const CourseFilter = (state = {
  categories: [],
  // levels: [],
  locations: {},
  weekdays: {},
  selectedCategoryIds: [],
  selectedLocationIds: [],
  selectedLevels: [],
  selectedWeekdays: [],
  selectedFees: [],
  startTime: null,
  endTime: null,
  keyWord: null,
  startTimeError: false,
  endTimeError: false
}, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESSFULLY:
      return {
        ...state, 
        categories: action.payload,
        selectedCategoryIds: [action.payload[0].id]
      }
    case types.FETCH_WEEKDAYS_SUCCESSFULLY:
      return {...state, weekdays: action.payload}
    case types.FETCH_LOCATIONS_SUCCESSFULLY:
      return {...state, locations: action.payload}
    case types.RELOAD_COURSE_LEVELS:
      return {
        ...state, 
        selectedCategoryIds: action.payload,
      }
    case types.SELECT_COURSE_LOCATIONS:
      return {...state, selectedLocationIds: action.payload}
    case types.SELECT_COURSE_LEVEL:
      let selectedLevels = state.selectedLevels.map((level) => {return level})
      selectedLevels.push(action.payload)
      return {...state, selectedLevels: selectedLevels}
    case types.DESELECT_COURSE_LEVEL:
      return {...state, selectedLevels: state.selectedLevels.filter((level) => {return level != action.payload})}
    case types.SELECT_WEEK_DAY:
      let selectedWeekdays = state.selectedWeekdays.map((wd) => {return wd})
      selectedWeekdays.push(action.payload)
      return {...state, selectedWeekdays: selectedWeekdays}
    case types.DESELECT_WEEK_DAY:
      return {...state, selectedWeekdays: state.selectedWeekdays.filter((wd) => {return wd != action.payload})}
    case types.SELECT_FEE:
      let selectedFees = state.selectedFees.map((f) => {return f})
      selectedFees.push(action.payload)
      return {...state, selectedFees: selectedFees}
    case types.DESELECT_FEE:
      return {...state, selectedFees: state.selectedFees.filter((f) => {return f != action.payload})}
    case types.SELECT_START_TIME:
      return {...state,  startTime: action.payload}
    case types.SELECT_END_TIME:
      return {...state,  endTime: action.payload}
    case types.CHANGE_KEY_WORD:
      return {...state,  keyWord: action.payload}
    case types.SET_START_TIME_ERROR:
      return {...state,  startTimeError: action.payload}
    case types.SET_END_TIME_ERROR:
      return {...state,  endTimeError: action.payload}
    default:
      return state;
  }
};

export default CourseFilter;
