import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { globalHistory } from 'utils/globalHistory';
import styles from './AdminDashboardMenu.module.scss';
import UserProfileIcon from '../../Core/Icons/UserProfileIcon';
import SettingIcon from '../../Core/Icons/SettingIcon';
import AddCourseIcon from '../../Core/Icons/AddCourseIcon';
import ActiveCourseListIcon from '../../Core/Icons/ActiveCourseListIcon';
import CourseListIcon from '../../Core/Icons/CourseListIcon';

class AdminDashboardMenu extends Component {
  onClickDashboardLink(urlNavigation, activeTab) {
    // navigate to destination tab
    globalHistory.push(urlNavigation);
  }

  render() {
    const { activatedTab } = this.props;

    const isActiveCourseTab = ['admin_courses', 'admin_courses_list', 'admin_courses_new', 'admin_course_edit'].indexOf(activatedTab) >= 0;
    const isActiveTeacherTab = ['admin_teachers', 'admin_teachers_list', 'admin_teachers_new', 'admin_teacher_edit'].indexOf(activatedTab) >= 0;
    const isActiveStudentTab = ['admin_students', 'admin_students_list', 'admin_students_new', 'admin_student_edit'].indexOf(activatedTab) >= 0;


    const dashboardItemClasses = [styles.dashboardItem, 'dashbard-item-container'];
    const activeDashboardItemClasses = [styles.dashboardItem, 'dashbard-item-container', styles.active];
    const multipleDashboardItemClasses = 'd-flex flex-row justify-content-center align-items-center dashboard-parent-tab ';
    const multipleDashboardItemCollapsedClasses = 'd-flex flex-row justify-content-center align-items-center dashboard-parent-tab collapsed';

    return (
      <div className="dashboard-menu-panel">
        <div className="panel panel-default">
          <div className="panel-body">
            <ul className="dashboard-links">
              <li className={activatedTab === 'my_profile' ? activeDashboardItemClasses.join(' ') : dashboardItemClasses.join(' ')}>
                {
                  activatedTab === 'my_profile' ? <UserProfileIcon fillColor="#1CABA0" /> : <UserProfileIcon fillColor="#444444" />
                }
                <a className={`${styles.itemName} dashboard-item-name`} onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/account', 'my_profile')}>{this.context.t('my_profile')}</a>
              </li>

              <li className={isActiveCourseTab ? activeDashboardItemClasses.join(' ') : dashboardItemClasses.join(' ')}>
                <div className="d-flex flex-column flex-auto">
                  <div
                    className={isActiveCourseTab ? multipleDashboardItemClasses : multipleDashboardItemCollapsedClasses}
                    data-toggle="collapse"
                    data-target="#courseChildTab"
                    aria-expanded="true"
                  >
                    {
                      activatedTab === 'admin_courses' ? <CourseListIcon fillColor="#1CABA0" /> : <CourseListIcon fillColor="#444444" />
                    }
                    <a className={`${styles.itemName} dashboard-item-name`} onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/courses', 'admin_courses')}>{this.context.t('admin_courses')}</a>
                  </div>
                  <ul
                    id="courseChildTab"
                    className={isActiveCourseTab ? 'collapse sub-dashboard-item show' : 'sub-dashboard-item collapse'}
                    aria-labelledby="courseChildTab"
                    data-parent="#accordion"
                  >
                    <li
                      className={activatedTab === 'admin_courses_list' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                      onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/courses/list', 'admin_courses_list')}
                    >
                      <a className={styles.itemName}>{this.context.t('admin_courses_list')}</a>
                    </li>
                    <li
                      className={activatedTab === 'admin_courses_new' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                      onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/courses/new', 'admin_courses_new')}
                    >
                      <a className={styles.itemName}>{this.context.t('admin_courses_new')}</a>
                    </li>
                    <li className={activatedTab === 'admin_course_edit' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}>
                      <a className={styles.itemName}>{this.context.t('admin_course_edit')}</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className={isActiveTeacherTab ? activeDashboardItemClasses.join(' ') : dashboardItemClasses.join(' ')}>
                <div className="d-flex flex-column flex-auto">
                  <div
                    className={isActiveTeacherTab ? multipleDashboardItemClasses : multipleDashboardItemCollapsedClasses}
                    data-toggle="collapse"
                    data-target="#teacherChildTab"
                    aria-expanded="true"
                  >
                    {
                      activatedTab === 'admin_teachers' ? <CourseListIcon fillColor="#1CABA0" /> : <CourseListIcon fillColor="#444444" />
                    }
                    <a className={`${styles.itemName} dashboard-item-name`} onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/teachers', 'admin_teachers')}>{this.context.t('admin_teachers')}</a>
                  </div>
                  <ul
                    id="teacherChildTab"
                    className={isActiveTeacherTab ? 'collapse sub-dashboard-item show' : 'sub-dashboard-item collapse'}
                    aria-labelledby="courseChildTab"
                    data-parent="#accordion"
                  >
                    <li
                      className={activatedTab === 'admin_teachers_list' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                      onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/courses/list', 'admin_courses_list')}
                    >
                      <a className={styles.itemName}>{this.context.t('admin_teachers_list')}</a>
                    </li>
                    <li
                      className={activatedTab === 'admin_teachers_new' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                      onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/courses/new', 'admin_courses_new')}
                    >
                      <a className={styles.itemName}>{this.context.t('admin_teachers_new')}</a>
                    </li>
                    <li className={activatedTab === 'admin_teachers_edit' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}>
                      <a className={styles.itemName}>{this.context.t('admin_teachers_edit')}</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className={isActiveStudentTab ? activeDashboardItemClasses.join(' ') : dashboardItemClasses.join(' ')}>
                <div className="d-flex flex-column flex-auto">
                  <div
                    className={isActiveStudentTab ? multipleDashboardItemClasses : multipleDashboardItemCollapsedClasses}
                    data-toggle="collapse"
                    data-target="#studentChildTab"
                    aria-expanded="true"
                  >
                    {
                      activatedTab === 'admin_students' ? <CourseListIcon fillColor="#1CABA0" /> : <CourseListIcon fillColor="#444444" />
                    }
                    <a className={`${styles.itemName} dashboard-item-name`} onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/students', 'admin_students')}>{this.context.t('admin_students')}</a>
                  </div>
                  <ul
                    id="studentChildTab"
                    className={isActiveStudentTab ? 'collapse sub-dashboard-item show' : 'sub-dashboard-item collapse'}
                    aria-labelledby="courseChildTab"
                    data-parent="#accordion"
                  >
                    <li
                      className={activatedTab === 'admin_courses_list' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                      onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/courses/list', 'admin_students_list')}
                    >
                      <a className={styles.itemName}>{this.context.t('admin_students_list')}</a>
                    </li>
                    <li
                      className={activatedTab === 'admin_courses_new' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}
                      onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/courses/new', 'admin_students_new')}
                    >
                      <a className={styles.itemName}>{this.context.t('admin_students_new')}</a>
                    </li>
                    <li className={activatedTab === 'admin_student_edit' ? `${styles.dashboardItem} ${styles.active}` : styles.dashboardItem}>
                      <a className={styles.itemName}>{this.context.t('admin_student_edit')}</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className={activatedTab === 'admin_payment_methods' ? activeDashboardItemClasses.join(' ') : dashboardItemClasses.join(' ')}>
                {
                  activatedTab === 'admin_payment_methods' ? <CourseListIcon fillColor="#1CABA0" /> : <CourseListIcon fillColor="#444444" />
                }
                <a className={`${styles.itemName} dashboard-item-name`} onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/payment-methods', 'admin_payment_methods')}>{this.context.t('admin_payment_methods')}</a>
              </li>

              <li className={activatedTab === 'admin_payment_history' ? activeDashboardItemClasses.join(' ') : dashboardItemClasses.join(' ')}>
                {
                  activatedTab === 'admin_payment_history' ? <CourseListIcon fillColor="#1CABA0" /> : <CourseListIcon fillColor="#444444" />
                }
                <a className={`${styles.itemName} dashboard-item-name`} onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/payment-history', 'admin_payment_history')}>{this.context.t('admin_payment_history')}</a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    );
  }
}

AdminDashboardMenu.contextTypes = {
  t: React.PropTypes.func.isRequired
};

AdminDashboardMenu.propTypes = {
  signOut: React.PropTypes.func.isRequired
};

export default cssModules(AdminDashboardMenu, styles);
