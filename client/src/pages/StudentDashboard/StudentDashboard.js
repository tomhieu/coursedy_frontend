import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { UserRole } from 'constants/UserRole';
import PrivateRoute from 'containers/PrivateRoute/PrivateRoute';
import styles from './StudentDashboard.module.scss';
import { RoleAuthorization } from '../../components/index';
import { TutorContainers } from '../../containers';
import * as sessionActions from '../../actions/SessionActionCreator';
import * as dashboardActions from '../../actions/DashboardMenuActionCreator';
import * as WebConstants from '../../constants/WebConstants';
import StudentDashboardMenu from '../../components/Student/Dashboard/StudentDashboardMenu';
import StudentCoursesEnrolledContainer from '../../containers/Student/Dashboard/Courses/StudentCoursesEnrolledContainer';
import StudentCoursesEnrollingContainer from '../../containers/Student/Dashboard/Courses/StudentCoursesEnrollingContainer';
import StudentCoursesFollowContainer from '../../containers/Student/Dashboard/Courses/StudentCoursesFollowContainer';
import TutorProfileDetailsContainer from '../../containers/Tutor/Profile/TutorProfileDetailsContainer';

class StudentDashboard extends RoleAuthorization {
  componentDidMount() {
    this.props.hideFooter();
  }

  componentWillUnmount() {
    this.props.showFooter();
  }

  render() {
    return (
      <div className="dashboard-section full-width-in-container">
        <div className="d-flex flex-row flex-auto">
          <div className={styles.leftPanel} id="sidebar">
            <div className="panel-group dashboard-menu" id="accordion">
              <TutorContainers.DashboardProfileContainer />
              <StudentDashboardMenu {...this.props} />
            </div>
          </div>
          <div className="d-flex flex-auto dashboard-content">
            <div className="full-width daskboard-container container">
              <switch>
                <PrivateRoute exact path="/student/dashboard/profile" roles={[UserRole.STUDENT]} component={TutorProfileDetailsContainer} />
                <PrivateRoute exact path="/student/dashboard/courses/enrolled" roles={[UserRole.STUDENT]} component={StudentCoursesEnrolledContainer} />
                <PrivateRoute exact path="/student/dashboard/courses/enrolling" roles={[UserRole.STUDENT]} component={StudentCoursesEnrollingContainer} />
                <PrivateRoute exact path="/student/dashboard/courses/follow" roles={[UserRole.STUDENT]} component={StudentCoursesFollowContainer} />
              </switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styleComponent = cssModules(StudentDashboard, styles);

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  fetchingUser: state.session.fetchingUser,
  activatedTab: state.DashboardMenu.activatedTab
});

const mapDispatchToProps = dispatch => ({
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId)),
  signOut: () => dispatch(sessionActions.signOutUser()),
  showFooter: () => dispatch({ type: WebConstants.SHOW_FOOTER }),
  hideFooter: () => dispatch({ type: WebConstants.HIDE_FOOTER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(styleComponent);
