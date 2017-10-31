import * as types from '../constants/CourseFilter';
import Network from '../utils/network'
import {TT} from '../utils/locale'

export const fetchCategories = () => {
  return dispatch => {
    Network().get('categories').then((response) => {
      dispatch({
        type: types.FETCH_CATEGORIES_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
    //  TODO handle error
    })
  }
}

export const fetchLocations = () => {
  return dispatch => {
    Network().get('locations').then((response) => {
      dispatch({
        type: types.FETCH_LOCATIONS_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
    //  TODO handle error
    })
  }
}

export const reloadCourseLevels = (categoryIdList) => {
  return dispatch => {
    dispatch({
      type: types.RELOAD_COURSE_LEVELS,
      payload: categoryIdList
    })
  }
}

export const selectCourseLocations = (locationList) => {
  return dispatch => {
    dispatch({
      type: types.SELECT_COURSE_LOCATIONS,
      payload: locationList
    })
  }
}