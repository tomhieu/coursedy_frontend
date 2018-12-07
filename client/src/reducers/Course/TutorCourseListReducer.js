import { TT } from 'utils/locale';
import * as asyncActs from '../../actions/AsyncActionCreator';

const TutorCourseList = (state = {
  isFetching: true,
  courses: [],
  errors: []
}, action) => {
  switch (action.type) {
    case asyncActs.FETCH_TUTOR_COURSES + asyncActs.PENDING:
      return { ...state, isFetching: true, courses: [] };
    case asyncActs.FETCH_TUTOR_COURSES + asyncActs.FULFILLED:
      const newCourses = action.payload.map(course => Object.assign({}, course, { onlyTutor: true }));
      return { ...state, courses: newCourses, isFetching: false };
    case asyncActs.FETCH_TUTOR_COURSES + asyncActs.REJECTED:
      const error_messages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0)
        ? errors : [TT.t('fetch_course_fail')];
      return { ...state, courses: [], errors: error_messages };
    case asyncActs.PUBLISH_COURSE + asyncActs.FULFILLED: {
      const courses = state.courses.map((course) => {
        if (course.id === action.payload.id) {
          return { ...course, ...action.payload };
        }
        return { ...course };
      });
      return {
        ...state, courses
      };
    }
    default:
      return state;
  }
};

export default TutorCourseList;
