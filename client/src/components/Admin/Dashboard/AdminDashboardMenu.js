import React, {Component} from 'react'
import "./AdminDashboardMenu.scss"
import UserProfileIcon from "../../Core/Icons/UserProfileIcon";
import SettingIcon from "../../Core/Icons/SettingIcon";
import AddCourseIcon from "../../Core/Icons/AddCourseIcon";
import ActiveCourseListIcon from "../../Core/Icons/ActiveCourseListIcon";
import CourseListIcon from "../../Core/Icons/CourseListIcon";
import { Link } from 'react-router-dom'

class AdminDashboardMenu extends Component {
  onClickDashboardLink(urlNavigation, activeTab) {
    // navigate to destination tab
    globalHistory.push(urlNavigation);
  }

  render(){
    const {activatedTab, signOut} = this.props
    return (
      <div className="dashboard-menu-panel">
        <div className="panel panel-default">
          <div className="panel-body">
            <ul className="dashboard-links">
              <li className={activatedTab === 'my_profile' ? 'dashboard-item active' : 'dashboard-item'}>
                {
                  activatedTab === 'my_profile' ? <UserProfileIcon fillColor="#1CABA0"/> : <UserProfileIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/account', 'my_profile')}>{this.context.t('my_profile')}</a>
              </li>

              <li className={activatedTab === 'admin_courses' ? 'dashboard-item active' : 'dashboard-item'}>
                {
                  activatedTab === 'admin_courses' ? <CourseListIcon fillColor="#1CABA0"/> : <CourseListIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/courses', 'admin_courses')}>{this.context.t('admin_courses')}</a>
              </li>

              <li className={activatedTab === 'admin_teachers' ? 'dashboard-item active' : 'dashboard-item'}>
                {
                  activatedTab === 'admin_teachers' ? <CourseListIcon fillColor="#1CABA0"/> : <CourseListIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/teachers', 'admin_teachers')}>{this.context.t('admin_teachers')}</a>
              </li>

              <li className={activatedTab === 'admin_students' ? 'dashboard-item active' : 'dashboard-item'}>
                {
                  activatedTab === 'admin_students' ? <CourseListIcon fillColor="#1CABA0"/> : <CourseListIcon/>
                }
                <a onClick={this.onClickDashboardLink.bind(this, '/admin/dashboard/students', 'admin_students')}>{this.context.t('admin_students')}</a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    )
  }
}

AdminDashboardMenu.contextTypes = {
  t: React.PropTypes.func.isRequired
}

AdminDashboardMenu.propTypes = {
  signOut: React.PropTypes.func.isRequired
}

export default AdminDashboardMenu