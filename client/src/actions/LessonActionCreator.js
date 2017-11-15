import Network from '../utils/network'

export const ADD_MORE_LESSON_FOR_SECTION = 'ADD_MORE_LESSON_FOR_SECTION';
export const DELETE_LESSON_SUCESSFULLY = 'DELETE_LESSON_SUCESSFULLY';
export const SAVE_LESSON_DETAIL = 'SAVE_LESSON_DETAIL';
export const HIDE_LESSON_POPUP_EDIT = 'HIDE_LESSON_POPUP_EDIT';
export const SAVE_LESSON_SUCESSFULLY = 'SAVE_LESSON_SUCESSFULLY';
export const ADD_DOCUMENT_FOR_LESSON = 'ADD_DOCUMENT_FOR_LESSON';
export const DELETE_DOCUMENT_FOR_LESSON = 'DELETE_DOCUMENT_FOR_LESSON';

export const addLesson = (sectionId) => {
    return {
        type: ADD_MORE_LESSON_FOR_SECTION,
        data: sectionId
    };
};

export const deleteLesson = (lessonId) => {
    return {
        type: DELETE_LESSON_SUCESSFULLY,
        data: lessonId
    }
};

export const saveOrUpdateLesson = (lesson) => {
    return dispatch => {
        Network().post('lessons', lesson).then((response) => {
            dispatch({
                type: SAVE_LESSON_SUCESSFULLY,
                payload: response
            });
        }, (errors) => {
            debugger
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

export const hideLessonDetailPopup = (lessonId) => {
    return {
        type: HIDE_LESSON_POPUP_EDIT,
        data: lessonId
    };
};