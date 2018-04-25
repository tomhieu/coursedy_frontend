import { TutorAccountTypes } from '../../constants/index';
import {FETCH_TUTOR_DATA} from "../../constants/Session";
import {FULFILLED} from "../../actions/AsyncActionCreator";

const TutorAccountReducer = (state = {
  tutor: {degrees: [], categories: [], districts: [], editEducationMode: false}
}, action) => {
  switch (action.type) {
    case TutorAccountTypes.UPDATE_TUTOR_EDU:
      return {...state, tutor: action.payload}
    case TutorAccountTypes.ENABLE_EDIT_TUTOR_EDUCATION_MODE:
      return {...state, editEducationMode: true}
    case TutorAccountTypes.DISABLE_EDIT_TUTOR_EDUCATION_MODE:
      return {...state, editEducationMode: false}
    case FETCH_TUTOR_DATA + FULFILLED:
      return {...state, tutor: action.payload}
    case TutorAccountTypes.UPDATE_TUTOR_EDU:
      return {...state, tutor: action.payload}
    default:
      return state;
  }
};

export default TutorAccountReducer
