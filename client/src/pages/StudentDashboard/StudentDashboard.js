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
import {TT} from '../../utils/locale';

class StudentDashboard extends RoleAuthorization {
  componentDidMount() {
    this.props.showDashboardHeader();
  }

  componentWillUnmount() {
    this.props.closeDashboardHeader();
  }

  render() {
    const { isCollapseDashboard } = this.props;
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
      <div className="dashboard-section">
        <div className="d-flex flex-row flex-auto">
          <div className={leftMenuClasses.join(' ')} id="sidebar">
            <div className={dashboardMenuClasses} id="accordion">
              <TutorContainers.DashboardProfileContainer />
              <StudentDashboardMenu {...this.props} />
            </div>
          </div>
          <div className={dashboardContentClasses}>
            <div className="full-width daskboard-container container">
              { this.props.children }
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

const styleComponent = cssModules(StudentDashboard, styles);

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  fetchingUser: state.session.fetchingUser,
  activatedTab: state.DashboardMenu.activatedTab,
  isCollapseDashboard: state.DashboardMenu.isCollapseDashboard,
});

const mapDispatchToProps = dispatch => ({
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId)),
  signOut: () => dispatch(sessionActions.signOutUser()),
  showDashboardHeader: () => dispatch({ type: WebConstants.SHOW_DARKBOARD_HEADER }),
  closeDashboardHeader: () => dispatch({ type: WebConstants.CLOSE_DARKBOARD_HEADER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(styleComponent);
