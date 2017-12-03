import {FETCHING_COMPLETE, FETCHING_DATA} from "../actions/actionCreators";
const LoadingMask = (state = {
    isFetching: false
}, action) => {
    switch (action.type) {
        case FETCHING_DATA:
            return Object.assign({}, state, {isFetching: true});
        case FETCHING_COMPLETE:
            return Object.assign({}, state, {isFetching: false});
        default:
            return state;
    }
};

export default LoadingMask;