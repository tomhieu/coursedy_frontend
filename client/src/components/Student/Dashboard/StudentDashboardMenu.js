import React, {Component} from 'react'
import { Link } from 'react-router-dom'
class StudentDashboardMenu extends Component {
  render(){
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
                  <Link to={'/student/dashboard/account/profile'}>{this.context.t('my_profile')}</Link>
                </li>
                <li>
                  <Link to={'/student/dashboard/account/balance'}>{this.context.t('my_balance')}</Link>
                </li>                
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#student-dashboard-courses-menu">
                <i className="fa fa-calendar-check-o"></i>{this.context.t('my_courses')}</a>
            </h4>
          </div>
          <div id="student-dashboard-courses-menu" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li>
                  <Link to={'/student/dashboard/courses/enrolled'}>{this.context.t('enrolled_courses')}</Link>
                </li>
                <li>
                  <Link to={'/student/dashboard/courses/enrolling'}>{this.context.t('enrolling_courses')}</Link>
                </li>
                <li>
                  <Link to={'/student/dashboard/courses/follow'}>{this.context.t('followed_courses')}</Link>
                </li>                
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="dashboard-link">
            <Link to={'#'}>
              <i className="fa fa-sign-out"></i>{this.context.t('signout')}
            </Link>
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
}

export default StudentDashboardMenu