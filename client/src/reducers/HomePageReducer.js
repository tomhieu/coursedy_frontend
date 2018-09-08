import * as courseTypes from 'constants/Courses';
import * as asyncActs from 'actions/AsyncActionCreator';
import data from '../configs/data.json';


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
    case courseTypes.POPULAR_COURSES + asyncActs.FULFILLED:
      return {
        ...state,
        popularCourses: action.payload,
        totalCourses: action.payload.length
      };
    case courseTypes.POPULAR_COURSES + asyncActs.REJECTED:
      return { ...state, popularCourses: [], error: action.payload };

    // new courses reducer
    case courseTypes.NEW_COURSES + asyncActs.FULFILLED:
      return {
        ...state, newCourses: action.payload
      };
    case courseTypes.NEW_COURSES + asyncActs.REJECTED:
      return { ...state, newCourses: [], error: action.payload };

    // top teachers
    case asyncActs.TOP_TEACHERS + asyncActs.FULFILLED:
      return {
        ...state,
        topTeachers: action.payload,
        totalTeachers: action.payload.length
      };
    case asyncActs.TOP_TEACHERS + asyncActs.REJECTED:
      return {
        ...state, topTeachers: [], totalTeachers: 0, error: action.payload
      };

    default:
      return state;
  }
};

export default HomePage;
