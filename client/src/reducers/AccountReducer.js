import { AccountTypes } from '../constants/index'

const AccountReducer = (state = {
  editProfileMode: false,
  editEducationMode: false,
  editPasswordMode: false,
  showEmailConfirmationModal: false,
  user: {},
}, action) => {
  switch (action.type) {
    case AccountTypes.ENABLE_EDIT_PROFILE_MODE:
      return {...state, editProfileMode: true}
    case AccountTypes.DISABLE_EDIT_PROFILE_MODE:
      return {...state, editProfileMode: false}
    case AccountTypes.ENABLE_EDIT_PASSWORD_MODE:
      return {...state, editPasswordMode: true}
    case AccountTypes.DISABLE_EDIT_PASSWORD_MODE:
      return {...state, editPasswordMode: false}
    case AccountTypes.SET_ACCOUNT_USER:
      return {...state, user: action.payload}
    case AccountTypes.SHOW_REQUIRED_EMAIL_CONFIRMATION_MODAL:
      return {...state, showEmailConfirmationModal: true}
    case AccountTypes.HIDE_REQUIRED_EMAIL_CONFIRMATION_MODAL:
      return {...state, showEmailConfirmationModal: false}
    default:
      return state
  }
}

export default AccountReducer
