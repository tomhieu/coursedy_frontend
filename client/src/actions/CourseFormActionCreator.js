import * as types from '../constants/CourseFormComponent';
import Network from '../utils/network'
import {TT} from '../utils/locale'

export const createCourse = (title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image) => {
  return dispatch => {
    let body = {title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image}

    Network().post('courses', body).then((response) => {
      dispatch({
        type: types.CREATE_SUCCESSFULLY,
        payload: {}
      })
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0)?
        errors :
        [TT.t('email_or_password_incorrect')]

      dispatch({
        type: types.CREATE_COURSE_FAILED,
        payload: {errors: error_messages}
      })
    })
  }
}