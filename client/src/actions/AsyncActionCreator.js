import {FETCHING_DATA} from "./actionCreators";
import Network from '../utils/network'
export const get = (url, onSucessAction, onErrorAction, params) => {
    return dispatch => {
        dispatch({type: FETCHING_DATA});
        return Network().get(url, params).then(onSucessAction(), onErrorAction());
    }
}

export const post = (url, body, onSucessAction, onErrorAction) => {
    return dispatch => {
        dispatch({type: FETCHING_DATA});
        return Network().post(url, body).then(onSucessAction(), onErrorAction());
    }
}