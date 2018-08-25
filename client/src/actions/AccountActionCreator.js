import Network from 'utils/network';
import { fetchTutor } from 'actions/Tutor/Account/TutorAccountActionCreator';
import { AccountTypes } from '../constants/index';
import { ACCOUNT } from './AsyncActionCreator';
import { UPDATE_CURRENT_USER } from '../constants/Session';

export const updatePassword = (data) => {
  return (dispatch) => {
    dispatch({
      type: ACCOUNT.complete_updating_password,
      payload: Network().update('auth', data),
      meta: 'ezylearningFullLoader'
    });
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CURRENT_USER,
      payload: Network().get('current_user')
        .then((data) => {
          dispatch(fetchTutor(data.id));
        })
    });
  };
};

export const savePersonData = (name, email, date_of_birth, address, gender, emailChanged) => {
  const body = {
    name, email, date_of_birth, address, gender
  };
  return (dispatch) => {
    const response = dispatch({
      type: UPDATE_CURRENT_USER,
      payload: Network().update('/auth', body)
    });

    response.then((response) => {
      if (emailChanged) {
        dispatch(showEmailChangedPopup());
      }
      dispatch(hideAccountEditForm());
    });
  };
};

export const showAccountEditForm = () => {
  return {
    type: AccountTypes.ENABLE_EDIT_PROFILE_MODE
  };
};

export const hideAccountEditForm = () => {
  return {
    type: AccountTypes.DISABLE_EDIT_PROFILE_MODE
  };
};

export const showEmailChangedPopup = () => {
  return {
    type: AccountTypes.SHOW_REQUIRED_EMAIL_CONFIRMATION_MODAL
  };
};

export const hideEmailChangedPopup = () => {
  return {
    type: AccountTypes.HIDE_REQUIRED_EMAIL_CONFIRMATION_MODAL
  };
};

export const showAvatarEditForm = () => {
  return {
    type: AccountTypes.ENABLE_EDIT_AVATAR
  };
};

export const hideAvatarEditForm = () => {
  return {
    type: AccountTypes.DISABLE_EDIT_AVATAR
  };
};

export const updateAvatar = (avatar) => {
  return {
    type: UPDATE_CURRENT_USER,
    payload: Network().update('auth', { avatar }),
    meta: 'ezylearningFullLoader'
  };
};

export const avatarSelected = () => {
  return {
    type: AccountTypes.AVATAR_SELECTED
  };
};

export const avatarDeselected = () => {
  return {
    type: AccountTypes.AVATAR_DESELECTED
  };
};

export const updatePasswordSuccessfully = () => {
  return {
    type: AccountTypes.UPDATE_PASSWORD_SUCCESSFULLY
  };
};

export const resetUpdatePasswordForm = () => {
  return {
    type: AccountTypes.RESET_UPDATE_PASSWORD_FORM
  };
};

export const clearPasswordError = () => {
  return {
    type: AccountTypes.CLEAR_PASSWORD_ERRORS
  };
};
