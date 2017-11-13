import * as types from '../constants/TutorAccount';

const TutorAccount = (state = {
  editProfileMode: false,
  editEducationMode: false,
  editPasswordMode: false,
  showEmailConfirmationModal: false,
  user: {}
}, action) => {
  switch (action.type) {
    case types.ENABLE_EDIT_TUTOR_PROFILE_MODE:
      return {...state, editProfileMode: true}
    case types.DISABLE_EDIT_TUTOR_PROFILE_MODE:
      return {...state, editProfileMode: false}
    case types.ENABLE_EDIT_TUTOR_EDUCATION_MODE:
      return {...state, editEducationMode: true}
    case types.DISABLE_EDIT_TUTOR_EDUCATION_MODE:
      return {...state, editEducationMode: false}
    case types.ENABLE_EDIT_TUTOR_PASSWORD_MODE:
      return {...state, editPasswordMode: true}
    case types.DISABLE_EDIT_TUTOR_PASSWORD_MODE:
      return {...state, editPasswordMode: false}
    case types.SET_ACCOUNT_USER:
      return {...state, user: action.payload}
    case types.SHOW_REQUIRED_EMAIL_CONFIRMATION_MODAL:
      return {...state, showEmailConfirmationModal: true}
    case types.HIDE_REQUIRED_EMAIL_CONFIRMATION_MODAL:
      return {...state, showEmailConfirmationModal: false}
    default:
      return state;
  }
};

export default TutorAccount;
