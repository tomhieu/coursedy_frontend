import {combineReducers} from 'redux';
import TeacherList from './TeacherListReducer';
import TeacherCategories from './TeacherCategoriesReducer';


export default combineReducers({
  teachers: TeacherList,
  categories: TeacherCategories
})
