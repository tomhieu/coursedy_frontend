import {connect} from 'react-redux';
import Main from './Main';
import {withRouter} from 'react-router-dom';
import {setLanguage} from "redux-i18n";
import {error, success} from 'react-notification-system-redux';

// Map the global state to global props here.
const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

const mapDispatchToProps = (dispatch) => ({
  switchLang: (lang) => dispatch(setLanguage(lang))
});

// Use connect both here and in your components.
const App = connect(
  mapStateToProps, mapDispatchToProps
)(Main);

export default withRouter(App);
