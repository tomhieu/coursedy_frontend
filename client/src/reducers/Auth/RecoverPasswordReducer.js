import * as asyncAction from 'actions/AsyncActionCreator';
import * as types from 'constants/RecoverPasswordComponent';

export const CHECK_TOKEN_STATUS = {
  INIT: 'INIT',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
};
const recoverPassword = (state = {
  errors: null, tokenStatus: CHECK_TOKEN_STATUS.INIT
}, action) => {
  switch (action.type) {
    case asyncAction.CHECK_RECOVER_PASSWORD_TOKEN + asyncAction.PENDING:
      return { ...state, errors: null, tokenStatus: CHECK_TOKEN_STATUS.INIT };
    case asyncAction.CHECK_RECOVER_PASSWORD_TOKEN + asyncAction.FULFILLED:
      return {
        ...state, ...action.payload, tokenStatus: CHECK_TOKEN_STATUS.SUCCESS, tokenInValid: false
      };
    case asyncAction.CHECK_RECOVER_PASSWORD_TOKEN + asyncAction.REJECTED:
      return { ...state, errors: action.payload, tokenStatus: CHECK_TOKEN_STATUS.FAIL };
    case types.CLEAR_RECOVER_PASSWORD_ERROR:
      return { ...state, errors: null };
    default:
      return state;
  }
};

export default recoverPassword;
