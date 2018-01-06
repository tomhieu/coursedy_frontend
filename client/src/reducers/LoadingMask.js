import {HIDE_LOADING_MASK, SHOW_LOADING_MASK} from "../actions/actionCreators";
const LoadingMask = (state = {
    isFetching: false
}, action) => {
    switch (action.type) {
        case SHOW_LOADING_MASK:
            return Object.assign({}, state, {isFetching: true});
        case HIDE_LOADING_MASK:
            return Object.assign({}, state, {isFetching: false});
        default:
            return state;
    }
};

export default LoadingMask;