import * as WebConstant from '../constants/WebConstants';

export const openConfirmationPopup = (title, message, callback) => {
  return {
    type: WebConstant.OPEN_CONFIRMATION_POPUP,
    payload: { title, message, callback }
  };
};

export const closeConfirmationPopup = () => {
  return {
    type: WebConstant.CLOSE_CONFIRMATION_POPUP
  };
};
