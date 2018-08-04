import Network from '../utils/network'
import * as thirdPartyActions from 'constants/ThirdPartyLoginConstants'
import * as thirdPartyLoginActions from "../constants/ThirdPartyLoginConstants";
import {loginFacebook, loginGoogle} from "./SessionActionCreator";

export const setFacebookResponse = (response) => {
  return {
    type: thirdPartyActions.SET_FACEBOOK_LOGIN_RESPONSE,
    payload: response
  }
}

export const setGoogleResponse = (response) => {
  return {
    type: thirdPartyActions.SET_GOOGLE_LOGIN_RESPONSE,
    payload: response
  }
}

export const set3RdLoginErrors = (error) => {
  return dispatch => {
    dispatch({
      type: thirdPartyLoginActions.SET_3RD_LOGIN_ERROR_RESPONSE,
      payload: error
    })
  }
}

export const reset3RdLoginForm = () => {
  return dispatch => {
    dispatch({
      type: thirdPartyLoginActions.RESET_3RD_LOGIN_FORM
    })
  }
}

export const checkUserExistance = (email, response, provider) => {
  return dispatch => {
    Network().get('users/get_user', {email: email}).then(({exist}) => {
      if (!exist) {
        dispatch({
          type: thirdPartyLoginActions.SHOW_ROLE_SELECTION_FORM
        })
      } else {
        if (provider == 'facebook') {
          let {accessToken, id} = response
          dispatch(loginFacebook(accessToken, id))
        } else if (provider == 'google') {
          let {tokenId} = response
          dispatch(loginGoogle(tokenId))
        }
        dispatch(reset3RdLoginForm())
      }
    })
  }
}