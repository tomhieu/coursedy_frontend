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
import * as dashboardActions from '../../../actions/DashboardMenuActionCreator'
import * as sessionActions from '../../../actions/SessionActionCreator'
import * as WebConstants from '../../../constants/WebConstants.js'

class AdminDashboardPage extends RoleAuthorization {
  componentDidMount() {
    this.props.hideFooter();
  }

  componentWillUnmount() {
    this.props.showFooter();
  }
  signOut(e) {
    e.preventDefault()
    this.props.signOut()
  }

  render() {
    return (
      <div className="dashboard-section full-width-in-container">
        <div className="d-flex flex-row flex-auto">
          <div className="left-panel" id="sidebar">
            <div className="panel-group dashboard-menu" id="accordion">
              <AdminContainers.DashboardProfileContainer/>
              <AdminComponents.AdminDashboardMenu {...this.props}/>
            </div>
          </div>
          <div className="d-flex flex-auto dashboard-content">
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
  fetchingUser: state.session.fetchingUser,
  activatedTab: state.DashboardMenu.activatedTab
})

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(sessionActions.signOutUser()),
  showFooter: () => dispatch({ type: WebConstants.SHOW_FOOTER }),
  hideFooter: () => dispatch({ type: WebConstants.HIDE_FOOTER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardPage)