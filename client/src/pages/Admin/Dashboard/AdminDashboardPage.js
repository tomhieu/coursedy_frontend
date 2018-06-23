import React from 'react'
import './AdminDashboardPage.scss'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import {
  RoleAuthorization, 
  AdminComponents,
} from '../../../components/index';
import {
  AdminContainers
} from '../../../containers/'
import * as sessionActions from '../../../actions/SessionActionCreator'
class AdminDashboardPage extends RoleAuthorization {

  signOut(e) {
    e.preventDefault()
    this.props.dispatch(sessionActions.signOutUser())
  }

  render() {

    return (
      <div className="dashboard-section">
        <div className="row flex-auto">
          <div className="col-xs-12 col-sm-3 left-panel" id="sidebar">
            <div className="panel-group dashboard-menu" id="accordion">
              <AdminContainers.DashboardProfileContainer/>
              <AdminComponents.AdminDashboardMenu signOut={this.signOut.bind(this)}/>
            </div>
          </div>
          <div className="col-xs-12 col-sm-9 d-flex dashboard-content">
            <div className="full-width daskboard-container">
              <switch>
                <Route exact path="/admin/dashboard/account" 
                  component={AdminContainers.AccountProfileContainer}
                />
                <Route exact path="/admin/dashboard/courses" 
                  component={AdminContainers.CourseListContainer}
                />
                <Route exact path="/admin/dashboard/teachers"
                  component={AdminContainers.TeacherListContainer}
                />
                <Route exact path="/admin/dashboard/students"
                  component={AdminContainers.StudentListContainer}
                />
              </switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  fetchingUser: state.session.fetchingUser
})

export default connect(mapStateToProps)(AdminDashboardPage)