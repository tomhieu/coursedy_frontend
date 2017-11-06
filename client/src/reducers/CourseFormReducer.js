import * as types from '../constants/CourseFormComponent';
import {
    ADD_DOCUMENT_FOR_LESSON,
    ADD_MODIFY_COURSE_LESSON,
    ADD_MORE_LESSON, DELETE_LESSON, EDIT_DETAIL_LESSON,
    HIDE_LESSON_POPUP_EDIT
} from "actions/CourseFormActionCreator";
import {SAVE_LESSON_DETAIL} from "../actions/CourseFormActionCreator";

const CourseFormComponent = (state = {
  errors: null, courseData: {cover_image: null}, lessonCreationForm: {
      lessonList: [],
      lessonCount: 0,
      activeLesson: null
    }
}, action) => {
  switch (action.type) {
    case types.CREATE_SUCCESSFULLY:
    case types.CREATE_COURSE_FAILED:
      return state;
    case ADD_MODIFY_COURSE_LESSON:
      return Object.assign({}, state, {courseData: Object.assign({}, action.data.courseData.values, {cover_image: action.data.courseData.cover_image.previewUrl}),
          lessonCreationForm: Object.assign({}, state.lessonCreationForm, {lessonList: action.data.lessonList})});
    case ADD_MORE_LESSON:
      let nextLessonList = state.lessonCreationForm.lessonList.slice();
      debugger
      const nextPos = state.lessonCreationForm.lessonCount + 1;
      nextLessonList.push({posId: nextPos, lessonName: '', lessonPeriod: '', showPopupEdit: false});
      return Object.assign({}, state, {
        lessonCreationForm: {lessonList: nextLessonList, lessonCount: nextPos}
      });
    case EDIT_DETAIL_LESSON:
      let activeLesson = null;
      let editLessonList = state.lessonCreationForm.lessonList.slice();
      editLessonList.map(lesson => {
          if (lesson.posId === action.data) {
              lesson.showPopupEdit = true;
              activeLesson = lesson;
          }
      })
      return Object.assign({}, state, {
        lessonCreationForm: Object.assign({}, state.lessonCreationForm, {lessonList: editLessonList, activeLesson: activeLesson})
      });
    case SAVE_LESSON_DETAIL:
      let updatedLessonList = JSON.parse(JSON.stringify(state.lessonCreationForm.lessonList));
        updatedLessonList.map((lesson) =>
          {
              if (lesson.posId === action.data.posId) {
                  lesson.lessonName = action.data.lessonName != undefined ? action.data.lessonName : lesson.lessonName;
                  lesson.lessonPeriod = action.data.lessonPeriod != undefined ? action.data.lessonPeriod : lesson.lessonPeriod;
                  lesson.lessonDesciption = action.data.lessonDesciption != undefined ? action.data.lessonDesciption : lesson.lessonDesciption;
                  lesson.showPopupEdit = false;
              }
          }
      );

      return Object.assign({}, state, {
          lessonCreationForm:  Object.assign({}, state.lessonCreationForm, {activeLesson: null, lessonList: updatedLessonList})
      });
    case HIDE_LESSON_POPUP_EDIT:
      let lessonList = state.lessonCreationForm.lessonList.slice();
      lessonList.map(lesson => {
          if (lesson.posId === action.data) {
              lesson.showPopupEdit = false;
          }
      });
      return Object.assign({}, state, {
        lessonCreationForm: Object.assign({}, state.lessonCreationForm, {activeLesson: null, lessonList: lessonList})
      });
    case DELETE_LESSON:
      let currentLessonList = state.lessonCreationForm.lessonList.slice();
      const removedItemIndex = currentLessonList.findIndex((e, i) => {
          return e.posId === action.data;
      });
      currentLessonList.splice(removedItemIndex, 1);
      if (removedItemIndex >= 0) {
          return Object.assign({}, state, {
              lessonCreationForm: Object.assign({}, state.lessonCreationForm, {lessonList: currentLessonList})
          });
      }
    case ADD_DOCUMENT_FOR_LESSON:
      let copyLessonList = JSON.parse(JSON.stringify(state.lessonCreationForm.lessonList));
      copyLessonList.map(lesson => {
          if (lesson.posId === action.data.lessonId) {
              lesson.documents = Array.isArray(lesson.documents) ? lesson.documents.push(action.data.document) : [action.data.document];
          }
      });
      return Object.assign({}, state, {
          lessonCreationForm:  Object.assign({}, state.lessonCreationForm, {lessonList: copyLessonList})
      })
    default:
      return state;
  }
};

export default CourseFormComponent;
