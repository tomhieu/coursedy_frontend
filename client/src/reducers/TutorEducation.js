import {
  DOWNLOAD_UPLOADED_DOCUMENT, RECEIVE_DRGREES_DATA, RECEIVE_EDUCATION_DATA,
  REMOVE_UPLOADED_DOCUMENT
} from "actions/TutorAccountActionCreator";
import {RECEIVE_CERTIFICATES_DATA, RECEIVE_SKILLS_DATA} from "../actions/TutorAccountActionCreator";

const loadEducationData = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EDUCATION_DATA:
      return {
        ...state,
        degrees: action.data.degrees,
        certificates: action.data.certificates,
        skills: action.data.skills,
        level: action.data.level
      }
    case REMOVE_UPLOADED_DOCUMENT:
      return Object.assign({}, state, {degrees: state['degrees'].filter(doc => doc.id !== action.data)});
    case RECEIVE_DRGREES_DATA:
      return Object.assign({}, state, {listLevel: action.data})
    case RECEIVE_SKILLS_DATA:
      return Object.assign({}, state, {skillSet: action.data})
    case RECEIVE_CERTIFICATES_DATA:
      return Object.assign({}, state, {certificateSet: action.data})
    default:
      return state
  }
}

export default loadEducationData;