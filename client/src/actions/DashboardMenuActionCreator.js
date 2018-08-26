import { ACTIVATE_DASHBOARD_MENU_TAB } from './AsyncActionCreator';

export const activateTab = (tabId) => {
  return {
    type: ACTIVATE_DASHBOARD_MENU_TAB,
    data: tabId
  };
};
