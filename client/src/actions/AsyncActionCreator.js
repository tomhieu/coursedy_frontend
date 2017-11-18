import {FETCHING_DATA} from "./actionCreators";
import Network from '../utils/network'
import {FETCHING_COMPLETE} from "actions/actionCreators";
export const get = (url, onSucessAction, onErrorAction, params) => {
    return dispatch => {
        dispatch({type: FETCHING_DATA});
        return Network().get(url, params).then((response) => {
            onSucessAction(response);
        }, (errors) => {
            onErrorAction(errors);
        });
    }
}

export const post = (url, body, onSucessAction, onErrorAction) => {
    return dispatch => {
        dispatch({type: FETCHING_DATA});
        return Network().post(url, body).then((response) => {
            dispatch({
                type: FETCHING_COMPLETE
            });
            onSucessAction(response);
        }, (errors) => {
            onErrorAction(errors);
        });
    }
}