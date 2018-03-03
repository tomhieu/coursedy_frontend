import * as ActionTypes from '../constants/Teachers';
import Network from '../utils/network';


export const fetchTeachers = (query) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_TEACHERS
    });

    Network().get('teachers', query).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_TEACHERS_SUCCESS, payload: response
      });
    }, (errors) => {
      dispatch({
        type: ActionTypes.FETCH_TEACHERS_FAIL, error: errors
      });
    });
  };
};
