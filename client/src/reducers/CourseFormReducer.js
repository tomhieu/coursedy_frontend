import * as asyncActions from "../actions/AsyncActionCreator";
import DateUtils from "utils/DateUtils";
import {FULFILLED} from "actions/AsyncActionCreator";

const courseDetails = (state = {
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
    /**
     * handle actions update an existing course
     */
    case asyncActions.UPDATE_COURSE_SUCCESSFULLY:
      const {id, title} = action.payload;
      return Object.assign({}, state, {
        courseData: {cover_image: null, title: title, id: id}, editMode: false,
        listSection: [], showSectionPopup: false, activatedField: null, createCourseSucess: true
      });
    /**
     * handle actions publish an existing course
     */
    case asyncActions.VALIDATE_BEFORE_PUBLISH_COURSE:
      return Object.assign({}, state, {publishCourse: true});
    case asyncActions.CANCEL_PUBLISH_COURSE:
      return Object.assign({}, state, {publishCourse: false});
    case asyncActions.TRIGGER_ACTIVATE_FIELD:
      return Object.assign({}, state, {activatedField: action.data});
    case asyncActions.CLOSED_ACTIVATED_FIELD:
      return Object.assign({}, state, {activatedField: null});
    /**
     * handle actions to load the details of course
     */
    case asyncActions.FETCH_DETAIL_COURSE + FULFILLED:
      const {category, course_level, start_date, end_date, week_day_schedules} = action.payload;
      const fr_start_date = DateUtils.formatDate(start_date);
      const fr_end_date = DateUtils.formatDate(end_date);
      const courseData = Object.assign({}, action.payload, {
        category_id: category.id, course_days: week_day_schedules,
        start_date: fr_start_date, end_date: fr_end_date
      });
      return Object.assign({}, state, {courseData: courseData, editMode: true});
    /**
     * handle creation course actions
     */
    case asyncActions.CREATE_NEW_COURSE + asyncActions.FULFILLED:
      return Object.assign({}, state, {
        courseData: {cover_image: null}, editMode: false,
        listSection: [], showSectionPopup: false, activatedField: null, createCourseSucess: true
      });
    /**
     * handle ansync actions of Section
     */
    case asyncActions.FETCH_LIST_SECTION + asyncActions.FULFILLED:
      return Object.assign({}, state, {listSection: action.payload});
    case asyncActions.ADD_NEW_SECTION:
      return Object.assign({}, state, {showSectionPopup: true});
    case asyncActions.CLOSE_POPUP_ADD_SECTION:
      return Object.assign({}, state, {showSectionPopup: false});
    case asyncActions.DELETE_SECTION + asyncActions.FULFILLED:
      let deletedSectionList = currentSectionList.filter((section) => section.id != action.data.id);
      return Object.assign({}, state, {listSection: deletedSectionList});
    case asyncActions.CREATE_UPDATE_SECTION + asyncActions.FULFILLED:
      currentSectionList.push(action.payload);
      return Object.assign({}, state, {listSection: currentSectionList, showSectionPopup: false});
    /**
     * handle ansync actions of Lesson
     */
    case asyncActions.ADD_MORE_LESSON_FOR_SECTION:
      let [modifiedSection] = currentSectionList.filter(section => section.id === action.data);
      modifiedSection['showLessonPopup'] = true;
      return Object.assign({}, state, {listSection: currentSectionList});
    case asyncActions.SAVE_LESSON + asyncActions.FULFILLED:
      const {course_section_id} = action.payload;
      let [updatedSection] = currentSectionList.filter(section => section.id === course_section_id);
      updatedSection.showLessonPopup = false;
      updatedSection.lessons.push(action.payload);
      return Object.assign({}, state, {listSection: currentSectionList, showSectionPopup: false});
    case asyncActions.HIDE_LESSON_POPUP_EDIT:
      let [activeSection] = currentSectionList.filter(section => section.id === action.data);
      activeSection.showLessonPopup = false;
      return Object.assign({}, state, {listSection: currentSectionList});
    case asyncActions.DELETE_LESSON + asyncActions.FULFILLED:
      const {sectionId, deletedLessonId} = action.data;
      let [impactedSection] = currentSectionList.filter(lesson => lesson.id === sectionId);
      impactedSection = Object.assign({}, impactedSection, {lessons: impactedSection.lessons.filter(lesson => lesson.id != deletedLessonId)});
      return Object.assign({}, state, {listSection: currentSectionList});
    case asyncActions.ADD_DOCUMENT_FOR_LESSON:
    case asyncActions.DELETE_DOCUMENT_FOR_LESSON:
      const {modifySectionId, modifyLessonId} = action.data;
      let [modifySection] = currentSectionList.filter(session => session.id === modifySectionId);
      let [modifyLesson] = modifySection.lessons.filter(lesson => lesson.id === modifyLessonId);
      if (action.type === asyncActions.ADD_DOCUMENT_FOR_LESSON) {
        modifyLesson.documents.push(action.data.document);
      } else {
        modifyLesson.documents.splice(modifyLesson.documents.findIndex(doc => doc.uid === action.data.document), 1);
      }
      return Object.assign({}, state, {listSection: currentSectionList});
    default:
      return state;
  }
};

export default courseDetails;
