import { SecurityUtils } from 'utils/SecurityUtils';
import * as types from '../constants/Session';
import * as asyncActs from '../actions/AsyncActionCreator';
import { DAYS_IN_WEEK } from '../actions/CourseFormActionCreator';
import { CourseStatus } from '../constants/CourseStatus';


const session = (state = {
  currentUser: null,
  fetchingUser: false,
  errors: [],
  notifications: [],
  hasActiveCourseToLearn: false,
  isJoiningActiveClass: false,
  showUpcommingClassPopup: false,
  stopPolling: false,
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
    case types.UPDATE_CURRENT_USER + asyncActs.FULFILLED:
      return { ...state, currentUser: action.payload, fetchingUser: false };
    case types.FETCH_NOTIFICATION_USER + asyncActs.FULFILLED:
      return { ...state, notifications: action.payload };
    case asyncActs.FETCH_TUTOR_ACTIVE_COURSES + asyncActs.FULFILLED:
    case asyncActs.FETCH_STUDENT_ACTIVE_COURSES + asyncActs.FULFILLED:
      const activeCourses = action.payload.filter(c => c.status === CourseStatus.STARTED);
      const currentDay = DAYS_IN_WEEK().find(day => new Date().getDay() === day.id);
      const haveActiveCourseToday = activeCourses.filter(course => course.week_day_schedules.find(day => day.day === currentDay.name) !== undefined).length > 0;
      if (SecurityUtils.isTeacher(state.currentUser)) {
        // const notReadyCourses = activeCourses.filter((course) => {
        //  course.s
        // })
        return { ...state, hasActiveCourseToLearn: haveActiveCourseToday };
      } else if (SecurityUtils.isStudent(state.currentUser)) {
        return { ...state, hasActiveCourseToLearn: haveActiveCourseToday, newStartedCourses: activeCourses };
      }
      return state;
    case asyncActs.FETCH_TUTOR_UPCOMING_COURSES + asyncActs.FULFILLED:
    case asyncActs.FETCH_STUDENT_UPCOMING_COURSES + asyncActs.FULFILLED:
      let upcommingCourse = null;
      let showUpcommingClassPopup = false;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        upcommingCourse = action.payload[0];
        showUpcommingClassPopup = true;
      }
      return { ...state, teachingCourse: upcommingCourse, stopPolling: showUpcommingClassPopup, showUpcommingClassPopup };
    case asyncActs.CLEAR_STUDENT_ACTIVE_COURSES:
      return { ...state, newStartedCourses: [] };
    case asyncActs.CLOSE_POPUP_JOIN_UPCOMMING_CLASS:
      return { ...state, stopPolling: false, showUpcommingClassPopup: false };
    case asyncActs.STARTED_JOINING_ACTIVE_CLASS:
      return { ...state, isJoiningActiveClass: true, stopPolling: false};
    case asyncActs.STOP_POLLING_UPCOMMING_COURSE:
      return { ...state, stopPolling: true };
    case asyncActs.START_POLLING_UPCOMMING_COURSE:
      return { ...state, stopPolling: false };
    case asyncActs.LEAVED_JOINING_CLASS:
      return { ...state, isJoiningActiveClass: false };

    default:
      return state;
  }
};

export default session;
