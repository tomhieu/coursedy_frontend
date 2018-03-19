import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";
import {reducer as toastrReducer} from "react-redux-toastr";
import {i18nState} from "redux-i18n";
// Import the various reducers here:
import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";

import CourseFilter from "./CourseFilter";
import CourseListReducer from "./Course/CourseListReducer";
import PublicCourseList from "./Course/PublicCourseList";
import PublicCourseDetail from "./Course/PublicCourseDetail";
import TutorCourseList from "./Course/TutorCourseListReducer";

import courseDetails from "./CourseFormReducer";

import session from "./Session";
import footer from "./FooterReducer";
import TutorProfile from "./TutorProfile";
import loadPersonData from "./TutorPersonalInfo";
import EducationData from "./TutorEducation";
import addNewDocumentFile from "./AddDocumentFile";
import LoadingMask from "./LoadingMask";
import TutorAccount from "./TutorAccount";
import Teachers from './TeachersReducer'
import referenceData from './ReferenceDataReducer'
import HomePage from './HomePageReducer'
import Payment from './Payment'

import StudentAccountReducer from './Student/Account/StudentAccountReducer'

const rootReducer = combineReducers({
  // Apply all of the reducers here.
  LoadingMask,
  i18nState,
  LoginComponent,
  SignUpComponent,

  //Reducers for course
  CourseListReducer,
  PublicCourseList,
  PublicCourseDetail,
  courseDetails,
  TutorCourseList,
  //Reducers for student
  StudentAccountReducer,

  session,
  footer,
  TutorProfile,
  routing: routerReducer,
  form: formReducer,
  toastr: toastrReducer,
  // Person Info screen
  loadPersonData,
  EducationData,
  addNewDocumentFile,
  CourseFilter,
  referenceData,
  TutorAccount,
  Teachers,
  Payment,
  HomePage

});

export default rootReducer;
