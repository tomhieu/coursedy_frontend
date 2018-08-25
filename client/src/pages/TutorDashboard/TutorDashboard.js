import React from 'react';
import cssModules from 'react-css-modules';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserRole } from 'constants/UserRole';
import PrivateRoute from 'containers/PrivateRoute/PrivateRoute';
import { SecurityUtils } from 'utils/SecurityUtils';
import styles from './TutorDashboard.module.scss';
import { RoleAuthorization, TutorDashboardMenu } from '../../components/index';
import { TutorContainers } from '../../containers';
import CourseFormContainer from '../../containers/Courses/CourseForm/CourseFormContainer';
import TutorProfileDetailsContainer from '../../containers/Tutor/Profile/TutorProfileDetailsContainer';
import ListLessonContainer from '../../containers/Courses/Lesson/ListLessonContainer';
import ListTutorCourseContainer from '../../containers/Courses/CourseList/ListTutorCourseContainer';
import TutorAccount from '../../containers/Account/Tutor/TutorAccountContainer';
import * as sessionActions from '../../actions/SessionActionCreator';
import * as dashboardActions from '../../actions/DashboardMenuActionCreator';
import { CourseStatus } from '../../constants/CourseStatus';
import * as WebConstants from '../../constants/WebConstants';
import StudentDashboardMenu from '../../components/Student/Dashboard/StudentDashboardMenu';
import { TT } from '../../utils/locale';

class TutorDashboard extends RoleAuthorization {
  componentDidMount() {
    this.props.showDashboardHeader();
  }

  componentWillUnmount() {
    this.props.closeDashboardHeader();
  }

  render() {
    const { currentUser, isCollapseDashboard } = this.props;
    let dashboardMenuClasses = 'panel-group dashboard-menu';
    let dashboardContentClasses = 'd-flex flex-column flex-auto dashboard-content';
    let dashboardFooterClasses = 'dashboard-footer d-flex justify-content-center';
    const leftMenuClasses = [styles.leftPanel];
    if (isCollapseDashboard) {
      dashboardMenuClasses += ' collapsed';
      leftMenuClasses.push(styles.collapsed);
      dashboardContentClasses += ' expanded';
      dashboardFooterClasses += ' expanded';
    }

    return (
      <div className="dashboard-section full-width-in-container">
        <div className="d-flex flex-row flex-auto">
          <div className={leftMenuClasses.join(' ')} id="sidebar">
            {
              SecurityUtils.isTeacher(currentUser)
                ? (
                  <div className={dashboardMenuClasses} id="accordion">
                    <TutorContainers.DashboardProfileContainer />
                    <TutorDashboardMenu {...this.props} />
                  </div>
                )
                : (
                  <div className={dashboardMenuClasses} id="accordion">
                    <TutorContainers.DashboardProfileContainer />
                    <StudentDashboardMenu {...this.props} />
                  </div>
                )
            }

          </div>
          <div className={dashboardContentClasses}>
            <div className="full-width daskboard-container container">
              <switch>
                <Route exact path="/dashboard/profile" component={TutorProfileDetailsContainer} />
                <Route exact path="/dashboard/courses/active" render={props => <ListTutorCourseContainer status={CourseStatus.STARTED} {...props} />} />
                <Route exact path="/dashboard/courses/list" render={props => <ListTutorCourseContainer status={CourseStatus.NOT_STARTED} {...props} />} />
                <Route exact path="/dashboard/courses/list-lesson" component={ListLessonContainer} />
                <Route exact path="/dashboard/courses/new" component={CourseFormContainer} />
                <Route exact path="/dashboard/courses/detail/:id" component={CourseFormContainer} />
                <PrivateRoute exact path="/dashboard/account" roles={[UserRole.TEACHER]} component={TutorAccount} />
              </switch>
            </div>
            <div className={dashboardFooterClasses}>
              <span className="coursedy-copyright">{TT.t('product_copyright')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styleComponent = cssModules(TutorDashboard, styles);

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  fetchingUser: state.session.fetchingUser,
  activatedTab: state.DashboardMenu.activatedTab,
  isCollapseDashboard: state.DashboardMenu.isCollapseDashboard

});

const mapDispatchToProps = dispatch => ({
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId)),
  signOut: () => dispatch(sessionActions.signOutUser()),
  showDashboardHeader: () => dispatch({ type: WebConstants.SHOW_DARKBOARD_HEADER }),
  closeDashboardHeader: () => dispatch({ type: WebConstants.CLOSE_DARKBOARD_HEADER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(styleComponent);
