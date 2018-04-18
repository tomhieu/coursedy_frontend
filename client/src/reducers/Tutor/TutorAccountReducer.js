import { TutorAccountTypes } from '../../constants/index';

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
    case TutorAccountTypes.SET_ACCOUNT_TUTOR:
      return {...state, tutor: action.payload}
    case TutorAccountTypes.UPDATE_TUTOR_EDU:
      return {...state, tutor: action.payload}
    default:
      return state;
  }
};

export default TutorAccountReducer
