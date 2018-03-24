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
// import CourseFormContainer from '../../containers/Courses/CourseForm/CourseFormContainer';
// import TutorProfileDetailsContainer from '../../containers/Tutor/Profile/TutorProfileDetailsContainer';
import {connect} from 'react-redux';
// import ListLessonContainer from "../../containers/Courses/Lesson/ListLessonContainer";
// import ListTutorCourseContainer from "../../containers/Courses/CourseList/ListTutorCourseContainer";
// import TutorAccount from "../../containers/Account/Tutor/TutorAccountContainer";

class StudentDashboardPage extends RoleAuthorization {
  constructor(props) {
    super(props)
    this.authorizedRoles = ['teacher']
    this.unauthorizedPath = '/'
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
                <StudentComponents.StudentDashboardMenu/>
              </div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <switch>
                <Route exact 
                  path="/student/dashboard" 
                  component={StudentComponents.StudentDashboardIndex}
                />
                <Route exact 
                  path="/student/dashboard/account/profile" 
                  component={StudentContainers.AccountProfileContainer}
                />
                <Route exact 
                  path="/student/dashboard/account/balance" 
                  component={StudentContainers.StudentBalanceContainer}
                />
                <Route exact 
                  path="/student/dashboard/courses/enroll" 
                  component={StudentContainers.StudentCoursesEnrollContainer}
                />
                <Route exact 
                  path="student/dashboard/courses/follow" 
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