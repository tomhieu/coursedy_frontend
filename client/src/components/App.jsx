import {connect} from 'react-redux';
import Main from './Main';
import {withRouter} from 'react-router-dom';

// Map the global state to global props here.
const mapStateToProps = (state) => ({
  session: state.session,
  footer: state.footer
});

// Use connect both here and in your components.
const App = connect(
  mapStateToProps
)(Main);

export default withRouter(App);
