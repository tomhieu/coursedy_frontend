import * as actionTypes from "constants/DashboardTutorEducationList";

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