import * as types from '../constants/CourseFormComponent';
import Network from '../utils/network'
import {TT} from '../utils/locale'
import {fetchListTutorCourse} from "actions/ListTutorCourseActionCreator";


export const FETCH_DETAIL_COURSE_SUCESSFULLY = 'FETCH_DETAIL_COURSE_SUCESSFULLY';
export const CLEAR_COURSE_DATA = 'CLEAR_COURSE_DATA';
export const PUBLISH_COURSE = 'PUBLISH_COURSE';
export const CANCEL_PUBLISH_COURSE = 'CANCEL_PUBLISH_COURSE';
export const VALIDATE_BEFORE_PUBLISH_COURSE = 'VALIDATE_BEFORE_PUBLISH_COURSE';
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
        let body = {
            title,
            description,
            category_id,
            course_level_id,
            start_date,
            end_date,
            number_of_students,
            period,
            period_type,
            tuition_fee,
            currency,
            cover_image
        };
        Network().post('courses', body).then((response) => {
            dispatch({
                type: types.CREATE_SUCCESSFULLY,
                payload: response
            });
        }, (errors) => {
            dispatch({
                type: types.CREATE_COURSE_FAILED,
                payload: {errors: errors.payload}
            });
        });
    }
};

export const updateCourse = (id, title, description, category_id, course_level_id, start_date, end_date,
                             number_of_students, period, period_type, tuition_fee, currency, cover_image) => {
    return dispatch => {
        let body = {
            id,
            title,
            description,
            category_id,
            course_level_id,
            start_date,
            end_date,
            number_of_students,
            period,
            period_type,
            tuition_fee,
            currency,
            cover_image
        };
        Network().update('courses/' + id, body).then((response) => {
            dispatch({
                type: types.UPDATE_SUCCESSFULLY,
                payload: response
            });
        }, (errors) => {
            dispatch({
                type: types.UPDATE_COURSE_FAILED,
                payload: {errors: errors.payload}
            });
        });
    }
}

export const deleteCourse = (course_id) => {
    return dispatch => {
        Network().delete('courses/' + course_id).then(() => {
            dispatch(fetchListTutorCourse());
        })
    }
}

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

export const clearCourseData = () => {
    return {
        type: CLEAR_COURSE_DATA
    }
}

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

export const publishCourse = (courseId) => {
    return dispatch => {
        Network().post('courses/publish', courseId).then((response) => {
            dispatch({
                type: FETCH_LIST_SECTION_SUCESSFULLY,
                payload: response
            })
        })
    }
}

export const validateBeforePublishCCourse = () => {
    return {
        type: VALIDATE_BEFORE_PUBLISH_COURSE
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