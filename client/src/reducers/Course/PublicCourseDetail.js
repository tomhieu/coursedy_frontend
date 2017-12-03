import * as courseTypes from '../../constants/Courses';

const PublicCourseDetail = (state = {
    course: {},
    course_sections: [],
    course_comments: [],
    course_tutor: null,
    show_follow_modal: false,
    submit_follow_success: false,
    submit_follow_fail: false,
  }, action) => {
  switch (action.type) {
    case courseTypes.FETCH_PUBLIC_COURSE_SUCCESSFULLY:
      return {...state, course: action.payload }
    case courseTypes.FETCH_PUBLIC_COURSE_FAIL:
      return {...state, course: null}
    case courseTypes.FETCH_PUBLIC_COURSE_SECTIONS_SUCCESSFULLY:
      return {...state, course_sections: action.payload }
    case courseTypes.FETCH_PUBLIC_COURSE_SECTIONS_FAIL:
      return {...state, course_sections: []}
    case courseTypes.FETCH_PUBLIC_COURSE_TUTOR_SUCCESSFULLY:
      return {...state, course_tutor: action.payload}
    case courseTypes.FETCH_PUBLIC_COURSE_TUTOR_FAIL:
      return {...state, course_tutor: null}
    case courseTypes.PUBLIC_COURSE_SHOW_FOLLOW_MODAL:
      return {...state, show_follow_modal: true}
    case courseTypes.PUBLIC_COURSE_CLOSE_FOLLOW_MODAL:
      return {...state, show_follow_modal: false}
    case courseTypes.PUBLIC_COURSE_SUBMIT_FOLLOW_SUCCESSFULLY:
      return {...state, submit_follow_success: true}
    case courseTypes.PUBLIC_COURSE_SUBMIT_FOLLOW_FAILL:
      return {...state, submit_follow_fail: true}
    default:
      return state;
  }
};

export default PublicCourseDetail;
