import { TT } from 'utils/locale';
import { SecurityUtils } from 'utils/SecurityUtils';
import * as types from '../constants/Session';
import * as asyncActs from '../actions/AsyncActionCreator';
import { DAYS_IN_WEEK } from '../actions/CourseFormActionCreator';


const session = (state = {
  currentUser: null,
  fetchingUser: false,
  userBalance: 0,
  errors: [],
  notifications: [],
  hasActiveCourseToLearn: false,
  isJoiningActiveClass: false,
  teachingCourse: null,
  newStartedCourses: []
}, action) => {
  switch (action.type) {
    case types.FETCH_CURRENT_USER + asyncActs.FULFILLED:
      if (action.payload.id) {
        return { ...state, currentUser: action.payload, fetchingUser: false };
      }
      return { ...state, fetchingUser: false };

    case types.FETCH_CURRENT_USER + asyncActs.REJECTED:
      return { ...state, currentUser: null, fetchingUser: false };
    case types.SIGN_OUT + asyncActs.REJECTED:
    case types.SIGN_OUT + asyncActs.FULFILLED:
      return { ...state, currentUser: null };
    case types.FETCH_CURRENT_USER + asyncActs.PENDING:
      return { ...state, fetchingUser: true };
    case asyncActs.FETCH_USER_BALANCE + asyncActs.PENDING:
      return { ...state, userBalance: 0, fetchingUser: false };
    case asyncActs.FETCH_USER_BALANCE + asyncActs.FULFILLED:
      return { ...state, userBalance: action.payload.value, fetchingUser: false };
    case types.UPDATE_CURRENT_USER + asyncActs.FULFILLED:
      return { ...state, currentUser: action.payload, fetchingUser: false };
    case asyncActs.FETCH_USER_BALANCE + asyncActs.REJECTED:
      const errorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0)
        ? errors : [TT.t('fetch_user_balance_fail')];
      return {
        ...state, userBalance: 0, errors: errorMessages, fetchingUser: false
      };
    case types.FETCH_NOTIFICATION_USER + asyncActs.FULFILLED:
      return { ...state, notifications: action.payload };
    case asyncActs.FETCH_TUTOR_ACTIVE_COURSES + asyncActs.FULFILLED:
    case asyncActs.FETCH_STUDENT_ACTIVE_COURSES + asyncActs.FULFILLED:
      const activeCourses = action.payload;
      const currentDay = DAYS_IN_WEEK.find(day => new Date().getDay() === day.id);
      const haveActiveCourseToday = activeCourses.filter(course => course.week_day_schedules.find(day => day.day === currentDay.name) !== undefined).length > 0;
      if (SecurityUtils.isTeacher(state.currentUser)) {
        // const notReadyCourses = activeCourses.filter((course) => {
        //  course.s
        // })
        return { ...state, hasActiveCourseToLearn: haveActiveCourseToday };
      } if (SecurityUtils.isStudent(state.currentUser)) {
        return { ...state, hasActiveCourseToLearn: haveActiveCourseToday, newStartedCourses: activeCourses };
      }
    case asyncActs.FETCH_TUTOR_UPCOMING_COURSES + asyncActs.FULFILLED:
    case asyncActs.FETCH_STUDENT_UPCOMING_COURSES + asyncActs.FULFILLED:
      let upcommingCourse = null;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        upcommingCourse = action.payload[0];
      }
      return { ...state, teachingCourse: upcommingCourse };
    case asyncActs.CLOSE_POPUP_JOIN_UPCOMMING_CLASS:
      return { ...state, teachingCourse: null };
    case asyncActs.STARTED_JOINING_ACTIVE_CLASS:
      return { ...state, teachingCourse: null, isJoiningActiveClass: true };
    case asyncActs.LEAVED_JOINING_CLASS:
      return { ...state, isJoiningActiveClass: false };

    default:
      return state;
  }
};

export default session;
