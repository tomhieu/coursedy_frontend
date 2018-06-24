import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorDashboardMenu.module.scss';
import {globalHistory} from "utils/globalHistory";
import UserProfileIcon from "../../Core/Icons/UserProfileIcon";
import SettingIcon from "../../Core/Icons/SettingIcon";
import AddCourseIcon from "../../Core/Icons/AddCourseIcon";
import ActiveCourseListIcon from "../../Core/Icons/ActiveCourseListIcon";
import CourseListIcon from "../../Core/Icons/CourseListIcon";

class TutorDashboardMenu extends Component {
  onClickDashboardLink(urlNavigation, activeTab) {
    // navigate to destination tab
    globalHistory.push(urlNavigation);
  }
  render(){
    const {activatedTab} = this.props;
    return (
      <div className="dashboard-menu-panel">
        <div className="panel panel-default">
          <div className="panel-body">
            <ul className="dashboard-links">
              <li className={activatedTab === 'my_profile' ? styles.dashboardItem + ' ' + styles.active : styles.dashboardItem}>
                {
                  activatedTab === 'my_profile' ? <UserProfileIcon fillColor="#1CABA0"/> : <UserProfileIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/dashboard/profile', 'my_profile')}>{this.context.t('my_profile')}</a>
              </li>
              <li className={activatedTab === 'account_setting' ? styles.dashboardItem + ' ' + styles.active : styles.dashboardItem}>
                {
                  activatedTab === 'account_setting' ? <SettingIcon fillColor="#1CABA0"/> : <SettingIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/dashboard/account', 'account_setting')}>{this.context.t('account_setting')}</a>
              </li>
              <li className={activatedTab === 'course_add' ? styles.dashboardItem + ' ' + styles.active : styles.dashboardItem}>
                {
                  activatedTab === 'course_add' ? <AddCourseIcon fillColor="#1CABA0"/> : <AddCourseIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/dashboard/courses/new', 'course_add')}>{this.context.t('course_add_btn')}</a>
              </li>
              <li className={activatedTab === 'course_active_list' ? styles.dashboardItem + ' ' + styles.active : styles.dashboardItem}>
                {
                  activatedTab === 'course_active_list' ? <ActiveCourseListIcon fillColor="#1CABA0"/> : <ActiveCourseListIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/dashboard/courses/active', 'course_active_list')}>{this.context.t('course_active_list')}</a>
              </li>
              <li className={activatedTab === 'course_list' ? styles.dashboardItem + ' ' + styles.active : styles.dashboardItem}>
                {
                  activatedTab === 'course_list' ? <CourseListIcon fillColor="#1CABA0"/> : <CourseListIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/dashboard/courses/list', 'course_list')}>{this.context.t('course_list')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}


TutorDashboardMenu.contextTypes = {
  t: React.PropTypes.func.isRequired
}


export default cssModules(TutorDashboardMenu, styles);