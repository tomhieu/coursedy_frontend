import * as asycAction from '../../actions/AsyncActionCreator';

const LessonEvaluation = (state = {
  lesson: null,
  activeCourse: null,
  isEvaluating: false,
}, action) => {
  switch (action.type) {
    case asycAction.REJECT_COURSE_NEED_TO_EVALUATE:
      return { ...state, lesson: null, activeCourse: null };
    case asycAction.UPDATE_COURSE_NEED_TO_EVALUATE:
      const { activeLesson, activeCourse } = action.payload;
      return { ...state, lesson: activeLesson, activeCourse };
    case asycAction.EVALUATE_AND_TERMINATE_LESSON + asycAction.PENDING:
      return { ...state, isEvaluating: true };
    case asycAction.EVALUATE_AND_TERMINATE_LESSON + asycAction.FULFILLED:
      return {
        ...state, lesson: null, activeCourse: null, isEvaluating: false
      };
    default:
      return state;
  }
};

export default LessonEvaluation;
