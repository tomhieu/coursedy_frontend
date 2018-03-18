import { StudentAccountTypes } from '../../../constants/index'

const StudentAccountReducer = (state = {
  editProfileMode: false,
  editEducationMode: false,
  editPasswordMode: false,
  showEmailConfirmationModal: false,
  user: {},
  tutor: {degrees: [], categories: [], districts: []}
}, action) => {
  switch (action.type) {
    case StudentAccountTypes.ENABLE_EDIT_STUDENT_PROFILE_MODE:
      return {...state, editProfileMode: true}
    case StudentAccountTypes.DISABLE_EDIT_STUDENT_PROFILE_MODE:
      return {...state, editProfileMode: false}
    case StudentAccountTypes.ENABLE_EDIT_STUDENT_EDUCATION_MODE:
      return {...state, editEducationMode: true}
    case StudentAccountTypes.DISABLE_EDIT_STUDENT_EDUCATION_MODE:
      return {...state, editEducationMode: false}
    case StudentAccountTypes.ENABLE_EDIT_STUDENT_PASSWORD_MODE:
      return {...state, editPasswordMode: true}
    case StudentAccountTypes.DISABLE_EDIT_STUDENT_PASSWORD_MODE:
      return {...state, editPasswordMode: false}
    case StudentAccountTypes.SET_ACCOUNT_USER:
      return {...state, user: action.payload}
    case StudentAccountTypes.SET_ACCOUNT_STUDENT:
      return {...state, tutor: action.payload}
    case StudentAccountTypes.UPDATE_STUDENT_EDU:
      return {...state, tutor: action.payload}
    case StudentAccountTypes.SHOW_REQUIRED_EMAIL_CONFIRMATION_MODAL:
      return {...state, showEmailConfirmationModal: true}
    case StudentAccountTypes.HIDE_REQUIRED_EMAIL_CONFIRMATION_MODAL:
      return {...state, showEmailConfirmationModal: false}
    default:
      return state
  }
}

export default StudentAccountReducer
