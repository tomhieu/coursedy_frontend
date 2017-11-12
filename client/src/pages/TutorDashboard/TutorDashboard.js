import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorDashboard.module.scss';
import { Router, Switch, Route } from 'react-router-dom'
import {
  TutorProfile,
  TutorDashboardMenu,
  TutorDashboardIndex,
  RoleAuthorization,
  LoadingMask
} from '../../components/index';
import CourseFormContainer from '../../containers/CoursesContainer/CourseFormContainer';
import TutorProfileDetailsContainer from '../../containers/Tutor/Profile/TutorProfileDetailsContainer';
import { connect } from 'react-redux';
import {setCurrentUser} from "actions/SessionActionCreator";
import ListLessonContainer from "../../containers/CoursesContainer/ListLessonContainer";
import ListTutorCourseContainer from "../../containers/CoursesContainer/ListTutorCourseContainer";
import TutorAccount from "../../containers/AccountContainer/Tutor/TutorAccountContainer";

class TutorDashboard extends RoleAuthorization {
  constructor(props){
    super(props)
    this.authorizedRoles = ['teacher']
    this.unauthorizedPath = '/'
  }

  render(){
    if (this.props.fetchingUser) return (<LoadingMask/>)

    return (
      <div className="dashboard-section">
        <div className="container">
          <div className="row offcanvas offcanvas-right row-margin">
            <div className="col-xs-12 col-sm-4 left-panel" id="sidebar">
              <div className="panel-group dashboard-menu" id="accordion">
                <TutorProfile/>
                <TutorDashboardMenu/>
              </div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <switch>
                <Route exact path="/dashboard" component={TutorDashboardIndex}/>
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