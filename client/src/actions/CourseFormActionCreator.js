import * as types from '../constants/CourseFormComponent';
import Network from '../utils/network'
import {TT} from '../utils/locale'


export const FETCH_DETAIL_COURSE_SUCESSFULLY = 'FETCH_DETAIL_COURSE_SUCESSFULLY';
/**
 * Define actions to create, edit or delete Section
 */
export const ADD_NEW_SECTION = 'ADD_NEW_SECTION';
export const DELETE_SECTION_SUCESSFULLY = 'DELETE_SECTION_SUCESSFULLY';
export const CREATE_UPDATE_SECTION_SUCESSFULLY = 'CREATE_UPDATE_SECTION_SUCESSFULLY';

export const createCourse = (title, description, category_id, course_level_id, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image) => {
  return dispatch => {
    let body = {title, description, category_id, course_level_id, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image}
    Network().post('courses', body).then((response) => {
      dispatch({
        type: types.CREATE_SUCCESSFULLY,
        payload: {}
      });
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0)?
        errors :
        [TT.t('email_or_password_incorrect')];

      dispatch({
        type: types.CREATE_COURSE_FAILED,
        payload: {errors: error_messages}
      });
    });
  }
};

export const saveOrUpdateLesson = (lessonName, lessonPeriod, lessonDesciption, documents = []) => {
    return dispatch => {
        let body = {lessonName, lessonPeriod, lessonDesciption, documents};
        Network().post('lessons', body).then((response) => {
            dispatch({
                type: SAVE_LESSON_SUCESSFULLY,
                payload: body
            });
        })
    }
}

export const loadCourseDetail = (courseId) => {
    return dispatch => {
        Network().get(/courses/ + courseId).then((response) => {
            dispatch({
                type: FETCH_DETAIL_COURSE_SUCESSFULLY,
                payload: response
            })
        })
    };
};

/**
 * Defined all action methods to handle Section
 */
export const addNewSection = () => {
    return {
        type: ADD_NEW_SECTION
    }
}

export const saveOrUpdateSection = (id, title, name) => {
    return dispatch => {
        let body = {id, title, name};
        Network().post('courses/section', body).then((response) => {
            dispatch({
                type: CREATE_UPDATE_SECTION_SUCESSFULLY,
                payload: response
            });
        })
    }
}

export const deleteSection = (id) => {
    return dispatch => {
        Network().delete('courses/section', id).then((response) => {
            dispatch({
                type: DELETE_SECTION_SUCESSFULLY,
                payload: id
            });
        })
    }
}