import Network from "utils/network";
import {
  AccountTypes,
  StudentAccountTypes
} from '../../../constants/index'

export const fetchUser = () => {
  return dispatch => {
    Network().get('current_user')
      .then((data) => {
      dispatch({
        type: AccountTypes.SET_ACCOUNT_USER,
        payload: data
      })
      //FIXME:
      dispatch(fetchStudent(data.id))
    })
  }
}

export const fetchStudent = (userId) => {
  return dispatch => {
    Network().get('tutors/tutor_by_user', {user_id: userId})
      .then((data) => {
        dispatch({
          type: StudentAccountTypes.SET_ACCOUNT_STUDENT,
          payload: data
        })
      })
  }
}

