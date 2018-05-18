import * as types from '../constants/WebConstants';

const MainReducer = (state = {
  showFooter: true,
  stetchAuto: true,
  darkHeader: false,
}, action) => {
  switch (action.type) {
    case types.SHOW_FOOTER:
      return {...state, showFooter: true};
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
    default:
      return state;
  }
};

export default MainReducer;
