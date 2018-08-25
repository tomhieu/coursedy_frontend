import React from 'react'
import './AdminDashboardPage.scss'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import {AdminComponents, RoleAuthorization,} from '../../../components/index';
import {AdminContainers} from '../../../containers/'
import * as sessionActions from '../../../actions/SessionActionCreator'
import * as WebConstants from '../../../constants/WebConstants.js'
import {TT} from "../../../utils/locale";

class AdminDashboardPage extends RoleAuthorization {
  componentDidMount() {
    this.props.showDashboardHeader();
  }

  componentWillUnmount() {
    this.props.closeDashboardHeader();
  }
  signOut(e) {
    e.preventDefault()
    this.props.signOut()
  }

  render() {
    const {currentUser, isCollapseDashboard} = this.props;
    let dashboardMenuClasses = "panel-group dashboard-menu";
    let dashboardContentClasses = "d-flex flex-column flex-auto dashboard-content";
    let dashboardFooterClasses = "dashboard-footer d-flex justify-content-center";
    let leftMenuClasses = ["left-panel"];
    if (isCollapseDashboard) {
      dashboardMenuClasses += " collapsed";
      leftMenuClasses.push("collapsed");
      dashboardContentClasses += " expanded";
      dashboardFooterClasses += " expanded";
    }
    return (
      <div className="dashboard-section full-width-in-container">
        <div className="d-flex flex-row flex-auto">
          <div className={leftMenuClasses.join(" ")} id="sidebar">
            <div className={dashboardMenuClasses} id="accordion">
              <AdminContainers.DashboardProfileContainer/>
              <AdminComponents.AdminDashboardMenu {...this.props}/>
            </div>
          </div>
          <div className={dashboardContentClasses}>
            <div className="full-width daskboard-container container">
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
                <Route exact path="/admin/dashboard/payment-methods"
                  component={AdminContainers.PaymentMethodsContainer}
                />
                <Route exact path="/admin/dashboard/payment-history"
                  component={AdminContainers.PaymentHistoryContainer}
                />
              </switch>
            </div>
            <div className={dashboardFooterClasses}>
              <span className="coursedy-copyright">{TT.t('product_copyright')}</span>
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
  activatedTab: state.DashboardMenu.activatedTab,
  isCollapseDashboard: state.DashboardMenu.isCollapseDashboard
})

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(sessionActions.signOutUser()),
  showDashboardHeader: () => dispatch({ type: WebConstants.SHOW_DARKBOARD_HEADER }),
  closeDashboardHeader: () => dispatch({ type: WebConstants.CLOSE_DARKBOARD_HEADER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardPage)