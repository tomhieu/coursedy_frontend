import {connect} from 'react-redux';
import Main from './Main';
import {withRouter} from 'react-router-dom';
import * as sessionActions from 'actions/SessionActionCreator';
import * as courseActions from 'actions/ListTutorCourseActionCreator';
import * as WebConstants from "../constants/WebConstants";
import {CLOSE_POPUP_JOIN_UPCOMMING_CLASS} from "../actions/AsyncActionCreator";

// Map the global state to global props here.
const mapStateToProps = (state) => ({
  session: state.session,
  main: state.main
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(sessionActions.fetchCurrentUser()),
  signOut: () => dispatch(sessionActions.signOutUser()),
  fetchUpCommingTeacherCourse: () => dispatch(courseActions.fetchUpcomingTutorCourse()),
  fetchUpCommingStudentCourse: () => dispatch(courseActions.fetchUpcomingStudentCourse()),
  closePopupJoinUpcomingClass: () => dispatch({type: CLOSE_POPUP_JOIN_UPCOMMING_CLASS}),
  showDarkHeader: () => dispatch({ type: WebConstants.SHOW_DARK_HEADER }),
  showWhiteHeader: () => dispatch({ type: WebConstants.SHOW_WHITE_HEADER }),
});

// Use connect both here and in your components.
const App = connect(
  mapStateToProps, mapDispatchToProps
)(Main);

export default withRouter(App);
