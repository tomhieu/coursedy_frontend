import * as courseTypes from '../../constants/Courses';
import * as asyncActs from '../../actions/AsyncActionCreator';
import { TT } from '../../utils/locale';

const PublicCourseDetail = (state = {
  course: {},
  course_sections: [],
  course_comments: [],
  course_comments_page: 1,
  isFetchingCourseDetails: false,
  isFetching: true,
  relatedCourses: [],

  course_tutor: null,
  submit_follow_success: false,
  submit_follow_fail: false,
  submit_enroll_success: false,
  submit_enroll_fail: false,
  submit_enroll_errors: [],

    // show_comment_status_modal: false,
    submit_comment_success: false,
    submit_comment_fail: false,
    submit_comment_errors: [],
    // use for active scroll menu
    sectionPositions: {
      'course-detail-intro': 0,
      'course-detail-lessons': 0,
      'course-detail-tutor': 0,
      'course-detail-comments': 0,
      'course-detail-related': 0,
    },
    cart: [],
    cartTotal: 0
  }, action) => {
  switch (action.type) {
    case courseTypes.FETCH_PUBLIC_COURSE + asyncActs.PENDING:
      return { ...state, course: {}, isFetchingCourseDetails: true };
    case courseTypes.FETCH_PUBLIC_COURSE + asyncActs.FULFILLED:
      return { ...state, course: action.payload, isFetchingCourseDetails: false };
    case courseTypes.FETCH_PUBLIC_COURSE + asyncActs.REJECTED:
      return { ...state, course: { error: action.payload }, isFetchingCourseDetails: false };
    case courseTypes.FETCH_PUBLIC_COURSE_SECTIONS + asyncActs.FULFILLED:
      return { ...state, course_sections: action.payload };
    case courseTypes.FETCH_PUBLIC_COURSE_SECTIONS + asyncActs.REJECTED:
      return { ...state, course_sections: [] };
    case courseTypes.FETCH_PUBLIC_COURSE_TUTOR + asyncActs.FULFILLED:
      const {
        twitter = TT.t('twitter_link'),
        linkedIn = TT.t('linkedIn_link'),
        facebook = TT.t('facebook_link'),
      } = action.payload;
      return {
        ...state,
        course_tutor: {
          twitter, linkedIn, facebook, ...action.payload
        }
      };
    case courseTypes.FETCH_PUBLIC_COURSE_TUTOR + asyncActs.REJECTED:
      return { ...state, course_tutor: null };


    // Reducer for follow courses
    case asyncActs.STORE_COURSE_FOLLOW + asyncActs.PENDING:
      return state;
    case asyncActs.STORE_COURSE_FOLLOW + asyncActs.FULFILLED:
      return { ...state, submit_follow_success: true, submit_follow_fail: false };
    case asyncActs.STORE_COURSE_FOLLOW + asyncActs.REJECTED:
      return { ...state, submit_follow_fail: true, submit_follow_success: false };

    // Handle enroll actions
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL + asyncActs.FULFILLED:
      return { ...state, submit_enroll_success: true };
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL + asyncActs.REJECTED:
      return {...state, submit_enroll_fail: true, submit_enroll_errors: action.payload.errors}

    //Handle add course to cart
    case courseTypes.PUBLIC_COURSE_DETAIL_FETCH_CART + asyncActs.REJECTED:
      return { ...state }
    case courseTypes.PUBLIC_COURSE_DETAIL_FETCH_CART + asyncActs.FULFILLED:
      return {
        ...state,
        cart: [],
        cartTotal: 0
      }
    case courseTypes.PUBLIC_COURSE_DETAIL_ADD_COURSE_TO_CART + asyncActs.REJECTED:
      return { ...state }
    case courseTypes.PUBLIC_COURSE_DETAIL_ADD_COURSE_TO_CART + asyncActs.FULFILLED:
      return {
        ...state,
        cart: [
          ...state.cart,
          action.payload
        ],
        cartTotal: state.cartTotal + parseInt(action.payload.tuition_fee)
      }
    case courseTypes.PUBLIC_COURSE_DETAIL_REMOVE_COURSE_FROM_CART + asyncActs.REJECTED:
      return { ...state }
    case courseTypes.PUBLIC_COURSE_DETAIL_REMOVE_COURSE_FROM_CART + asyncActs.FULFILLED:
      return {
        ...state,
        cart: state.cart.filter((item) => {
          return item.id != action.payload.id
        }),
        cartTotal: state.cartTotal - parseInt(action.payload.tuition_fee)
      }


    case courseTypes.PUBLIC_COURSE_SHOW_ENROLL_STATUS_MODAL:
      return { ...state, show_enroll_status_modal: true };
    case courseTypes.PUBLIC_COURSE_CLOSE_ENROLL_STATUS_MODAL:
      return { ...state, show_enroll_status_modal: false };

    // Reducer for related courses
    case courseTypes.PUBLIC_COURSE_DETAIL_FETCH_COMMENTS_SUCCESSFULLY:
      return {
        ...state,
        course_comments: [...new Set([...state.course_comments, ...action.payload.comments])].filter((obj, index, self) => index === self.findIndex(t => (
          t.id === obj.id
        ))),
        course_comments_page: action.payload.page
      };
    case courseTypes.PUBLIC_COURSE_DETAIL_FETCH_COMMENTS_FAIL:
      return state;
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT + asyncActs.FULFILLED:
      return {
        ...state,
        submit_comment_success: true,
        show_comment_status_modal: true,
        course_comments: state.course_comments.concat(action.payload).filter((obj, index, self) => index === self.findIndex(t => (
          t.id === obj.id
        )))
      };
    case courseTypes.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT + asyncActs.REJECTED:
      return {
        ...state,
        submit_comment_fail: true,
        show_comment_status_modal: true
      };

    // Reducer for related courses
    case courseTypes.PUBLIC_COURSE_DETAIL_RELATED_COURSES + asyncActs.PENDING:
      return { ...state, isFetching: true };
    case courseTypes.PUBLIC_COURSE_DETAIL_RELATED_COURSES + asyncActs.FULFILLED:
      return {
        ...state,
        relatedCourses: action.payload,
        isFetching: false
      };
    case courseTypes.PUBLIC_COURSE_DETAIL_RELATED_COURSES + asyncActs.REJECTED:
      return {
        ...state,
        relatedCourses: [],
        isFetching: false
      };

    // Reducer for course view
    case courseTypes.PUBIC_COURSE_DETAIL_SUBMIT_VIEW + asyncActs.FULFILLED:
      return state;
    case courseTypes.PUBIC_COURSE_DETAIL_SUBMIT_VIEW + asyncActs.REJECTED:
      return state;
    case courseTypes.PUBLIC_COURSE_DETAIL_UPDATE_ACTIVE_MENU:
      return { ...state, sectionPositions: action.payload };
    default:
      return state;
  }
};

export default PublicCourseDetail;
