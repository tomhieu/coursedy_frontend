import Network from "utils/network";
import { AccountTypes } from '../constants/index'
import {ACCOUNT} from '../actions/AsyncActionCreator'

export const updatePassword = (data) => {
  return {
    type: ACCOUNT.complete_updating_password,
    payload: Network().update('auth', data)
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