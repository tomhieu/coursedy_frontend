import * as types from '../constants/CourseFormComponent';
import {ADD_MORE_LESSON, EDIT_DETAIL_LESSON, HIDE_LESSON_POPUP_EDIT} from "actions/CourseFormActionCreator";
import {SAVE_LESSON_DETAIL} from "../actions/CourseFormActionCreator";

const CourseFormComponent = (state = {
  errors: null, courseCreationForm: {
      lessonList: [],
      lessonCount: 0,
      showPopupEdit: false,
      activeLesson: null
    }
}, action) => {
  switch (action.type) {
    case types.CREATE_SUCCESSFULLY:
    case types.CREATE_COURSE_FAILED:
      return state;
    case ADD_MORE_LESSON:
      let nextLessonList = state.courseCreationForm.lessonList.slice();
      const nextPos = state.courseCreationForm.lessonCount++;
      nextLessonList.push({posId: nextPos, lessonName: '', lessonPeriod: ''});
      return Object.assign({}, state, {
        courseCreationForm: {lessonList: nextLessonList, lessonCount: nextPos}
      });
    case EDIT_DETAIL_LESSON:
      return Object.assign({}, state, {
        courseCreationForm: Object.assign({}, state.courseCreationForm, {showPopupEdit: true, activeLesson: action.data})
      });
    case SAVE_LESSON_DETAIL:
      let updatedLessonList = state['courseCreationForm']['lessonList'].slice();
        updatedLessonList.map((lesson) =>
          {
              if (lesson.posId === action.data.posId) {
                  lesson.lessonName = action.data.lessonName;
                  lesson.lessonPeriod = action.data.lessonPeriod;
                  lesson.lessonDesciption = action.data.lessonDesciption;
              }
          }
      );
      return Object.assign({}, state, {
          courseCreationForm:  Object.assign({}, state.courseCreationForm, {showPopupEdit: false, activeLesson: null, lessonList: updatedLessonList})
      });
    case HIDE_LESSON_POPUP_EDIT:
      return Object.assign({}, state, {
        courseCreationForm: Object.assign({}, state.courseCreationForm, {showPopupEdit: false, activeLesson: null})
      });
    default:
      return state;
  }
};

export default CourseFormComponent;
