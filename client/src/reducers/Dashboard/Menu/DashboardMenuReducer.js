import * as actionTypes from 'actions/AsyncActionCreator';
import * as constants from '../../../constants/WebConstants';

const DashboardMenu = (state = {
  activatedTab: 'my_profile',
  isCollapseDashboard: false
}, action) => {
  switch (action.type) {
    case actionTypes.ACTIVATE_DASHBOARD_MENU_TAB:
      return { ...state, activatedTab: action.data };
    case constants.COLLAPSE_DARKBOARD:
      const isCurrentDashboardState = state.isCollapseDashboard;
      return { ...state, isCollapseDashboard: !isCurrentDashboardState };
    default:
      return state;
  }
};

export default DashboardMenu;
