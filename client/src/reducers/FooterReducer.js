import * as types from '../constants/WebConstants';

const footer = (state = {
  show: true
}, action) => {
  switch (action.type) {
    case types.SHOW_FOOTER:
      return {...state, show: true};
    case types.HIDE_FOOTER:
      return {...state, show: false};
    default:
      return state;
  }
};

export default footer;
