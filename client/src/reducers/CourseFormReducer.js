import * as asyncActions from "../actions/AsyncActionCreator";
import DateUtils from "utils/DateUtils";
import {FULFILLED} from "actions/AsyncActionCreator";

const courseDetails = (state = {
  isFetching: true,
  courseData: {cover_image: null},
  editMode: false,
  listSection: [],
  showSectionPopup: false,
  activatedField: [],
  createCourseSucess: false,
  publishCourse: false,
  editTeachingDay: false,
  editCourseCategory: false
}, action) => {
  let currentSectionList = JSON.parse(JSON.stringify(state.listSection));
  switch (action.type) {
    case asyncActions.CLOSE_COURSE_POPUP:
      return Object.assign({}, state, {createCourseSucess: false});
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
      return Object.assign({}, state, {activatedField: []});
    /**
     * handle actions to load the details of course
     */
    case asyncActions.FETCH_DETAIL_COURSE + asyncActions.PENDING:
      return Object.assign({}, state, {editMode: true, isFetching: true});
    /**
     * handle actions update an existing course
     */
    case asyncActions.UPDATE_COURSE + asyncActions.FULFILLED:
    case asyncActions.FETCH_DETAIL_COURSE + FULFILLED:
      const {category, course_level, start_date, end_date, week_day_schedules} = action.payload;
      const fr_start_date = DateUtils.formatDate(start_date);
      const fr_end_date = DateUtils.formatDate(end_date);
      const courseData = Object.assign({}, action.payload, {
        category: null, course_specialize: category, course_days: week_day_schedules,
        start_date: fr_start_date, end_date: fr_end_date,
        is_same_period: isSamePeriod(week_day_schedules)
      });
      return Object.assign({}, state, {
        courseData: courseData,
        editMode: true,
        isFetching: false,
        activatedField: [],
        createCourseSucess: false,
        editTeachingDay: false,
        editCourseCategory: false,
      });
    /**
     * handle creation course actions
     */
    case asyncActions.CREATE_NEW_COURSE:
      return Object.assign({}, state, {
        courseData: {cover_image: null}, editMode: false, isFetching: false,
        listSection: [], showSectionPopup: false, activatedField: null, createCourseSucess: false
      });
    case asyncActions.CREATE_NEW_COURSE + asyncActions.FULFILLED:
      return Object.assign({}, state, {
        courseData: {cover_image: null}, editMode: false, isFetching: false,
        listSection: [], showSectionPopup: false, activatedField: null, createCourseSucess: true
      });
    /**
     * activate to edit teaching day
     */
    case asyncActions.EDIT_TEACHING_DAY: {
      const currentEditTeachingDay = state.editTeachingDay;
      if (currentEditTeachingDay) {
        return Object.assign({}, state, {editTeachingDay: false, activatedField: []});
      } else {
        return Object.assign({}, state, {editTeachingDay: true, activatedField: ['selectedDay']});

      }
    }

    case asyncActions.EDIT_COURSE_CATEGORY: {
      const currentEditCourseCategory = state.editCourseCategory;
      if (currentEditCourseCategory) {
        return Object.assign({}, state, {editCourseCategory: false});
      } else {
        return Object.assign({}, state, {editCourseCategory: true});

      }
    }
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
      let deletedSectionList = currentSectionList.filter((section) => section.id != action.payload.id);
      return Object.assign({}, state, {listSection: deletedSectionList});
    case asyncActions.CREATE_UPDATE_SECTION + asyncActions.FULFILLED:
      const updatedSectionIndex = currentSectionList.findIndex((section) => section.id === action.payload.id);
      if (updatedSectionIndex >= 0) {
        currentSectionList.splice(updatedSectionIndex, 1, action.payload);
      } else {
        currentSectionList.push(action.payload);
      }
      return Object.assign({}, state, {listSection: currentSectionList, showSectionPopup: false, activatedField: []});
    /**
     * handle ansync actions of Lesson
     */
    case asyncActions.ADD_MORE_LESSON_FOR_SECTION:
      let [modifiedSection] = currentSectionList.filter(section => section.id === action.data);
      modifiedSection['showLessonPopup'] = true;
      return Object.assign({}, state, {listSection: currentSectionList});
    case asyncActions.SAVE_LESSON + asyncActions.PENDING:
      currentSectionList.forEach((section) => {
        if (section.showLessonPopup) {
          section.showLessonPopup = false;
        }
      });
      return Object.assign({}, state, {listSection: currentSectionList, showSectionPopup: false});
    case asyncActions.SAVE_LESSON + asyncActions.FULFILLED:
      const {id, course_section_id} = action.payload;
      let [updatedSection] = currentSectionList.filter(section => section.id === course_section_id);
      updatedSection.showLessonPopup = false;
      const updateLessonIndex = updatedSection.lessons.findIndex((lesson) => lesson.id === id);
      if (updateLessonIndex >= 0) {
        updatedSection.lessons.splice(updateLessonIndex, 1, action.payload);
      } else {
        updatedSection.lessons.push(action.payload);
      }
      return Object.assign({}, state, {listSection: currentSectionList, showSectionPopup: false, activatedField: []});
    case asyncActions.HIDE_LESSON_POPUP_EDIT:
      let [activeSection] = currentSectionList.filter(section => section.id === action.data);
      activeSection.showLessonPopup = false;
      return Object.assign({}, state, {listSection: currentSectionList});
    case asyncActions.DELETE_LESSON + asyncActions.FULFILLED:
      let [impactedSection] = currentSectionList.filter(section => {
        return section.lessons.filter((lesson) => lesson.id === action.payload.id).length > 0
      });
      impactedSection = Object.assign({}, impactedSection, {lessons: impactedSection.lessons.filter(lesson => lesson.id != action.payload.id)});
      const impactSectionIndex = currentSectionList.findIndex((section) => section.id === impactedSection.id);
      currentSectionList.splice(impactSectionIndex, 1, impactedSection);
      return Object.assign({}, state, {listSection: currentSectionList});
    case asyncActions.ADD_DOCUMENT_FOR_LESSON:
    case asyncActions.DELETE_DOCUMENT_FOR_LESSON:
      let [modifySection] = currentSectionList.filter(session => session.id === action.data.sectionId);
      let [modifyLesson] = modifySection.lessons.filter(lesson => lesson.id === action.data.lessonId);
      if (action.type.indexOf(asyncActions.ADD_DOCUMENT_FOR_LESSON) >= 0) {
        modifyLesson.documents.push(action.data.document);
      } else {
        modifyLesson.documents.splice(modifyLesson.documents.findIndex(doc => doc.id === action.data.documentId), 1);
      }
      return Object.assign({}, state, {listSection: currentSectionList});
    default:
      return state;
  }
};

const isSamePeriod = (lessonPeriods) => {
  if (!Array.isArray(lessonPeriods) || lessonPeriods.length == 0) {
    return false;
  }
  const [firstDay] = lessonPeriods;
  return lessonPeriods.filter((period) => period.start_time != firstDay.start_time || period.end_time != firstDay.end_time).length == 0
}

export default courseDetails;
