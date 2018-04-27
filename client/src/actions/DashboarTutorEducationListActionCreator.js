import * as actionTypes from "constants/DashboardTutorEducationList";
import Network from '../utils/network'
import {FETCH_TUTOR_DATA} from "constants/Session";

export const showDashboardTutorNewEducationForm = () => {
  return {
    type: actionTypes.SHOW_DASHBOARD_TUTOR_NEW_EDUCATION_FORM
  }
}

export const hideDashboardTutorNewEducationForm = () => {
  return {
    type: actionTypes.HIDE_DASHBOARD_TUTOR_NEW_EDUCATION_FORM
  }
}

export const createEducation = (tutorId, params) => {
  return dispatch => {
    let response = Network().post(`tutors/${tutorId}/tutor_educations`, params).then(data => data)
    response.then(() => dispatch(hideDashboardTutorNewEducationForm()))

    dispatch ({
      type: actionTypes.CREATE_EDUCATION,
      payload: response,
      meta: 'tutorCourseListPlaceholder'
    })
  }
}

export const loadEducationList = () => {
  return dispatch => {
    let response = Network().get('tutors/current_tutor').then(data=> data)

    dispatch({
      type: FETCH_TUTOR_DATA,
      payload: response,
      meta: 'userAccountPlaceholder'
    })

    response.then((tutor) => {
      dispatch({
        type: actionTypes.FETCH_EDUCATION_LIST,
        payload: Network().get(`tutors/${tutor.id}/tutor_educations`),
        meta: 'userAccountPlaceholder'
      })
    })
  }
}