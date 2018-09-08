import * as actionTypes from 'constants/DashboardTutorWorkExperienceList';
import * as AsynPostfix from 'constants/AsynPostfix';

const DashboardTutorWorkExperienceList = (state = {
  showNewTutorWorkExperienceForm: false,
  workExperiences: [],
  currentWorkExperience: null
}, action) => {
  switch (action.type) {
    case actionTypes.SHOW_DASHBOARD_TUTOR_NEW_WORK_EXPERIENCE_FORM:
      return { ...state, showNewTutorWorkExperienceForm: true };
    case actionTypes.HIDE_DASHBOARD_TUTOR_NEW_WORK_EXPERIENCE_FORM:
      return { ...state, showNewTutorWorkExperienceForm: false };
    case actionTypes.CREATE_WORK_EXPERIENCE + AsynPostfix.FULFILLED:
      let workExperiences = state.workExperiences.slice(0);
      workExperiences.unshift(action.payload);
      return { ...state, workExperiences };
    case actionTypes.FETCH_WORK_EXPERIENCE_LIST + AsynPostfix.FULFILLED:
      return { ...state, workExperiences: action.payload };
    case actionTypes.DELETE_WORK_EXPERIENCE_ITEM + AsynPostfix.FULFILLED:
      workExperiences = state.workExperiences.filter((w) => { return w.id != action.payload.id; });
      return { ...state, workExperiences };
    case actionTypes.SHOW_EDIT_WORK_EXPERIENCE_FORM:
      const currentWorkExperience = state.workExperiences.filter(w => w.id == action.payload)[0];
      return { ...state, currentWorkExperience };
    case actionTypes.HIDE_EDIT_WORK_EXPERIENCE_FORM:
      return { ...state, currentWorkExperience: null };
    case actionTypes.UPDATE_TUTOR_WORK_EXPERIENCE_ITEM + AsynPostfix.FULFILLED:
      const newWorkExperienceList = state.workExperiences.map(w => (w.id == action.payload.id ? action.payload : w));
      return { ...state, workExperiences: newWorkExperienceList, currentWorkExperience: null };
    default:
      return state;
  }
};

export default DashboardTutorWorkExperienceList;
