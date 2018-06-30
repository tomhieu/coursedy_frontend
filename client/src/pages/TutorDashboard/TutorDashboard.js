import React from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorDashboard.module.scss';
import {Route} from 'react-router-dom'
import {RoleAuthorization, TutorDashboardMenu} from '../../components/index';
import {
  TutorContainers
} from '../../containers/'
import CourseFormContainer from '../../containers/Courses/CourseForm/CourseFormContainer';
import TutorProfileDetailsContainer from '../../containers/Tutor/Profile/TutorProfileDetailsContainer';
import {connect} from 'react-redux';
import ListLessonContainer from "../../containers/Courses/Lesson/ListLessonContainer";
import ListTutorCourseContainer from "../../containers/Courses/CourseList/ListTutorCourseContainer";
import TutorAccount from "../../containers/Account/Tutor/TutorAccountContainer";
import * as sessionActions from '../../actions/SessionActionCreator'
import * as dashboardActions from '../../actions/DashboardMenuActionCreator'
import {CourseStatus} from "../../constants/CourseStatus";
import * as WebConstants from "../../constants/WebConstants";
import {UserRole} from "constants/UserRole";
import PrivateRoute from "containers/PrivateRoute/PrivateRoute";

class TutorDashboard extends RoleAuthorization {
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
              <TutorContainers.DashboardProfileContainer/>
              <TutorDashboardMenu {...this.props} />
            </div>
          </div>
          <div className="d-flex flex-auto dashboard-content">
            <div className="full-width daskboard-container">
              <switch>
                <Route exact path="/dashboard/profile" component={TutorProfileDetailsContainer}/>
                <Route exact path="/dashboard/courses/active" render={props => <ListTutorCourseContainer status={CourseStatus.ACTIVE} {...props}/>} />
                <PrivateRoute exact path="/dashboard/courses/list" roles={[UserRole.TEACHER]} render={props => <ListTutorCourseContainer status={CourseStatus.INACTIVE} {...props}/>} />
                <Route exact path="/dashboard/courses/list-lesson" component={ListLessonContainer}/>
                <PrivateRoute exact path="/dashboard/courses/new" roles={[UserRole.TEACHER]} component={CourseFormContainer}/>
                <PrivateRoute exact path="/dashboard/courses/detail/:id" roles={[UserRole.TEACHER]} component={CourseFormContainer}/>
                <PrivateRoute exact path="/dashboard/account" roles={[UserRole.TEACHER]} component={TutorAccount}/>
              </switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styleComponent = cssModules(TutorDashboard, styles);

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  fetchingUser: state.session.fetchingUser,
  activatedTab: state.DashboardMenu.activatedTab
})

const mapDispatchToProps = (dispatch) => ({
  activateTab: (tabId) => dispatch(dashboardActions.activateTab(tabId)),
  signOut: () => dispatch(sessionActions.signOutUser()),
  showFooter: () => dispatch({ type: WebConstants.SHOW_FOOTER }),
  hideFooter: () => dispatch({ type: WebConstants.HIDE_FOOTER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(styleComponent)