import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class AdminDashboardMenu extends Component {

  render(){
    const {signOut} = this.props
    return (
      <div className="dashboard-menu-panel">

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#student-dashboard-account-menu">
                <i className="fa fa-calendar-check-o"></i>{this.context.t('my_account')}</a>
            </h4>
          </div>
          <div id="student-dashboard-account-menu" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li>
                  <Link to={'/admin/dashboard/account'}>{this.context.t('my_profile')}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#admin-dashboard-courses-menu">
                <i className="fa fa-calendar-check-o"></i>{this.context.t('admin_courses')}</a>
            </h4>
          </div>
          <div id="admin-dashboard-courses-menu" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li><Link to={'/admin/dashboard/courses'}>{this.context.t('admin_courses_list')}</Link></li>               
                <li><Link to={'#'}>{this.context.t('admin_courses_new')}</Link></li>               
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#admin-dashboard-teachers-menu">
                <i className="fa fa-calendar-check-o"></i>{this.context.t('admin_teachers')}</a>
            </h4>
          </div>
          <div id="admin-dashboard-teachers-menu" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li><Link to={'/admin/dashboard/teachers'}>{this.context.t('admin_teachers_list')}</Link></li>               
                <li><Link to={'#'}>{this.context.t('admin_teachers_new')}</Link></li>               
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#admin-dashboard-students-menu">
                <i className="fa fa-calendar-check-o"></i>{this.context.t('admin_students')}</a>
            </h4>
          </div>
          <div id="admin-dashboard-students-menu" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li><Link to={'/admin/dashboard/students'}>{this.context.t('admin_students_list')}</Link></li>               
                <li><Link to={'#'}>{this.context.t('admin_students_new')}</Link></li>               
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="dashboard-link">
            <Link onClick={signOut} to={'#'}>
              <i className="fa fa-sign-out"></i>{this.context.t('signout')}
            </Link>
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