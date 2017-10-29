import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import {i18nState} from "redux-i18n"

// Import the various reducers here:
import LoginComponent from './LoginComponent';
import SignUpComponent from './SignUpComponent';

import CourseFormComponent from './CourseFormComponent';
import CourseListReducer from './Course/CourseListReducer';
import CourseDetailReducer from './Course/CourseDetailReducer';

import session from './Session';
import TutorProfile from './TutorProfile';
import loadPersonData from "./TutorPersonalInfo";
import loadEducationData from "./TutorEducation";
import addNewDocumentFile from "./AddDocumentFile";

const rootReducer = combineReducers({
  // Apply all of the reducers here.
  i18nState,
  LoginComponent,
  SignUpComponent,

  //Reducers for course
  CourseListReducer,
  CourseDetailReducer,
  CourseFormComponent,

  session,
  TutorProfile,
  routing: routerReducer,
  form: formReducer,
  toastr: toastrReducer,
  // Person Info screen
  loadPersonData,
  loadEducationData,
  addNewDocumentFile
});

export default rootReducer;
