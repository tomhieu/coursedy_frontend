import { TT } from 'utils/locale';
import * as asyncActs from '../../actions/AsyncActionCreator';
import {
  ADMIN_UNAPPROVED_TEACHER_LIST_MAX_ITEM_PER_PAGE
} from '../../constants/WebConstants.js';

const AdminTeacherListReducer = (state = {
  unapprovedTeachers: [],
  isLoading: false,
  totalResult: 0,
  perPage: ADMIN_UNAPPROVED_TEACHER_LIST_MAX_ITEM_PER_PAGE,
  errors: []
}, action) => {
  switch (action.type) {
    case asyncActs.FETCH_ADMIN_UNAPPROVED_TEACHERS + asyncActs.HEADERS:
      return {
        ...state,
        totalResult: parseInt(action.payload.xTotal),
        perPage: parseInt(action.payload.xPerPage),
        currentPage: parseInt(action.payload.xPage)
      };
    case asyncActs.FETCH_ADMIN_UNAPPROVED_TEACHERS + asyncActs.PENDING:
      return { ...state, isLoading: true };
    case asyncActs.FETCH_ADMIN_UNAPPROVED_TEACHERS + asyncActs.FULFILLED:
      return {
        ...state,
        unapprovedTeachers: action.payload,
        isLoading: false
      };
    case asyncActs.FETCH_ADMIN_UNAPPROVED_TEACHERS + asyncActs.REJECTED:
      const enrollErrorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0)
        ? errors : [TT.t('fetch_course_fail')];
      return {
        ...state,
        unapprovedTeachers: [],
        errors: enrollErrorMessages,
        isLoading: false
      };
    default:
      return state;
  }
};

export default AdminTeacherListReducer;
