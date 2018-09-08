import {connect} from 'react-redux';
import Main from './Main';
import {withRouter} from 'react-router-dom';
import {error, success} from 'react-notification-system-redux';

// Map the global state to global props here.
const mapStateToProps = (state) => ({
  lang: state.i18nState.lang
});

// Use connect both here and in your components.
const App = connect(
  mapStateToProps, null
)(Main);

export default withRouter(App);
