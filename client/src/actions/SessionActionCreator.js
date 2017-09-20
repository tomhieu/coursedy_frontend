import { push } from 'react-router-redux';
import * as types from '../constants/Session'
import {globalHistory} from '../utils/globalHistory'
import queryString from 'query-string'
import Network from '../utils/network'

export const fetchCurrentUser = (dispatch) => {
  Network().get('current_user')
    .then((data) => {
      dispatch({
        type: types.SET_CURRENT_USER,
        payload: data.data
      })
    }, (errors) => {
      // console.log(errors);
    })
}

export const setCurrentUser = () => {
  return dispatch => {
    const confirmation  = queryString.parse(globalHistory.location.search)

    if (localStorage.getItem('ezyLearningToken')) {
      fetchCurrentUser(dispatch);
    } else if (confirmation.account_confirmation_success == 'true' && confirmation.token) {
      // redirect from api devise's confirmation
      localStorage.setItem('ezyLearningToken', confirmation.token)
      localStorage.setItem('ezyLearningClient', confirmation.client_id)
      localStorage.setItem('ezyLearningUid', confirmation.uid)
      fetchCurrentUser(dispatch);
      globalHistory.replace('/');
    }
  };
}