export const ADD_MORE_LESSON = 'ADD_MORE_LESSON';
export const DELETE_LESSON_SUCESSFULLY = 'DELETE_LESSON_SUCESSFULLY';
export const EDIT_DETAIL_LESSON = 'EDIT_DETAIL_LESSON';
export const SAVE_LESSON_DETAIL = 'SAVE_LESSON_DETAIL';
export const HIDE_LESSON_POPUP_EDIT = 'HIDE_LESSON_POPUP_EDIT';
export const SAVE_LESSON_SUCESSFULLY = 'SAVE_LESSON_SUCESSFULLY';W
export const ADD_DOCUMENT_FOR_LESSON = 'ADD_DOCUMENT_FOR_LESSON';
export const DELETE_DOCUMENT_FOR_LESSON = 'DELETE_DOCUMENT_FOR_LESSON';

export const addLesson = () => {
    return {
        type: ADD_MORE_LESSON
    };
};

export const deleteLesson = (lessonId) => {
    return {
        type: DELETE_LESSON_SUCESSFULLY,
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