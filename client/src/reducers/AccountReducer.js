import { AccountTypes } from '../constants/index'
import * as AsynPostfix from '../constants/AsynPostfix'

const AccountReducer = (state = {
  showEmailConfirmationModal: false,
  editProfileMode: false,
  editAvatarMode: false,
  avatarSelected: false,
  passwordUpdated: false
}, action) => {
  switch (action.type) {
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
    case AccountTypes.UPLOAD_AVATAR + AsynPostfix.FULFILLED:
      return {...state, user: action.payload, editAvatarMode: false}
    case AccountTypes.AVATAR_SELECTED:
      return {...state, avatarSelected: true}
    case AccountTypes.AVATAR_DESELECTED:
      return {...state, avatarSelected: false}
    case AccountTypes.UPDATE_PASSWORD_SUCCESSFULLY:
      return {...state, passwordUpdated: true}
    case AccountTypes.RESET_UPDATE_PASSWORD_FORM:
      return {...state, passwordUpdated: false}
    default:
      return state
  }
}

export default AccountReducer
