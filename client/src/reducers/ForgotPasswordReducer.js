import * as asyncAction from 'actions/AsyncActionCreator'
import * as types from 'constants/ForgotPasswordComponent';

const forgotPassword = (state = {
  isFetching: true, errors: null,
  emailSent: null,
  sentEmailSuccessfully: false
}, action) => {
  switch (action.type) {
    case asyncAction.RESET_PASSWORD + asyncAction.PENDING:
      return {...state, isFetching: true, errors: null, sentEmailSuccessfully: false}
    case asyncAction.RESET_PASSWORD + asyncAction.FULFILLED:
      return {...state, ...action.payload, isFetching: false, sentEmailSuccessfully: true}
    case asyncAction.RESET_PASSWORD + asyncAction.REJECTED:
      return {...state, errors: action.payload.errors, isFetching: false}
    case types.CLEAR_FORGOT_PASSWORD_ERROR:
      return {...state, errors: null, isFetching: false}
    default:
      return state
  }
}

export default forgotPassword
