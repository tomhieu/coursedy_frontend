import * as actionTypes from "constants/DashboardTutorEducationList";
import * as AsynPostfix from "constants/AsynPostfix";

const DashboardTutorEducationList = (state = {
  showNewTutorEducationForm: false,
  educations: []
}, action) => {
  switch (action.type) {
    case actionTypes.SHOW_DASHBOARD_TUTOR_NEW_EDUCATION_FORM:
      return {...state, showNewTutorEducationForm: true}
    case actionTypes.HIDE_DASHBOARD_TUTOR_NEW_EDUCATION_FORM:
      return {...state, showNewTutorEducationForm: false}
    case actionTypes.CREATE_EDUCATION + AsynPostfix.FULFILLED:
      let educations = state.educations.slice(0)
      educations.unshift(action.payload)
      return {...state, educations: educations}
    case actionTypes.FETCH_EDUCATION_LIST + AsynPostfix.FULFILLED:
      return {...state, educations: action.payload}
    case actionTypes.DELETE_EDUCATION_ITEM + AsynPostfix.FULFILLED:
      educations = state.educations.filter((e) => {return e.id != action.payload.id})
      return {...state, educations: educations}
    default:
      return state
  }
}

export default DashboardTutorEducationList
