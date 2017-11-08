import Network from "utils/network";
import {TT} from "utils/locale";

export const FETCH_TUTOR_COURSES_SUCCESS = 'FETCH_TUTOR_COURSES_SUCCESS';
export const FETCH_TUTOR_COURSES_FAIL = 'FETCH_TUTOR_COURSES_FAIL';

export const fetchListTutorCourse = () => {
    return dispatch => {
        Network().get('courses').then((response) => {
           dispatch({
             type: FETCH_TUTOR_COURSES_SUCCESS,
             payload: response.data
           })
         }, (errors) => {
           const error_messages = (errors && Array.isArray(errors) && errors.length > 0) ?
                                errors : [TT.t('fetch_course_fail')];

           dispatch({
             type: FETCH_TUTOR_COURSES_FAIL,
             payload: {errors: error_messages}
           })
         })
    }
};