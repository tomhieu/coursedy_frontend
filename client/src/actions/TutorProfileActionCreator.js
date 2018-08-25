import * as types from '../constants/TutorProfile';
import Network from '../utils/network'
import {TT} from '../utils/locale'


export const updateTutor = (id, formData, onSuccess, onError) => {
  return dispatch => {
    Network().update(`tutors/${id}`, formData).then((response) => {
      dispatch({
        type: types.UPDATE_TUTOR_SUCCESS,
        payload: response
      })
      if (onSuccess) onSuccess()
    }, (errors) => {
      dispatch({
        type: types.FETCH_TUTOR_FAILED,
        payload: {errors: 'error_messages'}
      })
      if (onError) onError(errors)
    })
  }
}