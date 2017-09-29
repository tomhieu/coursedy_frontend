import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorDashboard.module.scss';
import { Router, Switch, Route } from 'react-router-dom'
import {
  TutorProfile,
  TutorDashboardMenu,
  TutorDashboardIndex
} from '../../components/index';
import {RoleAuthorization, LoadingMask} from '../../components/index';
import { connect } from 'react-redux';
import {setCurrentUser} from "actions/SessionActionCreator";

class TutorDashboard extends RoleAuthorization {
  constructor(props){
    super(props)
    this.authorizedRoles = ['teacher']
    this.unauthorizedPath = '/'
  }

  render(){
    if (this.props.fetchingUser) return (<LoadingMask/>)

    return (
      <section className="dashboard-section">
        <div className="container">
          <div className="row offcanvas offcanvas-right row-margin">
            <div className="col-xs-8 col-sm-4 sidebar-offcanvas" id="sidebar">
              <div className="panel-group dashboard-menu" id="accordion">
                <TutorProfile/>
                <TutorDashboardMenu/>
              </div>
            </div>
            <div className="col-xs-12 col-sm-8 dashboard-content ">
              <switch>
                <Route exact path="/dashboard" component={TutorDashboardIndex}/>
                <Route exact path="/dashboard/courses" component={TutorProfile}/>
              </switch>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const styleComponent = cssModules(TutorDashboard, styles);

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  fetchingUser: state.session.fetchingUser
})

export default connect(mapStateToProps)(styleComponent)