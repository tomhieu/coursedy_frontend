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
import PublicCourseDetail from "./Course/PublicCourseDetail";
import TutorCourseList from "./Course/TutorCourseListReducer";

import CourseFormComponent from "./CourseFormReducer";

import session from "./Session";
import TutorProfile from "./TutorProfile";
import loadPersonData from "./TutorPersonalInfo";
import EducationData from "./TutorEducation";
import addNewDocumentFile from "./AddDocumentFile";
import LoadingMask from "./LoadingMask";
import TutorAccount from "./TutorAccount";

const rootReducer = combineReducers({
    // Apply all of the reducers here.
    LoadingMask,
    i18nState,
    LoginComponent,
    SignUpComponent,

    //Reducers for course
    CourseListReducer,
    PublicCourseDetail,
    CourseFormComponent,
    TutorCourseList,

    session,
    TutorProfile,
    routing: routerReducer,
    form: formReducer,
    toastr: toastrReducer,
    // Person Info screen
    loadPersonData,
    EducationData,
    addNewDocumentFile,
    CourseFilter,
    TutorAccount
});

export default rootReducer;
