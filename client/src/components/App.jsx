import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';
import {withRouter} from 'react-router-dom';

// Map the global state to global props here.
const mapStateToProps = (state) => ({
  // messages: state.messages,
  // errors: state.errors
});

// Map the dispatch and bind the action creators.
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    actionCreators,
    dispatch
  );
}

// Use connect both here and in your components.
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default withRouter(App);
