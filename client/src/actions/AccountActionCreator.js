import Network from "utils/network";
import {AccountTypes}  from '../constants/index'
import {ACCOUNT} from '../actions/AsyncActionCreator'
import {fetchTutor} from "actions/Tutor/Account/TutorAccountActionCreator";
import {TutorAccountTypes} from "constants";

export const updatePassword = (data) => {
  return {
    type: ACCOUNT.complete_updating_password,
    payload: Network().update('auth', data)
  }
}

export const fetchUser = () => {
  return dispatch => {
    Network().get('current_user')
      .then((data) => {
        dispatch({
          type: AccountTypes.SET_ACCOUNT_USER,
          payload: data
        })

        dispatch(fetchTutor(data.id))
      })
  }
}

export const savePersonData = (name, email, date_of_birth, address, gender, emailChanged) => {
  let body = {name, email, date_of_birth, address, gender}
  return dispatch => {
    Network().update('/auth', body).then((response) => {
      if (emailChanged){
        dispatch(showEmailChangedPopup())
      }
      dispatch({
        type: AccountTypes.SET_ACCOUNT_USER,
        payload: response
      })
      dispatch(hideAccountEditForm())
    })
  }
}

export const showAccountEditForm = () => {
  return {
    type: AccountTypes.ENABLE_EDIT_PROFILE_MODE
  }
}

export const hideAccountEditForm = () => {
  return {
    type: AccountTypes.DISABLE_EDIT_PROFILE_MODE
  }
}

export const showEmailChangedPopup = () => {
  return {
    type: AccountTypes.SHOW_REQUIRED_EMAIL_CONFIRMATION_MODAL
  }
}

export const hideEmailChangedPopup = () => {
  return {
    type: AccountTypes.HIDE_REQUIRED_EMAIL_CONFIRMATION_MODAL
  }
}

export const showAvatarEditForm = () => {
  return {
    type: AccountTypes.ENABLE_EDIT_AVATAR
  }
}

export const hideAvatarEditForm = () => {
  return {
    type: AccountTypes.DISABLE_EDIT_AVATAR
  }
}

export const updateAvatar = (avatar) => {
  return {
    type: AccountTypes.UPLOAD_AVATAR,
    payload: Network().update('auth', {avatar: avatar})
  }
}