import {
  TutorAccountTypes
} from '../constants/index';
import {FETCH_TEACHER_SKILL_SET, FULFILLED} from "../actions/AsyncActionCreator";

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
    case FETCH_TEACHER_SKILL_SET + FULFILLED:
      const skillSet = action.payload.map((category) => {
        return {
          id: category.id,
          text: category.name,
          children: category.children.map((spec) => ({
              id: spec.id,
              text: spec.name
            })
          )}
      });
      return Object.assign({}, state, {skillSet: skillSet})
    case TutorAccountTypes.RECEIVE_CERTIFICATES_DATA:
      return Object.assign({}, state, {certificateSet: action.data})
    default:
      return state
  }
}

export default EducationData;