import Network from "utils/network";
import * as types from "actions/AsyncActionCreator";

export const fetchCourseCategories = () => {
  return dispatch => {
    dispatch({
      type: types.FETCH_CATEGORIES,
      payload: Network().get('categories')
    })
  }
}

export const fetchLocations = () => {
  return dispatch => {
    dispatch({
      type: types.FETCH_LOCATIONS,
      payload: Network().get('locations')
    })
  }
}
