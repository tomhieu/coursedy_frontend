import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import {i18nState} from "redux-i18n"

// Import the various reducers here:
import LoginComponent from './LoginComponent';
import SignUpComponent from './SignUpComponent';
import CourseFormComponent from './CourseFormComponent';
import session from './Session';
import loadPersonData from "./TutorPersonalInfo";
import loadEducationData from "./TutorEducation";

const rootReducer = combineReducers({
  // Apply all of the reducers here.
  i18nState,
  LoginComponent,
  SignUpComponent,
  CourseFormComponent,
  session,
  routing: routerReducer,
  form: formReducer,
  toastr: toastrReducer,
  // Person Info screen
  loadPersonData,
  loadEducationData
});

export default rootReducer;
