import {ACCOUNT} from '../actions/AsyncActionCreator'
import Network from "utils/network";

export const showPasswordEditForm = () => {
  return {
    type: AccountTypes.ENABLE_EDIT_PASSWORD_MODE
  }
}

export const hidePasswordEditForm = () => {
  return {
    type: AccountTypes.DISABLE_EDIT_PASSWORD_MODE
  }
}

export const updatePassword = (data) => {
  return {
    type: ACCOUNT.complete_updating_password,
    payload: Network().update('auth', data)
  }
}