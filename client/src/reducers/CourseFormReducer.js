import * as types from '../constants/CourseFormComponent';
import {
    ADD_DOCUMENT_FOR_LESSON,
    ADD_MODIFY_COURSE_LESSON,
    ADD_MORE_LESSON, DELETE_LESSON, EDIT_DETAIL_LESSON,
    HIDE_LESSON_POPUP_EDIT
} from "actions/CourseFormActionCreator";
import {DELETE_DOCUMENT_FOR_LESSON, SAVE_LESSON_DETAIL} from "../actions/CourseFormActionCreator";

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
      const nextState = Object.assign({}, state, {courseData: Object.assign({}, action.data.courseData.values, {cover_image: action.data.courseData.cover_image}),
          lessonCreationForm: Object.assign({}, state.lessonCreationForm, {lessonList: action.data.lessonList})});
      debugger
      return nextState;
    case ADD_MORE_LESSON:
      let nextLessonList = state.lessonCreationForm.lessonList.slice();
      debugger
      const nextPos = state.lessonCreationForm.lessonCount + 1;
      nextLessonList.push({posId: nextPos, lessonName: '', lessonPeriod: '', documents: [], showPopupEdit: false});
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
      debugger
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
              lesson.documents.push(action.data.document)
          }
      });
      return Object.assign({}, state, {
          lessonCreationForm:  Object.assign({}, state.lessonCreationForm, {lessonList: copyLessonList})
      });
    case DELETE_DOCUMENT_FOR_LESSON:
      let deletedLessonList = JSON.parse(JSON.stringify(state.lessonCreationForm.lessonList));
      let deletedLesson = deletedLessonList.filter(lesson => lesson.posId === action.data.lessonId);
      if (Array.isArray(deletedLesson)) {
          deletedLesson[0].documents.splice(deletedLesson[0].documents.findIndex((e, i) => {
              return e.uid === action.data.documentId;
          }), 1);
          return Object.assign({}, state, {
              lessonCreationForm:  Object.assign({}, state.lessonCreationForm, {lessonList: deletedLessonList})
          });
      }
    default:
      return state;
  }
};

export default CourseFormComponent;
