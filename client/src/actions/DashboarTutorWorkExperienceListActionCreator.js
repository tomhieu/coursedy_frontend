import * as actionTypes from 'constants/DashboardTutorWorkExperienceList';
import { FETCH_TUTOR_DATA } from 'constants/Session';
import Network from '../utils/network';

export const showDashboardTutorNewWorkExperienceForm = () => {
  return {
    type: actionTypes.SHOW_DASHBOARD_TUTOR_NEW_WORK_EXPERIENCE_FORM
  };
};

export const hideDashboardTutorNewWorkExperienceForm = () => {
  return {
    type: actionTypes.HIDE_DASHBOARD_TUTOR_NEW_WORK_EXPERIENCE_FORM
  };
};

export const createWorkExperience = (tutorId, params) => {
  return (dispatch) => {
    const response = Network().post(`tutors/${tutorId}/tutor_work_experiences`, params).then(data => data);
    response.then(() => dispatch(hideDashboardTutorNewWorkExperienceForm()));

    dispatch({
      type: actionTypes.CREATE_WORK_EXPERIENCE,
      payload: response,
      meta: 'tutorCourseListPlaceholder'
    });
  };
};

export const loadWorkExperienceList = (tutorId) => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_WORK_EXPERIENCE_LIST,
      payload: Network().get(`tutors/${tutorId}/tutor_work_experiences`),
      meta: 'userAccountPlaceholder'
    })
  }
}

export const deleteWorkExperience = (tutorId, id) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_WORK_EXPERIENCE_ITEM,
      payload: Network().delete(`tutors/${tutorId}/tutor_work_experiences/${id}`)
    });
  };
};

export const showEditWorkExperienceForm = (workExperienceId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SHOW_EDIT_WORK_EXPERIENCE_FORM,
      payload: workExperienceId
    });
  };
};

export const hideEditWorkExperienceForm = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.HIDE_EDIT_WORK_EXPERIENCE_FORM
    });
  };
};

export const updateWorkExperience = (tutorId, workEperienceId, params) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_TUTOR_WORK_EXPERIENCE_ITEM,
      payload: Network().update(`tutors/${tutorId}/tutor_work_experiences/${workEperienceId}`, params)
    });
  };
};
