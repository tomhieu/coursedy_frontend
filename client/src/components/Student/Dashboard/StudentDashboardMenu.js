import React, {Component} from 'react'
import cssModules from 'react-css-modules';
import styles from './StudentDashboardMenu.module.scss';
import {globalHistory} from "utils/globalHistory";
import UserProfileIcon from "../../Core/Icons/UserProfileIcon";
import ActiveCourseListIcon from "../../Core/Icons/ActiveCourseListIcon";
import CourseListIcon from "../../Core/Icons/CourseListIcon";

class StudentDashboardMenu extends Component {
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
                <a onClick={this.onClickDashboardLink.bind(this, '/student/dashboard/profile', 'my_profile')}>{this.context.t('my_profile')}</a>
              </li>
              <li className={activatedTab === 'enrolled_course_list' ? styles.dashboardItem + ' ' + styles.active : styles.dashboardItem}>
                {
                  activatedTab === 'enrolled_course_list' ? <CourseListIcon fillColor="#1CABA0"/> : <CourseListIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/student/dashboard/courses/enrolled', 'enrolled_course_list')}>{this.context.t('enrolled_courses')}</a>
              </li>
              <li className={activatedTab === 'enrolling_course_list' ? styles.dashboardItem + ' ' + styles.active : styles.dashboardItem}>
                {
                  activatedTab === 'enrolling_course_list' ? <ActiveCourseListIcon fillColor="#1CABA0"/> : <ActiveCourseListIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/student/dashboard/courses/enrolling', 'enrolling_course_list')}>{this.context.t('enrolling_courses')}</a>
              </li>
              <li className={activatedTab === 'following_course_list' ? styles.dashboardItem + ' ' + styles.active : styles.dashboardItem}>
                {
                  activatedTab === 'following_course_list' ? <ActiveCourseListIcon fillColor="#1CABA0"/> : <ActiveCourseListIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/student/dashboard/courses/follow', 'following_course_list')}>{this.context.t('followed_courses')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

StudentDashboardMenu.contextTypes = {
  t: React.PropTypes.func.isRequired
}

StudentDashboardMenu.propTypes = {
  signOut: React.PropTypes.func.isRequired
}

export default cssModules(StudentDashboardMenu, styles);