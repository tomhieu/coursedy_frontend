import * as types from '../constants/CourseFormComponent';
import {ADD_MORE_LESSON, EDIT_DETAIL_LESSON, HIDE_LESSON_POPUP_EDIT} from "actions/CourseFormActionCreator";
import {SAVE_LESSON_DETAIL} from "../actions/CourseFormActionCreator";

const CourseFormComponent = (state = {
  errors: null, courseCreationForm: {
      lessonList: [],
      lessonCount: 0,
      activeLesson: null
    }
}, action) => {
  switch (action.type) {
    case types.CREATE_SUCCESSFULLY:
    case types.CREATE_COURSE_FAILED:
      return state;
    case ADD_MORE_LESSON:
      let nextLessonList = state.courseCreationForm.lessonList.slice();
      const nextPos = state.courseCreationForm.lessonCount + 1;
      nextLessonList.push({posId: nextPos, lessonName: '', lessonPeriod: '', showPopupEdit: false});
      return Object.assign({}, state, {
        courseCreationForm: {lessonList: nextLessonList, lessonCount: nextPos}
      });
    case EDIT_DETAIL_LESSON:
      let activeLesson = null;
      let editLessonList = state.courseCreationForm.lessonList.slice();
      editLessonList.map(lesson => {
          if (lesson.posId === action.data) {
              lesson.showPopupEdit = true;
              activeLesson = lesson;
          }
      })
      return Object.assign({}, state, {
        courseCreationForm: Object.assign({}, state.courseCreationForm, {lessonList: editLessonList, activeLesson: activeLesson})
      });
    case SAVE_LESSON_DETAIL:
      let updatedLessonList = state['courseCreationForm']['lessonList'].slice();
        updatedLessonList.map((lesson) =>
          {
              if (lesson.posId === action.data.posId) {
                  lesson.lessonName = action.data.lessonName;
                  lesson.lessonPeriod = action.data.lessonPeriod;
                  lesson.lessonDesciption = action.data.lessonDesciption;
                  lesson.showPopupEdit = false;
              }
          }
      );
      return Object.assign({}, state, {
          courseCreationForm:  Object.assign({}, state.courseCreationForm, {activeLesson: null, lessonList: updatedLessonList})
      });
    case HIDE_LESSON_POPUP_EDIT:
      let lessonList = state.courseCreationForm.lessonList.slice();
      lessonList.map(lesson => {
          if (lesson.posId === action.data) {
              lesson.showPopupEdit = false;
          }
      });
      return Object.assign({}, state, {
        courseCreationForm: Object.assign({}, state.courseCreationForm, {activeLesson: null, lessonList: lessonList})
      });
    default:
      return state;
  }
};

export default CourseFormComponent;
