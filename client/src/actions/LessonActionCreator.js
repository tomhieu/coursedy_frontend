import {ADD_MORE_LESSON_FOR_SECTION, HIDE_LESSON_POPUP_EDIT} from "actions/AsyncActionCreator";

export const addLesson = (sectionId) => {
    return {
        type: ADD_MORE_LESSON_FOR_SECTION,
        data: sectionId
    };
};

export const hideLessonDetailPopup = (sectionId) => {
    return {
        type: HIDE_LESSON_POPUP_EDIT,
        data: sectionId
    };
};