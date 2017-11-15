import * as types from "../constants/CourseFormComponent";
import {
    ADD_DOCUMENT_FOR_LESSON,
    ADD_MODIFY_COURSE_LESSON,
    ADD_MORE_LESSON,
    DELETE_LESSON,
    EDIT_DETAIL_LESSON,
    HIDE_LESSON_POPUP_EDIT
} from "actions/CourseFormActionCreator";
import {
    ADD_NEW_SECTION, CLOSE_POPUP_ADD_SECTION, CREATE_UPDATE_SECTION_SUCESSFULLY,
    DELETE_DOCUMENT_FOR_LESSON, DELETE_SECTION_SUCESSFULLY, FETCH_DETAIL_COURSE_SUCESSFULLY,
    FETCH_LIST_SECTION_SUCESSFULLY, SAVE_LESSON_SUCESSFULLY
} from "../actions/CourseFormActionCreator";
import * as lessonActions from "../actions/LessonActionCreator";

const CourseFormComponent = (state = {
    courseData: {cover_image: null}, editMode: false, listSection: [], showSectionPopup: false}, action) => {
    let currentSectionList = JSON.parse(JSON.stringify(state.listSection));
    switch (action.type) {
        case types.CREATE_SUCCESSFULLY:
        case types.CREATE_COURSE_FAILED:
            return state;
        case FETCH_DETAIL_COURSE_SUCESSFULLY:
            return Object.assign({}, state, {courseData: action.payload, editMode: true});
        case FETCH_LIST_SECTION_SUCESSFULLY:
            return Object.assign({}, state, {listSection: action.payload});
        case ADD_NEW_SECTION:
            return Object.assign({}, state, {showSectionPopup: true});
        case CLOSE_POPUP_ADD_SECTION:
            return Object.assign({}, state, {showSectionPopup: false});
        case DELETE_SECTION_SUCESSFULLY:
            let deletedSectionList = currentSectionList.filter((section) => section.id != action.data.id);
            return [...state, {listSection: deletedSectionList}];
        case CREATE_UPDATE_SECTION_SUCESSFULLY:
            let addedSectionList = currentSectionList.push(action.payload);
            return Object.assign({}, state, {listSection: addedSectionList});
        // handle for lesson
        case lessonActions.ADD_MORE_LESSON_FOR_SECTION:
            let [modifiedSection] = currentSectionList.filter(section => section.id === action.data);
            modifiedSection['showLessonPopup'] = true;
            return Object.assign({}, state, {listSection: currentSectionList});
        case lessonActions.SAVE_LESSON_SUCESSFULLY:
            const {section_id} = action.data;
            let [updatedSection] = currentSectionList.filter(section => section.id === section_id);
            updatedSection = Object.assign({}, updatedSection, {showLessonPopup: false, lessons: [...updatedSection.lessons, action.data]});
            return Object.assign({}, state, {listSection: currentSectionList});
        case lessonActions.HIDE_LESSON_POPUP_EDIT:
            let [activeSection] = currentSectionList.filter(section => section.id ===  action.data);
            activeSection.showLessonPopup = false;
            return Object.assign({}, state, {listSection: currentSectionList});
        case lessonActions.DELETE_LESSON_SUCESSFULLY:
            const {sectionId, deletedLessonId} = action.data;
            let [impactedSection] = currentSectionList.filter(lesson => lesson.id === sectionId);
            impactedSection = Object.assign({}, impactedSection, {lessons: impactedSection.lessons.filter(lesson => lesson.id != deletedLessonId)});
            return Object.assign({}, state, {listSection: currentSectionList});
        case lessonActions.ADD_DOCUMENT_FOR_LESSON:
        case lessonActions.DELETE_DOCUMENT_FOR_LESSON:
            const {modifySectionId, modifyLessonId} = action.data;
            let [modifySection] = currentSectionList.filter(session => session.id === modifySectionId);
            let [modifyLesson] = modifySection.lessons.filter(lesson => lesson.id === modifyLessonId);
            if (action.type === lessonActions.ADD_DOCUMENT_FOR_LESSON) {
                modifyLesson.documents.push(action.data.document);
            } else {
                modifyLesson.documents.splice(modifyLesson.documents.findIndex(doc => doc.uid === action.data.document), 1);
            }
            return Object.assign({}, state, {listSection: currentSectionList});
        default:
            return state;
    }
};

export default CourseFormComponent;
