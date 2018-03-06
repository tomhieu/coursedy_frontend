import * as ActionTypes from '../constants/Teachers';
import Network from '../utils/network';

export const fetchTeachers = (query) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_TEACHERS,
      payload: Network().get('teachers', query)
    });
  };
};
