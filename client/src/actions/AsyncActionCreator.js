export const FULFILLED = '_FULFILLED';
export const PENDING = '_PENDING';
export const REJECTED = '_REJECTED';

import {SHOW_LOADING_MASK} from "./actionCreators";
import Network from '../utils/network'
import {HIDE_LOADING_MASK} from "actions/actionCreators";
export const get = (url, onSucessAction, onErrorAction, params) => {
    return dispatch => {
        dispatch({type: SHOW_LOADING_MASK});
        return Network().get(url, params).then((response) => {
            onSucessAction(response);
        }, (errors) => {
            onErrorAction(errors);
        });
    }
}

export const post = (url, body, onSucessAction, onErrorAction) => {
    return dispatch => {
        dispatch({type: SHOW_LOADING_MASK});
        return Network().post(url, body).then((response) => {
            dispatch({
                type: HIDE_LOADING_MASK
            });
            onSucessAction(response);
        }, (errors) => {
            onErrorAction(errors);
        });
    }
}