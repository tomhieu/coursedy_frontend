import {connect} from 'react-redux';
import Main from './Main';
import {withRouter} from 'react-router-dom';
import * as sessionActions from 'actions/SessionActionCreator';
import * as WebConstants from "../constants/WebConstants";
import {setLanguage} from "redux-i18n";

// Map the global state to global props here.
const mapStateToProps = (state) => ({
  session: state.session,
  main: state.main,
  lang: state.i18nState.lang
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(sessionActions.fetchCurrentUser()),
  signOut: () => dispatch(sessionActions.signOutUser()),
  showDarkHeader: () => dispatch({ type: WebConstants.SHOW_DARK_HEADER }),
  showWhiteHeader: () => dispatch({ type: WebConstants.SHOW_WHITE_HEADER }),
  switchLang: (lang) => dispatch(setLanguage(lang)),
});

// Use connect both here and in your components.
const App = connect(
  mapStateToProps, mapDispatchToProps
)(Main);

export default withRouter(App);
