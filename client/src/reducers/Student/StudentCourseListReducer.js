import * as asyncActs from "../../actions/AsyncActionCreator";
import {STARTED_COURSE, TERMINATED_COURSE} from "../../constants/WebConstants"
import {TT} from "utils/locale";

const StudentCourseListReducer = (state = {
  isFetchingEnrollCourse: true,
  isFetchingFollowCourse: true,
  enrolledCourses: [],
  enrollingCourses: [],
  followCourses: [],
  errors: []
}, action) => {
    switch (action.type) {
        case asyncActs.FETCH_STUDENT_ENROLL_COURSES + asyncActs.PENDING:
          return {
            ...state, 
            isFetchingEnrollCourse: true, 
            enrolledCourses: [], 
            enrollingCourses: []
          }
        case asyncActs.FETCH_STUDENT_ENROLL_COURSES + asyncActs.FULFILLED:
            const enrollCourses = action.payload.map((course) => {return {...course, onlyTutor: false}});
            const enrolledCourses = enrollCourses.filter((course) => {return course.status === TERMINATED_COURSE })
            const enrollingCourses = enrollCourses.filter((course) => {return course.status === STARTED_COURSE })
            return {
              ...state, 
              enrolledCourses: enrolledCourses, 
              enrollingCourses: enrollingCourses, 
              isFetchingEnrollCourse: false 
            }
        case asyncActs.FETCH_STUDENT_ENROLL_COURSES + asyncActs.REJECTED:
          const enrollErrorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
            errors : [TT.t('fetch_course_fail')];
            return {...state, courses: [], errors: enrollErrorMessages }

        case asyncActs.FETCH_STUDENT_FOLLOW_COURSES + asyncActs.PENDING:
          return {...state, isFetchingFollowCourse: true, followCourses: [] };
        case asyncActs.FETCH_STUDENT_FOLLOW_COURSES + asyncActs.FULFILLED:
            const followCourses = action.payload.map((course) => {return {...course, onlyTutor: false}});
            return {...state, followCourses: followCourses, isFetchingFollowCourse: false }
        case asyncActs.FETCH_STUDENT_FOLLOW_COURSES + asyncActs.REJECTED:
          const followErrorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
            errors : [TT.t('fetch_course_fail')];
            return {...state, courses: [], errors: followErrorMessages }
        default:
            return state;
    }
};

export default StudentCourseListReducer;
