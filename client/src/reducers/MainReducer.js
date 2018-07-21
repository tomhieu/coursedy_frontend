import * as types from '../constants/WebConstants';

const MainReducer = (state = {
  showFooter: true,
  stetchAuto: true,
  darkHeader: false,
  customHeaderClass: '',
  showConfirmationPopup: false,
  confirmationTitle: undefined,
  confirmationMessage: undefined,
  confirmCallback: undefined
}, action) => {
  switch (action.type) {
    case types.SHOW_FOOTER:
      return {...state, showFooter: true};
    case types.ADD_HEADER_CLASS:
      return {...state, customHeaderClass: action.payload};
    case types.REMOVE_HEADER_CLASS:
      return {...state, customHeaderClass: ''};
    case types.HIDE_FOOTER:
      return {...state, showFooter: false};
    case types.STETCH_AUTO:
      return {...state, stetchAuto: true};
    case types.STETCH_FULL:
      return {...state, stetchAuto: false};
    case types.SHOW_DARK_HEADER:
      return {...state, darkHeader: true};
    case types.SHOW_WHITE_HEADER:
      return {...state, darkHeader: false};
    case types.OPEN_CONFIRMATION_POPUP:
      return {...state, showConfirmationPopup: true,
        confirmationTitle: action.payload.title,
        confirmationMessage: action.payload.message,
        confirmCallback: action.payload.callback
      };
    case types.CLOSE_CONFIRMATION_POPUP:
      return {...state, showConfirmationPopup: false,
        confirmationTitle: undefined, confirmationMessage: undefined, confirmCallback: undefined};
    default:
      return state;
  }
};

export default MainReducer;
