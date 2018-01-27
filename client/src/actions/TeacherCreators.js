import * as ActionTypes from '../constants/Teachers';
import Network from '../utils/network';
import * as types from 'constants/Teachers';


export const fetchTeachers = (query) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_TEACHERS
    })

    Network().get('teachers', query).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_TEACHERS_SUCCESS,
        payload: response
      })
    }, (errors) => {
      dispatch({
        type: ActionTypes.FETCH_TEACHERS_FAIL,
        error: errors
      })
    })
  }
}


export const fetchTopTeachers = () => {
  // let query = {teacher: 'top'}
  return dispatch => {
    // dispatch({
    //   type: ActionTypes.FETCH_TOP_TEACHERS
    // })
    //
    // Network().get('teachers', query).then((response) => {
    //   dispatch({
    //     type: ActionTypes.FETCH_TOP_TEACHERS_SUCCESS,
    //     payload: response
    //   })
    // }, (errors) => {
    //   dispatch({
    //     type: ActionTypes.FETCH_TOP_TEACHERS_FAIL,
    //     error: errors
    //   })
    // })

    //FIXME: Remove me
    dispatch({
      type: ActionTypes.FETCH_TOP_TEACHERS_SUCCESS,
      payload: types.dummyTopTeachers
    })
  }
}
