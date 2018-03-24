import { TutorAccountTypes } from '../constants/index';

const TutorAccount = (state = {
  editProfileMode: false,
  editEducationMode: false,
  editPasswordMode: false,
  showEmailConfirmationModal: false,
  user: {},
  tutor: {degrees: [], categories: [], districts: []}
}, action) => {
  switch (action.type) {
    case TutorAccountTypes.ENABLE_EDIT_TUTOR_PROFILE_MODE:
      return {...state, editProfileMode: true}
    case TutorAccountTypes.DISABLE_EDIT_TUTOR_PROFILE_MODE:
      return {...state, editProfileMode: false}
    case TutorAccountTypes.ENABLE_EDIT_TUTOR_EDUCATION_MODE:
      return {...state, editEducationMode: true}
    case TutorAccountTypes.DISABLE_EDIT_TUTOR_EDUCATION_MODE:
      return {...state, editEducationMode: false}
    case TutorAccountTypes.ENABLE_EDIT_TUTOR_PASSWORD_MODE:
      return {...state, editPasswordMode: true}
    case TutorAccountTypes.DISABLE_EDIT_TUTOR_PASSWORD_MODE:
      return {...state, editPasswordMode: false}
    case TutorAccountTypes.SET_ACCOUNT_USER:
      return {...state, user: action.payload}
    case TutorAccountTypes.SET_ACCOUNT_TUTOR:
      return {...state, tutor: action.payload}
    case TutorAccountTypes.UPDATE_TUTOR_EDU:
      return {...state, tutor: action.payload}
    case TutorAccountTypes.SHOW_REQUIRED_EMAIL_CONFIRMATION_MODAL:
      return {...state, showEmailConfirmationModal: true}
    case TutorAccountTypes.HIDE_REQUIRED_EMAIL_CONFIRMATION_MODAL:
      return {...state, showEmailConfirmationModal: false}
    default:
      return state;
  }
};

export default TutorAccount;
