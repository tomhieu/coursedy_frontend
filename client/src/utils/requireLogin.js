import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { SecurityUtils } from './SecurityUtils';
import * as sessionActions from '../actions/SessionActionCreator';

export default function requireLogin(Component) {
  class RequireLogin extends React.Component {
    static propTypes = {
      user: PropTypes.object,
      fetchingUser: PropTypes.bool,
      route: PropTypes.object
    };

    componentWillMount() {
      if (SecurityUtils.isAuthenticated() && !this.props.user) {
        this.props.fetchUserData();
      }
    }

    hasAuthorization() {
      const {
        route: { roles },
        user
      } = this.props;
      const havePermission =
        user.roles.filter(role => roles.indexOf(role) >= 0).length > 0;
      return roles.length === 0 || havePermission;
    }

    render() {
      const { user, fetchingUser, location } = this.props;
      const isAuthenticated = SecurityUtils.isAuthenticated();
      if (isAuthenticated && !user) {
        return fetchingUser ? (
          <div>LOADING</div>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
              search: `?next=${location.pathname}`
            }}
          />
        );
      }

      return (
        <div>
          {!isAuthenticated || !this.hasAuthorization() ? (
            <Redirect
              to={{ pathname: '/login', state: { from: location }, search: `?next=${location.pathname}` }}
            />
          ) : (
            <Component {...this.props} />
          )}
        </div>
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

  return connect(
    mapStateToProps,
    mapStateToDispatch
  )(withRouter(RequireLogin));
}
