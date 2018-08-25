import * as types from 'constants/ThirdPartyLoginConstants';

const ThirdPartyLoginReducer = (state = {
  facebook: null,
  google: null,
  errors: [],
  showRoleSelectingModal: false
}, action) => {
  switch (action.type) {
    case types.SET_GOOGLE_LOGIN_RESPONSE:
      return { ...state, google: action.payload };
    case types.SET_FACEBOOK_LOGIN_RESPONSE:
      return { ...state, facebook: action.payload };
    case types.SET_3RD_LOGIN_ERROR_RESPONSE:
      return { ...state, errors: [action.payload], showRoleSelectingModal: false };
    case types.RESET_3RD_LOGIN_FORM:
      return {
        ...state, facebook: {}, google: {}, errors: [], showRoleSelectingModal: false
      };
    case types.SHOW_ROLE_SELECTION_FORM:
      return { ...state, showRoleSelectingModal: true };
    default:
      return state;
  }
};

export default ThirdPartyLoginReducer;
