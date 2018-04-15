import { AccountTypes } from '../constants/index'
import * as AsyncActions from '../actions/AsyncActionCreator'

const AccountReducer = (state = {
  showEmailConfirmationModal: false,
  user: {},
  editProfileMode: false,
  editAvatarMode: false,
  avatarSelected: false
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
    case AccountTypes.ENABLE_EDIT_AVATAR:
      return {...state, editAvatarMode: true}
    case AccountTypes.DISABLE_EDIT_AVATAR:
      return {...state, editAvatarMode: false}
    case AccountTypes.UPLOAD_AVATAR + AsyncActions.FULFILLED:
      return {...state, user: action.payload}
    case AccountTypes.AVATAR_SELECTED:
      return {...state, avatarSelected: true}
    case AccountTypes.AVATAR_DESELECTED:
      return {...state, avatarSelected: false}
    default:
      return state
  }
}

export default AccountReducer
