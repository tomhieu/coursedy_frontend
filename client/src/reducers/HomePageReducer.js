import * as courseTypes from 'constants/Courses'
import * as homePageTypes from 'constants/HomePage'
import data from '../configs/data.json'

const HomePage = (state = {
  popularCourses: [],
  newCourses: [],
  studentsComment: [],
  topTeachers: [],
  totalCourses: data.totalCourses,
  totalTeachers: 0
}, action) => {
  switch (action.type) {
    // popular courses reducer
    case courseTypes.POPULAR_COURSES + '_FULFILLED':
      return {
        ...state,
        popularCourses: action.payload,
        totalCourses: action.payload.length
      }
    case courseTypes.POPULAR_COURSES + '_REJECTED':
      return { ...state, popularCourses: [] }

    // new courses reducer
    case courseTypes.NEW_COURSES + '_FULFILLED':
      return {
        ...state, newCourses: action.payload
      }
    case courseTypes.NEW_COURSES + '_REJECTED':
      return { ...state, newCourses: [] }

    // top teachers
    case homePageTypes.TOP_TEACHERS + '_FULFILLED':
      return {
        ...state,
        topTeachers: action.payload,
        totalTeachers: action.payload.length
      }

    case homePageTypes.TOP_TEACHERS + '_REJECTED':
      return {
        ...state,
        topTeachers: [],
        totalTeachers: 0,
        error: action.payload
      }

    default:
      return state
  }
}

export default HomePage
