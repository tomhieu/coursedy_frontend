import {connect} from 'react-redux';
import Main from './Main';
import {withRouter} from 'react-router-dom';
import * as sessionActions from 'actions/SessionActionCreator';

// Map the global state to global props here.
const mapStateToProps = (state) => ({
  session: state.session,
  main: state.main
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(sessionActions.fetchCurrentUser()),
  signOut: () => dispatch(sessionActions.signOutUser())
});

// Use connect both here and in your components.
const App = connect(
  mapStateToProps, mapDispatchToProps
)(Main);

export default withRouter(App);
