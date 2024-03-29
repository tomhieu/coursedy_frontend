import DateUtils from 'utils/DateUtils';
import { FULFILLED } from 'actions/AsyncActionCreator';
import * as asyncActions from '../actions/AsyncActionCreator';

const courseDetails = (state = {
  isFetching: true,
  courseData: { cover_image: null },
  editMode: false,
  listSection: [],
  showSectionPopup: false,
  activatedField: [],
  createCourseSucess: false,
  publishCourse: false,
  editTeachingDay: false,
  editCourseCategory: false,
  editCourseFee: false
}, action) => {
  const currentSectionList = JSON.parse(JSON.stringify(state.listSection));
  switch (action.type) {
    case asyncActions.CLOSE_COURSE_POPUP:
      return Object.assign({}, state, { createCourseSucess: false });
    /**
     * handle actions publish an existing course
     */
    case asyncActions.VALIDATE_BEFORE_PUBLISH_COURSE:
      return Object.assign({}, state, { publishCourse: true, courseData: action.payload || state.courseData });
    case asyncActions.CANCEL_PUBLISH_COURSE:
      return Object.assign({}, state, { publishCourse: false });
    case asyncActions.PUBLISH_COURSE + FULFILLED: {
      return {
        ...state, courseData: { ...state.courseData, ...action.payload }
      };
    }
    case asyncActions.TRIGGER_ACTIVATE_FIELD:
      return Object.assign({}, state, {
        activatedField: action.data,
        createCourseSucess: false,
        editTeachingDay: false,
        editCourseCategory: false
      });
    case asyncActions.CLOSED_ACTIVATED_FIELD:
      return Object.assign({}, state, { activatedField: [] });
    /**
     * handle actions to load the details of course
     */
    case asyncActions.FETCH_DETAIL_COURSE + asyncActions.PENDING:
      return Object.assign({}, state, { editMode: true, isFetching: true });
    /**
     * handle actions update an existing course
     */
    case asyncActions.UPDATE_COURSE + asyncActions.FULFILLED:
    case asyncActions.FETCH_DETAIL_COURSE + FULFILLED:
      const {
        category, course_level, start_date, end_date, week_day_schedules
      } = action.payload;
      const fr_start_date = DateUtils.formatDate(start_date);
      const fr_end_date = DateUtils.formatDate(end_date);
      const courseData = Object.assign({}, action.payload, {
        category: null,
        course_specialize: category,
        course_days: week_day_schedules,
        start_date: fr_start_date,
        end_date: fr_end_date,
        is_same_period: isSamePeriod(week_day_schedules)
      });
      return Object.assign({}, state, {
        courseData,
        editMode: true,
        isFetching: false,
        activatedField: [],
        createCourseSucess: false,
        editTeachingDay: false,
        editCourseCategory: false,
        editCourseFee: false
      });
    /**
     * handle creation course actions
     */
    case asyncActions.CREATE_NEW_COURSE:
      return Object.assign({}, state, {
        courseData: { cover_image: null },
        editMode: false,
        isFetching: false,
        listSection: [],
        showSectionPopup: false,
        activatedField: [],
        createCourseSucess: false
      });
    case asyncActions.CREATE_NEW_COURSE + asyncActions.FULFILLED:
      return Object.assign({}, state, {
        courseData: action.payload,
        editMode: false,
        isFetching: false,
        listSection: [],
        showSectionPopup: false,
        activatedField: [],
        createCourseSucess: true
      });
    /**
     * activate to edit teaching day
     */
    case asyncActions.EDIT_TEACHING_DAY: {
      const currentEditTeachingDay = state.editTeachingDay;
      if (currentEditTeachingDay) {
        return Object.assign({}, state, {
          editTeachingDay: false,
          editCourseCategory: false,
          editCourseFee: false,
          activatedField: []
        });
      }
      return Object.assign({}, state, {
        editTeachingDay: true,
        editCourseCategory: false,
        editCourseFee: false,
        activatedField: ['start_time', 'end_time',
          'monday_start_time', 'monday_end_time', 'tuesday_start_time', 'tuesday_end_time',
          'wednesday_start_time', 'wednesday_end_time', 'thursday_start_time', 'thursday_end_time',
          'friday_start_time', 'friday_end_time', 'saturday_start_time', 'saturday_end_time', 'sunday_start_time', 'sunday_end_time']
      });
    }

    case asyncActions.EDIT_COURSE_CATEGORY: {
      const currentEditCourseCategory = state.editCourseCategory;
      if (currentEditCourseCategory) {
        return Object.assign({}, state, {
          editCourseCategory: false,
          editTeachingDay: false,
          editCourseFee: false,
          activatedField: []
        });
      }
      return Object.assign({}, state, {
        editCourseCategory: true,
        editTeachingDay: false,
        editCourseFee: false,
        activatedField: ['category_id', 'course_specialize']
      });
    }

    case asyncActions.EDIT_COURSE_FEE: {
      const currentEditCourseCategory = state.editCourseFee;
      if (currentEditCourseCategory) {
        return Object.assign({}, state, {
          editCourseFee: false,
          editCourseCategory: false,
          editTeachingDay: false,
          activatedField: []
        });
      }
      return Object.assign({}, state, {
        editCourseFee: true,
        editCourseCategory: false,
        editTeachingDay: false,
        activatedField: ['tuition_fee', 'currency']
      });
    }
    /**
     * handle ansync actions of Section
     */
    case asyncActions.FETCH_LIST_SECTION + asyncActions.FULFILLED:
      return Object.assign({}, state, { listSection: action.payload });
    case asyncActions.ADD_NEW_SECTION:
      return Object.assign({}, state, { showSectionPopup: true });
    case asyncActions.CLOSE_POPUP_ADD_SECTION:
      return Object.assign({}, state, { showSectionPopup: false });
    case asyncActions.DELETE_SECTION + asyncActions.FULFILLED:
      const deletedSectionList = currentSectionList.filter(section => section.id != action.payload.id);
      return Object.assign({}, state, { listSection: deletedSectionList });
    case asyncActions.CREATE_UPDATE_SECTION + asyncActions.FULFILLED:
      const updatedSectionIndex = currentSectionList.findIndex(section => section.id === action.payload.id);
      if (updatedSectionIndex >= 0) {
        currentSectionList.splice(updatedSectionIndex, 1, action.payload);
      } else {
        currentSectionList.push(action.payload);
      }
      return Object.assign({}, state, { listSection: currentSectionList, showSectionPopup: false, activatedField: [] });
    /**
     * handle ansync actions of Lesson
     */
    case asyncActions.ADD_MORE_LESSON_FOR_SECTION:
      const [modifiedSection] = currentSectionList.filter(section => section.id === action.data);
      modifiedSection.showLessonPopup = true;
      return Object.assign({}, state, { listSection: currentSectionList });
    case asyncActions.SAVE_LESSON + asyncActions.PENDING:
      currentSectionList.forEach((section) => {
        if (section.showLessonPopup) {
          section.showLessonPopup = false;
        }
      });
      return Object.assign({}, state, { listSection: currentSectionList, showSectionPopup: false });
    case asyncActions.SAVE_LESSON + asyncActions.FULFILLED:
      const { id, course_section_id } = action.payload;
      const [updatedSection] = currentSectionList.filter(section => section.id === course_section_id);
      updatedSection.showLessonPopup = false;
      const updateLessonIndex = updatedSection.lessons.findIndex(lesson => lesson.id === id);
      if (updateLessonIndex >= 0) {
        updatedSection.lessons.splice(updateLessonIndex, 1, action.payload);
      } else {
        updatedSection.lessons.push(action.payload);
      }
      return Object.assign({}, state, { listSection: currentSectionList, showSectionPopup: false, activatedField: [] });
    case asyncActions.HIDE_LESSON_POPUP_EDIT:
      const [activeSection] = currentSectionList.filter(section => section.id === action.data);
      activeSection.showLessonPopup = false;
      return Object.assign({}, state, { listSection: currentSectionList });
    case asyncActions.DELETE_LESSON + asyncActions.FULFILLED:
      let [impactedSection] = currentSectionList.filter((section) => {
        return section.lessons.filter(lesson => lesson.id === action.payload.id).length > 0;
      });
      impactedSection = Object.assign({}, impactedSection, { lessons: impactedSection.lessons.filter(lesson => lesson.id != action.payload.id) });
      const impactSectionIndex = currentSectionList.findIndex(section => section.id === impactedSection.id);
      currentSectionList.splice(impactSectionIndex, 1, impactedSection);
      return Object.assign({}, state, { listSection: currentSectionList });
    case asyncActions.ADD_DOCUMENT_FOR_LESSON:
    case asyncActions.DELETE_DOCUMENT_FOR_LESSON:
      const [modifySection] = currentSectionList.filter(session => session.id === action.data.sectionId);
      const [modifyLesson] = modifySection.lessons.filter(lesson => lesson.id === action.data.lessonId);
      if (action.type.indexOf(asyncActions.ADD_DOCUMENT_FOR_LESSON) >= 0) {
        modifyLesson.documents.push(action.data.document);
      } else {
        modifyLesson.documents.splice(modifyLesson.documents.findIndex(doc => doc.id === action.data.documentId), 1);
      }
      return Object.assign({}, state, { listSection: currentSectionList });
    default:
      return state;
  }
};

const isSamePeriod = (lessonPeriods) => {
  if (!Array.isArray(lessonPeriods) || lessonPeriods.length == 0) {
    return false;
  }
  const [firstDay] = lessonPeriods;
  return lessonPeriods.filter(period => period.start_time != firstDay.start_time || period.end_time != firstDay.end_time).length == 0;
};

export default courseDetails;
