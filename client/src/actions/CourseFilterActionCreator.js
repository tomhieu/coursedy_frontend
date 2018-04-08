import * as asyncActs from '../actions/AsyncActionCreator';
import * as courseActionTypes from '../constants/Courses';
import Network from '../utils/network'

export const searchCourse = (query) => {
  return dispatch => {
    dispatch({
      type: courseActionTypes.FETCH_COURSES,
      payload: Network().get('courses/search', query)
    })
  }
}

export const changeDisplayMode = (mode) => {
  return dispatch => {
    dispatch({
      type: asyncActs.CHANGE_DISPLAY_MODE,
      payload: mode
    })
  }
}

export const changeCurrentPage = (page) => {
  return dispatch => {
    dispatch({
      type: asyncActs.CHANGE_CURRENT_PAGE,
      payload: page
    })
  }
}

export const loadSuggestions = (query) => {
  return dispatch => {
    dispatch({
      type: asyncActs.LOAD_SUGGESTION,
      payload: Network().get('courses/search', query)
    })
  }
}

export const updateFilter = (filters) => {
  return {
    type: asyncActs.UPDATE_FILTER_CRITERIA,
    data: filters
  }
}

export const selectCourse = (courseId) => {
  return dispatch => {
    dispatch({
      type: asyncActs.SELECT_COURSE,
      payload: courseId
    })
  }
}
export const selectAllCourses = () => {
  return dispatch => {
    dispatch({
      type: asyncActs.SELECT_ALL_COURSES,
    })
  }
}
export const removeCourse = (courseId) => {
  return dispatch => {
    dispatch({
      type: asyncActs.REMOVE_COURSE,
      payload: courseId
    })
  }
}
export const removeAllCourses = () => {
  return dispatch => {
    dispatch({
      type: asyncActs.REMOVE_ALL_COURSES,
    })
  }
}
