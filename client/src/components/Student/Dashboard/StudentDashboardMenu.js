import React, {Component} from 'react'
import { Link } from 'react-router-dom'
class StudentDashboardMenu extends Component {
  render(){
    return (
      <div className="dashboard-menu-panel">
        <div className="dashboard-link">
          <Link to={'/student/dashboard'} className="active">
            <i className="fa fa-tachometer"></i>Dashboard
          </Link>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#student-dashboard-menu">
                <i className="fa fa-calendar-check-o"></i>My Account</a>
            </h4>
          </div>
          <div id="student-dashboard-menu" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li>
                  <Link to={'/student/dashboard/account/profile'}>My Profile</Link>
                </li>
                <li>
                  <Link to={'/student/dashboard/account/balance'}>My Balance</Link>
                </li>                
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#student-dashboard-menu">
                <i className="fa fa-calendar-check-o"></i>Courses</a>
            </h4>
          </div>
          <div id="student-dashboard-menu" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li>
                  <Link to={'/student/dashboard/courses/enroll'}>Enroll</Link>
                </li>
                <li>
                  <Link to={'/student/dashboard/courses/follow'}>Followed</Link>
                </li>                
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="dashboard-link">
            <Link to={'#'}>
              <i className="fa fa-sign-out"></i>Logout
            </Link>
          </div>
        </div>

      </div>
    )
  }
}

export default StudentDashboardMenu