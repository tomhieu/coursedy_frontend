import Network from "utils/network";
import {TT} from "utils/locale";
import {FETCH_TUTOR_COURSES} from "actions/AsyncActionCreator";

export const fetchListTutorCourse = () => {
    return dispatch => {
      dispatch({
        type: FETCH_TUTOR_COURSES,
        payload: Network().get('courses')
      })
    }
};
