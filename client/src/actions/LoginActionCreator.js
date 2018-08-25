import * as types from '../constants/LoginComponent';
import * as Actions from './SessionActionCreator';
import Network from '../utils/network';
import { globalHistory } from '../utils/globalHistory';

export const clearError = () => {
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_LOGIN_ERROR,
      payload: { errors: null }
    });
  };
};
