import Network from "utils/network";
import { AccountTypes } from '../constants/index'

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
  dispatch => {
    Network().post('/account/tutor/change/password', data).then((response) => {
      dispatch({
        type: AccountTypes.COMPLETE_UPDATE_PASSWORD
      })
    });
  }
}

export const showProfileEditForm = () => {
  return {
    type: AccountTypes.ENABLE_EDIT_PROFILE_MODE
  }
}

export const hideProfileEditForm = () => {
  return {
    type: AccountTypes.DISABLE_EDIT_PROFILE_MODE
  }
}

export const closeEmailConfirmationModal = () => {
  return {
    type: AccountTypes.HIDE_REQUIRED_EMAIL_CONFIRMATION_MODAL
  }
}

export const savePersonData = (name, email, date_of_birth, address, gender, emailChanged) => {
  let body = {name, email, date_of_birth, address, gender}
  return dispatch => {
    Network().update('/auth', body).then((response) => {
      if (emailChanged){
        dispatch({
          type: AccountTypes.SHOW_REQUIRED_EMAIL_CONFIRMATION_MODAL
        })
      }
      dispatch({
        type: AccountTypes.SET_ACCOUNT_USER,
        payload: response
      })
      dispatch(hideProfileEditForm())
    })
  }
}