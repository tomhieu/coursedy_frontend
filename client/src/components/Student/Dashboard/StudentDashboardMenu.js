import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { globalHistory } from 'utils/globalHistory';
import styles from './StudentDashboardMenu.module.scss';
import UserProfileIcon from '../../Core/Icons/UserProfileIcon';
import ActiveCourseListIcon from '../../Core/Icons/ActiveCourseListIcon';
import CourseHistoryIcon from '../../Core/Icons/CourseHistoryIcon';
import CourseFollowIcon from '../../Core/Icons/CourseFollowIcon';

class StudentDashboardMenu extends Component {
  onClickDashboardLink(urlNavigation, activeTab) {
    // navigate to destination tab
    globalHistory.push(urlNavigation);
  }

  render() {
    const { activatedTab } = this.props;

    return (
      <div className="dashboard-menu-panel">
        <div className="panel panel-default">
          <div className="panel-body">
            <ul className="dashboard-links">
              <li
                className={activatedTab === 'my_profile' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                onClick={this.onClickDashboardLink.bind(this, '/student/dashboard/profile', 'my_profile')}
              >
                {
                  activatedTab === 'my_profile' ? <UserProfileIcon fillColor="#1CABA0" /> : <UserProfileIcon />
                }
                <a className={styles.itemName}>{this.context.t('my_profile')}</a>
              </li>
              <li
                className={activatedTab === 'enrolled_course_list' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                onClick={this.onClickDashboardLink.bind(this, '/student/dashboard/courses/enrolled', 'enrolled_course_list')}
              >
                {
                  activatedTab === 'enrolled_course_list' ? <CourseHistoryIcon fillColor="#1CABA0" /> : <CourseHistoryIcon />
                }
                <a className={styles.itemName}>{this.context.t('enrolled_courses')}</a>
              </li>
              <li
                className={activatedTab === 'enrolling_course_list' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                onClick={this.onClickDashboardLink.bind(this, '/student/dashboard/courses/enrolling', 'enrolling_course_list')}
              >
                {
                  activatedTab === 'enrolling_course_list' ? <ActiveCourseListIcon fillColor="#1CABA0" /> : <ActiveCourseListIcon />
                }
                <a className={styles.itemName}>{this.context.t('enrolling_courses')}</a>
              </li>
              <li
                className={activatedTab === 'following_course_list' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                onClick={this.onClickDashboardLink.bind(this, '/student/dashboard/courses/follow', 'following_course_list')}
              >
                {
                  activatedTab === 'following_course_list' ? <CourseFollowIcon fillColor="#1CABA0" /> : <CourseFollowIcon />
                }
                <a className={styles.itemName}>{this.context.t('followed_courses')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

StudentDashboardMenu.contextTypes = {
  t: React.PropTypes.func.isRequired
};

StudentDashboardMenu.propTypes = {
  signOut: React.PropTypes.func.isRequired
};

export default cssModules(StudentDashboardMenu, styles);
