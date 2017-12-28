import * as ActionTypes from '../constants/Teachers';
import Network from '../utils/network';


export const fetchCategories = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_TEACHER_CATEGORY,
    })

    Network().get('categories').then((response) => {
      dispatch({
        type: ActionTypes.FETCH_TEACHER_CATEGORY_SUCCESS,
        payload: response
      })
    }, (errors) => {
      dispatch({
        type: ActionTypes.FETCH_TEACHER_CATEGORY_FAIL,
        error: errors
      })
    })
  }
}

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

export const fetchMoreTeachers = (url) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_MORE_TEACHERS
    })

    Network().get(url).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_MORE_TEACHERS_SUCCESS,
        payload: response
      })
    }, (errors) => {
      dispatch({
        type: ActionTypes.FETCH_MORE_TEACHERS_FAIL,
        error: errors
      })
    })
  }
}

export const fetchMoreTeachersEnded = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_MORE_TEACHERS_ENDED
    })
  }
}
