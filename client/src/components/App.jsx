import {connect} from 'react-redux';
import Main from './Main';
import {withRouter} from 'react-router-dom';
import * as sessionActions from '../actions/SessionActionCreator';
import * as courseActions from '../actions/ListTutorCourseActionCreator';
import * as WebConstants from "../constants/WebConstants";
import {
  CLOSE_POPUP_JOIN_UPCOMMING_CLASS, LEAVED_JOINING_CLASS,
  STARTED_JOINING_ACTIVE_CLASS
} from "../actions/AsyncActionCreator";
import {setLanguage} from "redux-i18n";
import info, {success, error} from 'react-notification-system-redux';

// Map the global state to global props here.
const mapStateToProps = (state) => ({
  session: state.session,
  main: state.main,
  lang: state.i18nState.lang,
  notifications: state.notifications
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(sessionActions.fetchCurrentUser()).then((user) => {
    dispatch(sessionActions.fetchActiveCourses(user.value));
  }),
  signOut: () => dispatch(sessionActions.signOutUser()),
  fetchUpCommingTeacherCourse: () => dispatch(courseActions.fetchUpcomingTutorCourse()),
  fetchUpCommingStudentCourse: () => dispatch(courseActions.fetchUpcomingStudentCourse()),
  closePopupJoinUpcomingClass: () => dispatch({type: CLOSE_POPUP_JOIN_UPCOMMING_CLASS}),
  afterJoinUpcomingClass: () => dispatch({type: STARTED_JOINING_ACTIVE_CLASS}),
  afterLeavedActiveClass: () => dispatch({type: LEAVED_JOINING_CLASS}),
  showDarkHeader: () => dispatch({ type: WebConstants.SHOW_DARK_HEADER }),
  showWhiteHeader: () => dispatch({ type: WebConstants.SHOW_WHITE_HEADER }),
  switchLang: (lang) => dispatch(setLanguage(lang)),
  showInfoNotification: (notification) => dispatch(success(notification)),
  showErrorNotification: (notification) => dispatch(error(notification)),
  closeConfirmationPopup: () => dispatch({ type: WebConstants.CLOSE_CONFIRMATION_POPUP })
});

// Use connect both here and in your components.
const App = connect(
  mapStateToProps, mapDispatchToProps
)(Main);

export default withRouter(App);
