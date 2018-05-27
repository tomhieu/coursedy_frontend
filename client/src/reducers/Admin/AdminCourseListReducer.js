import * as asyncActs from "../../actions/AsyncActionCreator";
import {TT} from "utils/locale";
import {
  ADMIN_UNAPPROVED_COURSE_LIST_MAX_ITEM_PER_PAGE
} from "../../constants/WebConstants.js"
const AdminCourseListReducer = (state = {
  unapprovedCourses: [],
  isLoading: false,
  totalResult: 0,
  perPage: ADMIN_UNAPPROVED_COURSE_LIST_MAX_ITEM_PER_PAGE,
  currentPage: 1,
  errors: []
}, action) => {
  switch (action.type) {
    case asyncActs.FETCH_UNAPPROVED_COURSES + asyncActs.HEADERS:
      return {
        ...state, 
        totalResult: parseInt(action.payload.xTotal),
        currentPage: parseInt(action.payload.xPage)
      }
    case asyncActs.FETCH_UNAPPROVED_COURSES + asyncActs.PENDING:
      return {...state, isLoading: true}
    case asyncActs.FETCH_UNAPPROVED_COURSES + asyncActs.FULFILLED:
      return {
        ...state, 
        unapprovedCourses: action.payload,
        isLoading: false
      }
    case asyncActs.FETCH_UNAPPROVED_COURSES + asyncActs.REJECTED:
      const enrollErrorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
        errors : [TT.t('fetch_course_fail')];
      return {
        ...state, 
        unapprovedCourses: [], 
        errors: enrollErrorMessages,
        isLoading: false
      }
    default:
      return state;
    }
};

export default AdminCourseListReducer;
