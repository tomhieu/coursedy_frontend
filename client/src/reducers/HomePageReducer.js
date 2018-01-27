import * as courseTypes from 'constants/Courses';
import * as studentTypes from 'constants/Students';
import * as teacherTypes from 'constants/Teachers';


const HomePage = (state = {
  popularCourses: [],
  newCourses: [],
  studentsComment: [],
  topTeachers: [],
  totalCourses: 0,
  totalTeachers: 0
}, action) => {
  switch (action.type) {
    case courseTypes.FETCH_POPULAR_COURSES_SUCCESS:
      return {
        ...state,
        popularCourses: action.payload.courses,
        totalCourses: action.payload.total
      }
    case courseTypes.FETCH_POPULAR_COURSES_FAILURE:
      return {...state, popularCourses: [] }
    case courseTypes.FETCH_NEW_COURSES_SUCCESS:
      return {
        ...state,
        newCourses: action.payload.courses
      }
    case courseTypes.FETCH_NEW_COURSES_FAILURE:
      return {...state, newCourses: []}
    case studentTypes.FETCH_STUDENT_TOP_COMMENTS_SUCCESS:
      return {
        ...state,
        studentsComment: action.payload
      }
    case studentTypes.FETCH_STUDENT_TOP_COMMENTS_FAILURE:
      return {...state, studentsComment: []}
    case teacherTypes.FETCH_TOP_TEACHERS_SUCCESS:
      return {
        ...state,
        topTeachers: action.payload.teachers,
        totalTeachers: action.payload.total
      }
    default:
      return state;
  }
};

export default HomePage;
