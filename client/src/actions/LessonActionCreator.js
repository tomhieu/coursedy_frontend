import Network from '../utils/network'
import {
  ADD_DOCUMENT_FOR_LESSON, ADD_MORE_LESSON_FOR_SECTION, DELETE_DOCUMENT_FOR_LESSON, DELETE_LESSON,
  HIDE_LESSON_POPUP_EDIT,
  SAVE_LESSON
} from "actions/AsyncActionCreator";

export const addLesson = (sectionId) => {
    return {
        type: ADD_MORE_LESSON_FOR_SECTION,
        data: sectionId
    };
};

export const deleteLesson = (lessonId) => {
    return {
        type: DELETE_LESSON,
        data: lessonId
    }
};

export const saveOrUpdateLesson = (lesson) => {
    return dispatch => {
      dispatch({
        type: SAVE_LESSON,
        payload: Network().post('lessons', lesson)
      })
    }
}

export const addDocumentForLesson = (sectionId, lessonId, document) => {
    return {
        type: ADD_DOCUMENT_FOR_LESSON,
        data: {
            sectionId: sectionId,
            lessonId: lessonId,
            document: document
        }
    }
};

export const deleteDocumentForLesson = (sectionId, lessonId, documentId) => {
    return {
        type: DELETE_DOCUMENT_FOR_LESSON,
        data: {
            sectionId: sectionId,
            lessonId: lessonId,
            documentId: documentId
        }
    }
};

export const hideLessonDetailPopup = (sectionId) => {
    return {
        type: HIDE_LESSON_POPUP_EDIT,
        data: sectionId
    };
};