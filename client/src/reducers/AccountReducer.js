import { AccountTypes } from '../constants/index'

const AccountReducer = (state = {
  showEmailConfirmationModal: false,
  user: {},
}, action) => {
  switch (action.type) {
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
