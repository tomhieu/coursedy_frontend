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
      tutor: PropTypes.object,
      fetchingUser: PropTypes.bool,
      route: PropTypes.object,
      status: PropTypes.string
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
      const { user, fetchingUser, location, fetchingTutor, tutor, route: { status } } = this.props;
      const isAuthenticated = SecurityUtils.isAuthenticated();

      if (fetchingTutor || fetchingUser) {
        return null;
      }

      if (isAuthenticated && !user) {
        return (
          <Redirect to={{
              pathname: '/login',
              state: { from: location },
              search: `?next=${location.pathname}`
            }}
          /> );
      }

      // if user is teacher, but the teacher details is not loaded yet. Still waiting for loading
      if (user && SecurityUtils.isTeacher(user) && !tutor.status) {
        return null;
      }

      if (tutor && status && tutor.status !== status) {
        return (
          <Redirect to={{
            pathname: '/404',
            state: { from: location },
            search: `?next=${location.pathname}`
          }}
          /> )
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
    fetchingUser: state.session.fetchingUser,
    fetchingTutor: state.TutorAccountReducer.isFetchingTutor,
    tutor: state.TutorAccountReducer.tutor
  });

  const mapStateToDispatch = dispatch => ({
    fetchUserData: () => {
      const res = dispatch(sessionActions.fetchCurrentUser());
      res.then((userData) => {
        if (SecurityUtils.isTeacher(userData.value)) {
          dispatch(sessionActions.fetchCurrentTutor());
        }
      });
    }
  });

  return connect(
    mapStateToProps,
    mapStateToDispatch
  )(withRouter(RequireLogin));
}
