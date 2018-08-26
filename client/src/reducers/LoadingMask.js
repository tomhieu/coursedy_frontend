import { REMOVE_ASYNC_ACTION, ADD_ASYNC_ACTION } from '../actions/AsyncActionCreator';

const LoadingMask = (state = {
  activatingPlaceholders: []
}, action) => {
  const currentActivatingHolders = JSON.parse(JSON.stringify(state.activatingPlaceholders));
  switch (action.type) {
    case ADD_ASYNC_ACTION:
      currentActivatingHolders.push(action.action);
      return Object.assign({}, state, { activatingPlaceholders: currentActivatingHolders });
    case REMOVE_ASYNC_ACTION:
      const actionIndex = currentActivatingHolders.findIndex(act => act === action.action);
      currentActivatingHolders.splice(actionIndex, 1);
      return Object.assign({}, state, { activatingPlaceholders: currentActivatingHolders });
    default:
      return state;
  }
};

export default LoadingMask;
