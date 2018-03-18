import {
  TutorAccountTypes
} from '../constants/index';

const EducationData = (state = {}, action) => {
  switch (action.type) {
    case TutorAccountTypes.RECEIVE_EDUCATION_DATA:
      return {
        ...state,
        degrees: action.data.degrees,
        certificates: action.data.certificates,
        skills: action.data.skills,
        level: action.data.level
      }
    case TutorAccountTypes.REMOVE_UPLOADED_DOCUMENT:
      return Object.assign({}, state, {degrees: state['degrees'].filter(doc => doc.id !== action.data)});
    case TutorAccountTypes.RECEIVE_DRGREES_DATA:
      return Object.assign({}, state, {listLevel: action.data})
    case TutorAccountTypes.RECEIVE_SKILLS_DATA:
      return Object.assign({}, state, {skillSet: action.data})
    case TutorAccountTypes.RECEIVE_CERTIFICATES_DATA:
      return Object.assign({}, state, {certificateSet: action.data})
    default:
      return state
  }
}

export default EducationData;