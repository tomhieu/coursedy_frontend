import { TutorAccountTypes } from '../../constants/index';
import { FETCH_TUTOR_DATA, SIGN_OUT } from '../../constants/Session';
import {
  FULFILLED, PENDING, REJECTED
} from '../../actions/AsyncActionCreator';

const initialState = {
  isFetchingTutor: false,
  tutor: {
    degrees: [], categories: [], districts: [], editEducationMode: false
  }
};

const TutorAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case TutorAccountTypes.UPDATE_TUTOR_EDU:
      return { ...state, tutor: action.payload };
    case TutorAccountTypes.ENABLE_EDIT_TUTOR_EDUCATION_MODE:
      return { ...state, editEducationMode: true };
    case TutorAccountTypes.DISABLE_EDIT_TUTOR_EDUCATION_MODE:
      return { ...state, editEducationMode: false };
    case FETCH_TUTOR_DATA + PENDING:
      return { ...state, isFetchingTutor: true };
    case FETCH_TUTOR_DATA + FULFILLED:
      return { ...state, tutor: action.payload, isFetchingTutor: false };
    case FETCH_TUTOR_DATA + REJECTED:
      return { ...state, isFetchingTutor: false };
    case SIGN_OUT + REJECTED:
    case SIGN_OUT + FULFILLED:
      return initialState;
    default:
      return state;
  }
};

export default TutorAccountReducer;
