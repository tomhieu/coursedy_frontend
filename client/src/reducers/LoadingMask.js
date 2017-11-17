import {FETCHING_COMPLETE, FETCHING_DATA} from "../actions/actionCreators";
const LoadingMask = (state = {
    isFetching: false
}, action) => {
    switch (action.type) {
        case FETCHING_DATA:
            return {...state, isFetching: true}
        case FETCHING_COMPLETE:
            return {...state, isFetching: false}
        default:
            return state;
    }
};

export default LoadingMask;