import * as types from '../constants/CourseFilter';
import Network from '../utils/network'
import {TT} from '../utils/locale'

export const fetchCategory = () => {
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