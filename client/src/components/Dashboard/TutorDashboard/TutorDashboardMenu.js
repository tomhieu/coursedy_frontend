import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { globalHistory } from 'utils/globalHistory';
import { UserRole } from 'constants/UserRole';
import styles from './TutorDashboardMenu.module.scss';
import UserProfileIcon from '../../Core/Icons/UserProfileIcon';
import SettingIcon from '../../Core/Icons/SettingIcon';
import AddCourseIcon from '../../Core/Icons/AddCourseIcon';
import ActiveCourseListIcon from '../../Core/Icons/ActiveCourseListIcon';
import CourseListIcon from '../../Core/Icons/CourseListIcon';

class TutorDashboardMenu extends Component {
  onClickDashboardLink(urlNavigation, activeTab) {
    // navigate to destination tab
    globalHistory.push(urlNavigation);
  }

  onOpenMultipleTab(activeTab) {
    this.props.activateTab(activeTab);
  }

  render() {
    const { activatedTab, isApproved } = this.props;

    const isActiveCourseTab = ['course_add', 'course_list', 'course_active_list', 'course_management'].indexOf(activatedTab) >= 0;

    const dashboardItemClasses = [styles.dashboardItem, 'dashbard-item-container'];
    const activeDashboardItemClasses = [styles.dashboardItem, 'dashbard-item-container', styles.active];
    let multipleDashboardItemClasses = 'd-flex flex-row justify-content-center align-items-center dashboard-parent-tab ';

    if (!isActiveCourseTab) {
      multipleDashboardItemClasses += 'collapsed';
    }

    return (
      <div className="dashboard-menu-panel">
        <div className="panel panel-default">
          <div className="panel-body">
            <ul className="dashboard-links">
              <li
                className={activatedTab === 'my_profile' ? activeDashboardItemClasses.join(' ') : dashboardItemClasses.join(' ')}
                onClick={this.onClickDashboardLink.bind(this, '/dashboard/profile', 'my_profile')}
              >
                {
                  activatedTab === 'my_profile' ? <UserProfileIcon fillColor="#1CABA0" /> : <UserProfileIcon fillColor="#444444" />
                }
                <a className={`${styles.itemName} dashboard-item-name`}>{this.context.t('my_profile')}</a>
              </li>
              <li
                className={activatedTab === 'account_setting' ? activeDashboardItemClasses.join(' ') : dashboardItemClasses.join(' ')}
                onClick={this.onClickDashboardLink.bind(this, '/dashboard/account', 'account_setting')}
              >
                {
                  activatedTab === 'account_setting' ? <SettingIcon fillColor="#1CABA0" /> : <SettingIcon fillColor="#444444" />
                }
                <a className={`${styles.itemName} dashboard-item-name`}>{this.context.t('account_setting')}</a>
              </li>
              {
                isApproved ?
                  <li
                    className={isActiveCourseTab ? activeDashboardItemClasses.join(' ') : dashboardItemClasses.join(' ')}
                    onClick={this.onOpenMultipleTab.bind(this, 'course_management')}
                  >
                    <div className="d-flex flex-column flex-auto">
                      <div className={multipleDashboardItemClasses} data-toggle="collapse" data-target="#courseChildTab" aria-expanded="true">
                        {
                          isActiveCourseTab ? <CourseListIcon fillColor="#1CABA0" /> : <CourseListIcon fillColor="#444444" />
                        }
                        <a className={`${styles.itemName} dashboard-item-name`}>{this.context.t('course_management')}</a>
                      </div>
                      <ul
                        id="courseChildTab"
                        className={isActiveCourseTab ? 'collapse sub-dashboard-item show' : 'sub-dashboard-item collapse'}
                        aria-labelledby="courseChildTab"
                        data-parent="#accordion"
                      >
                        <li
                          className={activatedTab === 'course_list' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                          onClick={this.onClickDashboardLink.bind(this, '/dashboard/courses/list', 'course_list')}
                        >
                          <a className={styles.itemName}>{this.context.t('course_list')}</a>
                        </li>
                        <li
                          className={activatedTab === 'course_active_list' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                          onClick={this.onClickDashboardLink.bind(this, '/dashboard/courses/active', 'course_active_list')}
                        >
                          <a className={styles.itemName}>{this.context.t('course_active_list')}</a>
                        </li>
                        <li
                          className={activatedTab === 'course_add' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                          onClick={this.onClickDashboardLink.bind(this, '/dashboard/courses/new', 'course_add')}
                        >
                          <a className={styles.itemName}>{this.context.t('course_add_btn')}</a>
                        </li>
                      </ul>
                    </div>
                  </li> : null
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


TutorDashboardMenu.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorDashboardMenu.propTypes = {
  activatedTab: React.PropTypes.string,
  isApproved: React.PropTypes.bool
};



export default cssModules(TutorDashboardMenu, styles);
