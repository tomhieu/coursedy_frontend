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
    ADD_NEW_SECTION, CREATE_UPDATE_SECTION_SUCESSFULLY,
    DELETE_DOCUMENT_FOR_LESSON, DELETE_SECTION_SUCESSFULLY, FETCH_DETAIL_COURSE_SUCESSFULLY, SAVE_LESSON_SUCESSFULLY
} from "../actions/CourseFormActionCreator";

const CourseFormComponent = (state = {
    courseData: {cover_image: null}, editMode: false, listSection: [], showSectionPopup: false}, action) => {
    switch (action.type) {
        case types.CREATE_SUCCESSFULLY:
        case types.CREATE_COURSE_FAILED:
            return state;
        case FETCH_DETAIL_COURSE_SUCESSFULLY:
            return Object.assign({}, state, {courseData: action.payload, editMode: true});
        case ADD_NEW_SECTION:
            return [...state, {showSectionPopup: false}];
        case DELETE_SECTION_SUCESSFULLY:
            let deletedSectionList = JSON.parse(JSON.stringify(state.listSection)).filter((section) => section.id != action.data.id);
            return [...state, {listSection: deletedSectionList}];
        case CREATE_UPDATE_SECTION_SUCESSFULLY:
            let addedSectionList = JSON.parse(JSON.stringify(state.listSection)).add(action.payload);
            return [...state, {listSection: addedSectionList}];

        default:
            return state;
    }
};

export default CourseFormComponent;
