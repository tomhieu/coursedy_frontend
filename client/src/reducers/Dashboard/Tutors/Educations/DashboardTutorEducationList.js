import * as actionTypes from "constants/DashboardTutorEducationList";

const DashboardTutorEducationList = (state = {
  showNewTutorEducationForm: false
}, action) => {
  switch (action.type) {
    case actionTypes.SHOW_DASHBOARD_TUTOR_NEW_EDUCATION_FORM:
      return {...state, showNewTutorEducationForm: true}
    case actionTypes.HIDE_DASHBOARD_TUTOR_NEW_EDUCATION_FORM:
      return {...state, showNewTutorEducationForm: false}
    default:
      return state
  }
}

export default DashboardTutorEducationList
