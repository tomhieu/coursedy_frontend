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
import main from "./MainReducer";
import TutorProfile from "./TutorProfile";
import loadPersonData from "./TutorPersonalInfo";
import EducationData from "./TutorEducation";
import addNewDocumentFile from "./AddDocumentFile";
import LoadingMask from "./LoadingMask";
import Teachers from './TeachersReducer'
import referenceData from './ReferenceDataReducer'
import HomePage from './HomePageReducer'
import Certificate from './Certificate'
import Payment from './Payment'

import AccountReducer from './AccountReducer'

import AdminCourseListReducer from './Admin/AdminCourseListReducer'
import AdminTeacherListReducer from './Admin/AdminTeacherListReducer'
import AdminStudentListReducer from './Admin/AdminStudentListReducer'

import StudentAccountReducer from './Student/StudentAccountReducer'
import StudentCourseListReducer from './Student/StudentCourseListReducer'
import TutorAccountReducer from './Tutor/TutorAccountReducer'
import TeacherDetail from './TeacherDetailPageReducer';
import DashboardTutorEducationList from './Dashboard/Tutors/Educations/DashboardTutorEducationList';
import DashboardTutorWorkExperienceList from './Dashboard/Tutors/Educations/DashboardTutorWorkExperienceList';
import DashboardMenu from "./Dashboard/Menu/DashboardMenuReducer";
import EnrolledStudentList from "./Dashboard/Tutors/CourseList/EnrolledStudent/ListEnrolledStudentReducer";
import {reducer as notifications} from 'react-notification-system-redux';

const rootReducer = combineReducers({
  DashboardTutorEducationList,
  DashboardTutorWorkExperienceList,
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
  //Reducers for admin
  AdminCourseListReducer,
  AdminTeacherListReducer,
  AdminStudentListReducer,
  //Reducers for student
  StudentCourseListReducer,
  //Reducers for account
  AccountReducer,
  StudentAccountReducer,
  TutorAccountReducer,
  
  session,
  main,
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
  Teachers,
  TeacherDetail,
  Payment,
  HomePage,
  Certificate,
  DashboardMenu,
  EnrolledStudentList,
  notifications
});

export default rootReducer;
