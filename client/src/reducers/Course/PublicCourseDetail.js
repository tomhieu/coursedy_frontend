import * as courseTypes from '../../constants/Courses';
import * as AsyncAction from "../../actions/AsyncActionCreator.js"

const PublicCourseDetail = (state = {
    course: {},
    course_sections: [],
    course_comments: [],
    course_comments_page: 1,
    course_tutor: null,
    show_follow_modal: false,
    submit_follow_success: false,
    submit_follow_fail: false,
    submit_enroll_success: false,
    submit_enroll_fail: false,
    submit_enroll_errors: [],

    show_require_login_modal: false,
    require_login_message: '',
    show_enroll_status_modal: false,
    show_follow_status_modal: false,


    show_comment_status_modal: false,
    submit_comment_success: false,
    submit_comment_fail: false,
    submit_comment_errors: [],
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


    //Handle follow actions
    case courseTypes.PUBLIC_COURSE_DETAIL_SHOW_FOLLOW_MODAL:
      return {...state, show_follow_modal: true}
    case courseTypes.PUBLIC_COURSE_DETAIL_CLOSE_FOLLOW_MODAL:
      return {...state, show_follow_modal: false}
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_FOLLOW_SUCCESSFULLY:
      return {...state, submit_follow_success: true, submit_follow_fail: false}
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_FOLLOW_FAILL:
      return {...state, submit_follow_fail: true, submit_follow_success: false}
    case courseTypes.PUBLIC_COURSE_DETAIL_SHOW_FOLLOW_STATUS_MODAL:
      return {...state, show_follow_status_modal: true, show_follow_modal: false}
    case courseTypes.PUBLIC_COURSE_DETAIL_CLOSE_FOLLOW_STATUS_MODAL:
      return {...state, show_follow_status_modal: false, show_follow_modal: false}


    //Handle enroll actions
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL_SUCCESSFULLY:
      return {...state, submit_enroll_success: true}
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL_FAILL:
      return {...state, submit_enroll_fail: true, submit_enroll_errors: action.payload.errors}
      
    case courseTypes.PUBLIC_COURSE_SHOW_REQUIRE_LOGIN_MODAL:
      return {
        ...state, 
        show_require_login_modal: true, 
        require_login_message: action.payload
      }
    case courseTypes.PUBLIC_COURSE_CLOSE_REQUIRE_LOGIN_MODAL:
      return {...state, show_require_login_modal: false}
    
    case courseTypes.PUBLIC_COURSE_SHOW_ENROLL_STATUS_MODAL:
      return {...state, show_enroll_status_modal: true}
    case courseTypes.PUBLIC_COURSE_CLOSE_ENROLL_STATUS_MODAL:
      return {...state, show_enroll_status_modal: false}


    //Handle comments actions
    case courseTypes.PUBLIC_COURSE_DETAIL_FETCH_COMMENTS_SUCCESSFULLY:
      return {...state, 
        course_comments: [...new Set([...state.course_comments ,...action.payload.comments])].filter((obj, index, self) =>
          index === self.findIndex((t) => (
            t.id === obj.id
          ))
        ),
        course_comments_page: action.payload.page
      }
    case courseTypes.PUBLIC_COURSE_DETAIL_FETCH_COMMENTS_FAIL:
      return state
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT_SUCCESSFULLY:
      return {
        ...state, 
        submit_comment_success: true, 
        show_comment_status_modal: true,
        course_comments: state.course_comments.concat(action.payload).filter((obj, index, self) =>
          index === self.findIndex((t) => (
            t.id === obj.id
          ))
        ) 
      }
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT_FAIL:
      return {
        ...state, 
        submit_comment_fail: true, 
        show_comment_status_modal: true
      }
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT_SHOW_STATUS_MODAL:
      return {...state, show_comment_status_modal: true}
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT_CLOSE_STATUS_MODAL:
      return {...state, show_comment_status_modal: false}
    //
    case courseTypes.PUBIC_COURSE_DETAIL_SUBMIT_VIEW + AsyncAction.FULFILLED:
      return state;
    case courseTypes.PUBIC_COURSE_DETAIL_SUBMIT_VIEW + AsyncAction.REJECTED:
      return state;
    default:
      return state;
  }
};

export default PublicCourseDetail;
