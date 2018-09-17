import React from 'react';
import cssModules from 'react-css-modules';
import {connect} from 'react-redux';
import {TT} from 'utils/locale';
import {TutorContainers} from 'containers/index';
import {RoleAuthorization, TutorDashboardMenu} from 'components/index';
import * as sessionActions from 'actions/SessionActionCreator';
import * as dashboardActions from 'actions/DashboardMenuActionCreator';
import * as WebConstants from 'constants/WebConstants';
import styles from './TutorDashboard.module.scss';
import {TutorStatus} from '../../constants/TutorStatus';

class TutorDashboard extends RoleAuthorization {
  componentDidMount() {
    this.props.showDashboardHeader();
  }

  componentWillUnmount() {
    this.props.closeDashboardHeader();
  }

  render() {
    const { isCollapseDashboard, tutor } = this.props;
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

    const isApproved = tutor.status === TutorStatus.VERIFIED;

    return (
      <div className="dashboard-section">
        <div className="d-flex flex-row flex-auto">
          <div className={leftMenuClasses.join(' ')} id="sidebar">
            <div className={dashboardMenuClasses} id="accordion">
              <TutorContainers.DashboardProfileContainer />
              <TutorDashboardMenu isApproved={isApproved} {...this.props} />
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

const styleComponent = cssModules(TutorDashboard, styles);

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  fetchingUser: state.session.fetchingUser,
  activatedTab: state.DashboardMenu.activatedTab,
  isCollapseDashboard: state.DashboardMenu.isCollapseDashboard,
  tutor: state.TutorAccountReducer.tutor
});

const mapDispatchToProps = dispatch => ({
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId)),
  signOut: () => dispatch(sessionActions.signOutUser()),
  showDashboardHeader: () => dispatch({ type: WebConstants.SHOW_DARKBOARD_HEADER }),
  closeDashboardHeader: () => dispatch({ type: WebConstants.CLOSE_DARKBOARD_HEADER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(styleComponent);
