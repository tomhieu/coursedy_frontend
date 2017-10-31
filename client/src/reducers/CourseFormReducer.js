import * as types from '../constants/CourseFormComponent';
import {ADD_MORE_LESSON, EDIT_DETAIL_LESSON, HIDE_LESSON_POPUP_EDIT} from "actions/CourseFormActionCreator";

const CourseFormComponent = (state = {
  errors: null, courseCreationForm: {
      lessonList: [],
      lessonCount: 0,
      showPopupEdit: false
    }
}, action) => {
  switch (action.type) {
    case types.CREATE_SUCCESSFULLY:
    case types.CREATE_COURSE_FAILED:
      return state;
    case ADD_MORE_LESSON:
      let nextLessonList = state.courseCreationForm.lessonList.slice();
      const nextPos = state.courseCreationForm.lessonCount++;
      nextLessonList.push({posId: nextPos});
      return Object.assign({}, state, {
        [form.courseCreationForm]: {lessonList: nextLessonList, lessonCount: nextPos}
      });
    case EDIT_DETAIL_LESSON:
      return Object.assign({}, state, {
        [form.courseCreationForm]: {showPopupEdit: true}
      });
    case HIDE_LESSON_POPUP_EDIT:
      return Object.assign({}, state, {
        [form.courseCreationForm]: {showPopupEdit: false}
      });
    default:
      return state;
  }
};

export default CourseFormComponent;
