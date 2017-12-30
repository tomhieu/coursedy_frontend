import * as types from "../constants/CourseFormComponent";
import {
  ADD_DOCUMENT_FOR_LESSON,
  ADD_MODIFY_COURSE_LESSON,
  ADD_MORE_LESSON,
  CANCEL_PUBLISH_COURSE,
  CREATE_NEW_COURSE,
  DELETE_LESSON,
  EDIT_DETAIL_LESSON,
  HIDE_LESSON_POPUP_EDIT,
  VALIDATE_BEFORE_PUBLISH_COURSE
} from "actions/CourseFormActionCreator";
import {
  ADD_NEW_SECTION,
  CLOSE_POPUP_ADD_SECTION,
  CLOSED_ACTIVATED_FIELD,
  CREATE_UPDATE_SECTION_SUCESSFULLY,
  DELETE_DOCUMENT_FOR_LESSON,
  DELETE_SECTION_SUCESSFULLY,
  FETCH_DETAIL_COURSE_SUCESSFULLY,
  FETCH_LIST_SECTION_SUCESSFULLY,
  SAVE_LESSON_SUCESSFULLY,
  TRIGGER_ACTIVATE_FIELD
} from "../actions/CourseFormActionCreator";
import * as lessonActions from "../actions/LessonActionCreator";
import DateUtils from "utils/DateUtils";

const CourseFormComponent = (state = {
  courseData: {cover_image: null},
  editMode: false,
  listSection: [],
  showSectionPopup: false,
  activatedField: null,
  createCourseSucess: false,
  publishCourse: false
}, action) => {
  let currentSectionList = JSON.parse(JSON.stringify(state.listSection));
  switch (action.type) {
    case types.CREATE_SUCCESSFULLY:
    case types.UPDATE_SUCCESSFULLY:
      const {id, title} = action.payload;
      return Object.assign({}, state, {
        courseData: {cover_image: null, title: title, id: id}, editMode: false,
        listSection: [], showSectionPopup: false, activatedField: null, createCourseSucess: true
      });
    case types.UPDATE_COURSE_FAILED:
    case types.CREATE_COURSE_FAILED:
      return state;
    case VALIDATE_BEFORE_PUBLISH_COURSE:
      return Object.assign({}, state, {publishCourse: true});
    case CANCEL_PUBLISH_COURSE:
      return Object.assign({}, state, {publishCourse: false});
    case TRIGGER_ACTIVATE_FIELD:
      return Object.assign({}, state, {activatedField: action.data});
    case CLOSED_ACTIVATED_FIELD:
      return Object.assign({}, state, {activatedField: null});
    case FETCH_DETAIL_COURSE_SUCESSFULLY:
      const {category, course_level, start_date, end_date} = action.payload;
      const fr_start_date = DateUtils.formatDate(start_date);
      const fr_end_date = DateUtils.formatDate(end_date);
      const courseData = Object.assign({}, action.payload, {
        category_id: category.id, course_level_id: course_level.id,
        start_date: fr_start_date, end_date: fr_end_date
      });
      return Object.assign({}, state, {courseData: courseData, editMode: true});
    case CREATE_NEW_COURSE:
      return Object.assign({}, state, {
        courseData: {cover_image: null}, editMode: false,
        listSection: [], showSectionPopup: false, activatedField: null, createCourseSucess: false
      });
    case FETCH_LIST_SECTION_SUCESSFULLY:
      return Object.assign({}, state, {listSection: action.payload});
    case ADD_NEW_SECTION:
      return Object.assign({}, state, {showSectionPopup: true});
    case CLOSE_POPUP_ADD_SECTION:
      return Object.assign({}, state, {showSectionPopup: false});
    case DELETE_SECTION_SUCESSFULLY:
      let deletedSectionList = currentSectionList.filter((section) => section.id != action.data.id);
      return Object.assign({}, state, {listSection: deletedSectionList});
    case CREATE_UPDATE_SECTION_SUCESSFULLY:
      currentSectionList.push(action.payload);
      return Object.assign({}, state, {listSection: currentSectionList, showSectionPopup: false});
    // handle for lesson
    case lessonActions.ADD_MORE_LESSON_FOR_SECTION:
      let [modifiedSection] = currentSectionList.filter(section => section.id === action.data);
      modifiedSection['showLessonPopup'] = true;
      return Object.assign({}, state, {listSection: currentSectionList});
    case lessonActions.SAVE_LESSON_SUCESSFULLY:
      const {course_section_id} = action.payload;
      let [updatedSection] = currentSectionList.filter(section => section.id === course_section_id);
      updatedSection.showLessonPopup = false;
      updatedSection.lessons.push(action.payload);
      return Object.assign({}, state, {listSection: currentSectionList, showSectionPopup: false});
    case lessonActions.HIDE_LESSON_POPUP_EDIT:
      let [activeSection] = currentSectionList.filter(section => section.id === action.data);
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
