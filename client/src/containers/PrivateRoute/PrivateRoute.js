import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/SessionActionCreator';
import { SecurityUtils } from '../../utils/SecurityUtils';

class PrivateRoute extends Component {
  componentWillMount() {
    if (SecurityUtils.isAuthenticated() && this.props.user == null) {
      this.props.fetchUserData();
    }
  }

  hasAuthorization() {
    const { roles, user } = this.props;
    const havePermission = user.roles.filter(role => roles.indexOf(role) >= 0).length > 0;
    return roles.length === 0 || havePermission;
  }

  render() {
    const {
      user, fetchingUser, component: Component, ...rest
    } = this.props;
    const isAuthenticated = SecurityUtils.isAuthenticated();
    if (isAuthenticated && user == null) {
      return fetchingUser ? <div>LOADING</div> : <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />;
    }
    return (
      <Route
        {...rest}
        render={props => (
          <div>
            {
              !isAuthenticated ? <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
                : this.hasAuthorization() ? <Component {...this.props} />
                  : <Redirect to={{ pathname: '/404', state: { from: this.props.location } }} />
            }
          </div>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.currentUser,
  fetchingUser: state.session.fetchingUser
});

const mapStateToDispatch = dispatch => ({
  fetchUserData: () => dispatch(sessionActions.fetchCurrentUser())
});

PrivateRoute.propTypes = {
  user: React.PropTypes.object,
  fetchingUser: React.PropTypes.bool,
  roles: React.PropTypes.array
};

export default connect(
  mapStateToProps, mapStateToDispatch
)(PrivateRoute);
