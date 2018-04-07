import Network from '../utils/network'
import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_FOR_LESSON, ADD_MORE_LESSON_FOR_SECTION, DELETE_DOCUMENT, DELETE_DOCUMENT_FOR_LESSON, DELETE_LESSON,
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
        payload: Network().delete('lessons/' + lessonId)
    }
};

export const saveOrUpdateLesson = (lesson) => {
    return {
      type: SAVE_LESSON,
      payload: lesson.id !== undefined ? Network().update('lessons/' + lesson.id, lesson)
        : Network().post('lessons', lesson)
    }
}

export const addDocumentForLesson = (sectionId, lessonId, document) => {
    return dispatch => {
        dispatch({
          type: ADD_DOCUMENT,
          payload: Network().post('documents', {lesson_id: lessonId, item: document.content, name: document.fileName})
            .then((res) => dispatch({
              type: ADD_DOCUMENT_FOR_LESSON,
              data: {sectionId: sectionId, lessonId: lessonId, document: res}
            }))
        })
    }
};

export const deleteDocumentForLesson = (sectionId, lessonId, documentId) => {
    return dispatch => (
      dispatch({
        type: DELETE_DOCUMENT,
        payload: Network().delete('documents/' + documentId).then((res) => {
          dispatch({
            type: DELETE_DOCUMENT_FOR_LESSON,
            data: {sectionId: sectionId, lessonId: lessonId, documentId: documentId}
          })
        })
      })
    )
};

export const hideLessonDetailPopup = (sectionId) => {
    return {
        type: HIDE_LESSON_POPUP_EDIT,
        data: sectionId
    };
};