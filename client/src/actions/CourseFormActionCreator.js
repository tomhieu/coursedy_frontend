import * as types from '../constants/CourseFormComponent';
import Network from '../utils/network'
import {TT} from '../utils/locale'


export const FETCH_DETAIL_COURSE_SUCESSFULLY = 'FETCH_DETAIL_COURSE_SUCESSFULLY';
export const TRIGGER_ACTIVATE_FIELD = 'TRIGGER_ACTIVATE_FIELD';
export const CLOSED_ACTIVATED_FIELD = 'CLOSED_ACTIVATED_FIELD';
/**
 * Define actions to create, edit or delete Section
 */
export const FETCH_LIST_SECTION_SUCESSFULLY = 'FETCH_LIST_SECTION_SUCESSFULLY';
export const ADD_NEW_SECTION = 'ADD_NEW_SECTION';
export const CLOSE_POPUP_ADD_SECTION = 'CLOSE_POPUP_ADD_SECTION';
export const DELETE_SECTION_SUCESSFULLY = 'DELETE_SECTION_SUCESSFULLY';
export const CREATE_UPDATE_SECTION_SUCESSFULLY = 'CREATE_UPDATE_SECTION_SUCESSFULLY';

export const createCourse = (title, description, category_id, course_level_id, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image) => {
  return dispatch => {
    let body = {title, description, category_id, course_level_id, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency};
    body['cover_image'] = cover_image.content;
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

export const loadCourseDetail = (courseId) => {
    return dispatch => {
        Network().get(/courses/ + courseId).then((response) => {
            dispatch(loadListSection(response.id));
            dispatch({
                type: FETCH_DETAIL_COURSE_SUCESSFULLY,
                payload: response
            });
        })
    };
};

export const activatedEditField = (fieldId) => {
    return {
        type: TRIGGER_ACTIVATE_FIELD,
        data: fieldId
    }
}

export const closedEditField = (fieldId) => {
    return {
        type: CLOSED_ACTIVATED_FIELD,
        data: fieldId
    }
}

export const loadListSection = (courseId) => {
    return dispatch => {
        Network().get('/course_sections?course_id=' + courseId).then((response) => {
            dispatch({
                type: FETCH_LIST_SECTION_SUCESSFULLY,
                payload: response
            })
        })
    }
}

/**
 * Defined all action methods to handle Section
 */
export const addNewSection = () => {
    return {
        type: ADD_NEW_SECTION
    }
}

export const closePopupSection = () => {
    return {
        type: CLOSE_POPUP_ADD_SECTION
    }
}

export const saveOrUpdateSection = (id, title) => {
    return dispatch => {
        let body = {course_id: id, title};
        Network().post('course_sections', body).then((response) => {
            dispatch({
                type: CREATE_UPDATE_SECTION_SUCESSFULLY,
                payload: response
            });
        })
    }
}

export const deleteSection = (id) => {
    return dispatch => {
        Network().delete('course_sections', id).then((response) => {
            dispatch({
                type: DELETE_SECTION_SUCESSFULLY,
                payload: id
            });
        })
    }
}