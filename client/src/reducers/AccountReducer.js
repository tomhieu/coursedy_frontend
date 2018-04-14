import { AccountTypes } from '../constants/index'

const AccountReducer = (state = {
  showEmailConfirmationModal: false,
  user: {},
  editProfileMode: false
}, action) => {
  switch (action.type) {
    case AccountTypes.SET_ACCOUNT_USER:
      return {...state, user: action.payload}
    case AccountTypes.SHOW_REQUIRED_EMAIL_CONFIRMATION_MODAL:
      return {...state, showEmailConfirmationModal: true}
    case AccountTypes.HIDE_REQUIRED_EMAIL_CONFIRMATION_MODAL:
      return {...state, showEmailConfirmationModal: false}
    case AccountTypes.ENABLE_EDIT_PROFILE_MODE:
      return {...state, editProfileMode: true}
    case AccountTypes.DISABLE_EDIT_PROFILE_MODE:
      return {...state, editProfileMode: false}
    default:
      return state
  }
}

export default AccountReducer
