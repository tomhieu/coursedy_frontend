import * as courseTypes from '../../constants/Courses'
import * as AsyncActions from '../../actions/AsyncActionCreator.js'

const PublicCourseList = (state = {
    followedCourses: [],
    show_follow_modal: false,
    submit_follow_success: false,
    submit_follow_fail: false,
    show_follow_status_modal: false,
  }, action) => {
  switch (action.type) {
    //Handle follow actions
    case courseTypes.PUBLIC_COURSE_LIST_FETCH_FOLLOWED_COURSES + AsyncActions.PENDING:
      return state;      
    case courseTypes.PUBLIC_COURSE_LIST_FETCH_FOLLOWED_COURSES + AsyncActions.FULFILLED:
      return {...state, followedCourses: action.payload}
    case courseTypes.PUBLIC_COURSE_LIST_FETCH_FOLLOWED_COURSES + AsyncActions.REJECTED:
      return state;
    case courseTypes.PUBLIC_COURSE_LIST_SHOW_FOLLOW_MODAL:
      return {...state, show_follow_modal: true}
    case courseTypes.PUBLIC_COURSE_LIST_CLOSE_FOLLOW_MODAL:
      return {...state, show_follow_modal: false}
    case courseTypes.PUBLIC_COURSE_LIST_SUBMIT_FOLLOW_SUCCESSFULLY:
      return {...state, submit_follow_success: true, submit_follow_fail: false}
    case courseTypes.PUBLIC_COURSE_LIST_SUBMIT_FOLLOW_FAILL:
      return {...state, submit_follow_fail: true, submit_follow_success: false}
    case courseTypes.PUBLIC_COURSE_LIST_SHOW_FOLLOW_STATUS_MODAL:
      return {...state, show_follow_status_modal: true, show_follow_modal: false}
    case courseTypes.PUBLIC_COURSE_LIST_CLOSE_FOLLOW_STATUS_MODAL:
      return {...state, show_follow_status_modal: false, show_follow_modal: false}
    default:
      return state;
  }
};

export default PublicCourseList;
