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

class TutorDashboard extends RoleAuthorization {
  render() {
    if (this.props.fetchingUser) return null

    return (
      <div className="dashboard-section">
        <div className="row">
          <div className="col-xs-12 col-sm-3 left-panel" id="sidebar">
            <div className="panel-group dashboard-menu" id="accordion">
              <TutorContainers.DashboardProfileContainer/>
              <TutorDashboardMenu />
            </div>
          </div>
          <div className="col-xs-12 col-sm-9 d-flex dashboard-content">
            <switch>
              <Route exact path="/dashboard/account" component={TutorAccount}/>
              <Route exact path="/dashboard/courses/list" component={ListTutorCourseContainer}/>
              <Route exact path="/dashboard/courses/list-lesson" component={ListLessonContainer}/>
              <Route exact path="/dashboard/courses/new" component={CourseFormContainer}/>
              <Route exact path="/dashboard/courses/detail/:id" component={CourseFormContainer}/>
              <Route exact path="/dashboard/profile" component={TutorProfileDetailsContainer}/>
            </switch>
          </div>
        </div>
      </div>
    )
  }
}

const styleComponent = cssModules(TutorDashboard, styles);

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  fetchingUser: state.session.fetchingUser
})

export default connect(mapStateToProps)(styleComponent)