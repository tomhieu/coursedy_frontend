import * as types from '../constants/CourseFormComponent';
import Network from '../utils/network'
import {TT} from '../utils/locale'

export const ADD_MORE_LESSON = 'ADD_MORE_LESSON';
export const DELETE_LESSON = 'DELETE_LESSON';
export const EDIT_DETAIL_LESSON = 'EDIT_DETAIL_LESSON';
export const SAVE_LESSON_DETAIL = 'SAVE_LESSON_DETAIL';
export const HIDE_LESSON_POPUP_EDIT = 'HIDE_LESSON_POPUP_EDIT';

export const createCourse = (title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image) => {
  return dispatch => {
    let body = {title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image};

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

export const addLesson = () => {
  return {
    type: ADD_MORE_LESSON
  };
};

export const deleteLesson = (lessonId) => {
  return {
    type: DELETE_LESSON,
    data: lessonId
  }
}

export const editLessonDetail = (lessonId) => {
  return {
    type: EDIT_DETAIL_LESSON,
    data: lessonId
  };
};

export const saveLessonDetail = (lesson) => {
  return {
    type: SAVE_LESSON_DETAIL,
    data: lesson
  };
};

export const hideLessonDetailPopup = (lessonId) => {
    return {
        type: HIDE_LESSON_POPUP_EDIT,
        data: lessonId
    };
};