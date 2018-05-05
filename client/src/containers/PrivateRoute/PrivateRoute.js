import React, {Component} from "react";
import {FETCH_USER_ACCOUNT} from "constants/AccountTypes";
import Network from "utils/network";
import {Redirect, Route} from "react-router";
import {connect} from "react-redux";

class PrivateRoute extends Component {
  componentDidMount() {
    const isAuthenticated = localStorage.getItem('ezyLearningToken') !== undefined;
    if (isAuthenticated && this.props.user === undefined) {
      this.props.fetchUser();
    }
  }

  render() {
    const {component: Component, ...rest, user} = this.props;
    const isAuthenticated = localStorage.getItem('ezyLearningToken') !== undefined;
    if (isAuthenticated && user === undefined) {
      return <div>LOADING</div>;
    } else {
      return (
        <Route {...rest} render={props => (
          <div>
            {!isAuthenticated && <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>}
            <Component {...this.props} />
          </div>
        )}
        />
      )
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.AccountReducer.user
})

const mapStateToDispatch = (dispatch) => ({
  fetchUser: () => dispatch({
    type: FETCH_USER_ACCOUNT,
    payload: Network().get('current_user'),
    meta: 'userDetailsPlaceholder'
  })
})

PrivateRoute.propTypes = {
  user: React.PropTypes.object
}

export default connect(
  mapStateToProps, mapStateToDispatch
)(PrivateRoute)