import * as actionTypes from "actions/AsyncActionCreator";

const DashboardMenu = (state = {
  activatedTab: 'my_profile'
}, action) => {
  switch (action.type) {
    case actionTypes.ACTIVATE_DASHBOARD_MENU_TAB:
      return {...state, activatedTab: action.data}
    default:
      return state
  }
}

export default DashboardMenu
