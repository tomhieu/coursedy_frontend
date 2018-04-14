import React from 'react';
import cssModules from 'react-css-modules';
import styles from './StudentDashboard.module.scss';
import {Route} from 'react-router-dom'
import {
  LoadingMask,
  RoleAuthorization,
  StudentComponents,
} from '../../../components';

import {
  StudentContainers
} from '../../../containers'
import {connect} from 'react-redux';
import * as sessionActions from '../../../actions/SessionActionCreator'

class StudentDashboardPage extends RoleAuthorization {
  constructor(props) {
    super(props)
    this.authorizedRoles = ['student']
    this.unauthorizedPath = '/'
  }

  signOut(e) {
    e.preventDefault()
    this.props.dispatch(sessionActions.signOutUser())
  }

  render() {
    if (this.props.fetchingUser) return null

    return (
      <div className="dashboard-section">
        <div className="container">
          <div className="row offcanvas offcanvas-right row-margin">
            <div className="col-xs-12 col-sm-4 left-panel" id="sidebar">
              <div className="panel-group dashboard-menu" id="accordion">
                {
                  this.props.currentUser !== null ? <StudentContainers.DashboardProfileContainer/> : null
                }
                <StudentComponents.StudentDashboardMenu signOut={this.signOut.bind(this)}/>
              </div>
            </div>
            <div className="col-xs-12 col-sm-8 d-flex">
              <switch>
                <Route exact 
                  path="/student/dashboard/account/profile" 
                  component={StudentContainers.AccountProfileContainer}
                />
                <Route exact 
                  path="/student/dashboard/account/balance" 
                  component={StudentContainers.StudentBalanceContainer}
                />
                <Route exact 
                  path="/student/dashboard/courses/enrolled" 
                  component={StudentContainers.StudentCoursesEnrolledContainer}
                />
                <Route exact 
                  path="/student/dashboard/courses/enrolling" 
                  component={StudentContainers.StudentCoursesEnrollingContainer}
                />
                <Route exact 
                  path="/student/dashboard/courses/follow" 
                  component={StudentContainers.StudentCoursesFollowContainer}
                />
              </switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styleComponent = cssModules(StudentDashboardPage, styles);

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  fetchingUser: state.session.fetchingUser
})

export default connect(mapStateToProps)(styleComponent)