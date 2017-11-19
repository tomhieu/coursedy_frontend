import * as types from '../../constants/Courses';

const PublicCourseDetail = (state = {
    course: {},
    course_sections: [],
    course_comments: [],
    course_tutor: null
  }, action) => {
  switch (action.type) {
    case types.FETCH_PUBLIC_COURSE_SUCCESSFULLY:
      return {...state, course: action.payload }
    case types.FETCH_PUBLIC_COURSE_FAIL:
      return {...state, course: null}
    case types.FETCH_PUBLIC_COURSE_SECTIONS_SUCCESSFULLY:
      return {...state, course_sections: action.payload }
    case types.FETCH_PUBLIC_COURSE_SECTIONS_FAIL:
      return {...state, course_sections: []}
    case types.FETCH_PUBLIC_COURSE_TUTOR_SUCCESSFULLY:
      return {...state, course_tutor: action.payload}
    case types.FETCH_PUBLIC_COURSE_TUTOR_FAIL:
      return {...state, course_tutor: null}
    default:
      return state;
  }
};

export default PublicCourseDetail;
