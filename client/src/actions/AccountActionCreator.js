import AccountTypes from '../constants/index'

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