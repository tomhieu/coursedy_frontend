import * as types from '../constants/CourseFormComponent';
import Network from '../utils/network'
import {TT} from '../utils/locale'

export const ADD_MORE_LESSON = 'ADD_MORE_LESSON';
export const DELETE_LESSON = 'DELETE_LESSON';
export const EDIT_DETAIL_LESSON = 'EDIT_DETAIL_LESSON';
export const SAVE_LESSON_DETAIL = 'SAVE_LESSON_DETAIL';
export const HIDE_LESSON_POPUP_EDIT = 'HIDE_LESSON_POPUP_EDIT';
export const SAVE_LESSON_SUCESSFULLY = 'SAVE_LESSON_SUCESSFULLY';
export const ADD_MODIFY_COURSE_LESSON = 'ADD_MODIFY_COURSE_LESSON';
export const ADD_DOCUMENT_FOR_LESSON = 'ADD_DOCUMENT_FOR_LESSON';
export const DELETE_DOCUMENT_FOR_LESSON = 'DELETE_DOCUMENT_FOR_LESSON';
export const FETCH_DETAIL_COURSE_SUCESSFULLY = 'FETCH_DETAIL_COURSE_SUCESSFULLY';

export const createCourse = (title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image, lessonList, category_id = 1, course_level_id = 1) => {
  return dispatch => {
    let body = {title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image, lessonList, category_id, course_level_id};

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

export const addAndModifyLessonCourse = (courseData, lessonList) => {
  return {
    type: ADD_MODIFY_COURSE_LESSON,
    data: {
      courseData: courseData,
      lessonList: lessonList
    }
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
};

export const editLessonDetail = (lessonId) => {
  return {
    type: EDIT_DETAIL_LESSON,
    data: lessonId
  };
};

export const addDocumentForLesson = (lessonId, document) => {
  return {
    type: ADD_DOCUMENT_FOR_LESSON,
    data: {
      lessonId: lessonId,
      document: document
    }
  }
};

export const deleteDocumentForLesson = (lessonId, documentId) => {
    return {
        type: DELETE_DOCUMENT_FOR_LESSON,
        data: {
            lessonId: lessonId,
            documentId: documentId
        }
    }
};

export const hideLessonDetailPopup = (lessonId) => {
    return {
        type: HIDE_LESSON_POPUP_EDIT,
        data: lessonId
    };
};