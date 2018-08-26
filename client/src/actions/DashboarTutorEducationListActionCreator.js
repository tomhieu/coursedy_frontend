import * as actionTypes from 'constants/DashboardTutorEducationList';
import { FETCH_TUTOR_DATA } from 'constants/Session';
import Network from '../utils/network';

export const showDashboardTutorNewEducationForm = () => {
  return {
    type: actionTypes.SHOW_DASHBOARD_TUTOR_NEW_EDUCATION_FORM
  };
};

export const hideDashboardTutorNewEducationForm = () => {
  return {
    type: actionTypes.HIDE_DASHBOARD_TUTOR_NEW_EDUCATION_FORM
  };
};

export const createEducation = (tutorId, params) => {
  return (dispatch) => {
    const response = Network().post(`tutors/${tutorId}/tutor_educations`, params).then(data => data);
    response.then(() => dispatch(hideDashboardTutorNewEducationForm()));

    dispatch({
      type: actionTypes.CREATE_EDUCATION,
      payload: response,
      meta: 'tutorCourseListPlaceholder'
    });
  };
};

export const loadEducationList = (tutorId) => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_EDUCATION_LIST,
      payload: Network().get(`tutors/${tutorId}/tutor_educations`),
      meta: 'userAccountPlaceholder'
    })
  }
}

export const deleteEducation = (tutorId, id) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_EDUCATION_ITEM,
      payload: Network().delete(`tutors/${tutorId}/tutor_educations/${id}`)
    });
  };
};

export const showEditEducationForm = (educationId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SHOW_EDIT_EDUCATION_FORM,
      payload: educationId
    });
  };
};

export const hideEditEducationForm = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.HIDE_EDIT_EDUCATION_FORM
    });
  };
};

export const updateEducation = (tutorId, educationId, params) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_TUTOR_EDUCATION_ITEM,
      payload: Network().update(`tutors/${tutorId}/tutor_educations/${educationId}`, params)
    });
  };
};
