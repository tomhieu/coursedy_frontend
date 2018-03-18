import {REMOVE_ASYNC_ACTION, ADD_ASYNC_ACTION} from "../actions/AsyncActionCreator";
const LoadingMask = (state = {
    processingActions: []
}, action) => {
  const clonedProcessingActions = JSON.parse(JSON.stringify(state.processingActions));
    switch (action.type) {
        case ADD_ASYNC_ACTION:
            clonedProcessingActions.push(action.action);
            return Object.assign({}, state, {processingActions: clonedProcessingActions});
        case REMOVE_ASYNC_ACTION:
            const actionIndex = clonedProcessingActions.findIndex((act) => act === action.action);
            clonedProcessingActions.splice(actionIndex, 1);
            return Object.assign({}, state, {processingActions: clonedProcessingActions});
        default:
            return state;
    }
};

export default LoadingMask;