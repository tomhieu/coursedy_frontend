import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class TutorDashboardMenu extends Component {

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
                  <Link to={'/dashboard/account'}>{this.context.t('my_profile')}</Link>
                </li>
                <li>
                  <Link to={'/dashboard/profile'}>{this.context.t('account_setting')}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSellCourses">
                <i className="fa fa-book"></i>{this.context.t('my_courses')}</a>
            </h4>
          </div>
          <div id="collapseSellCourses" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li>
                  <Link to={'/dashboard/courses/new'}>{this.context.t('course_add_btn')}</Link>
                </li>
                <li>
                  <Link to={'/dashboard/courses/active'}>{this.context.t('course_active_list')}</Link>
                </li>
                <li>
                  <Link to={'/dashboard/courses/list'}>{this.context.t('course_list')}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


TutorDashboardMenu.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorDashboardMenu.propTypes = {
}


export default TutorDashboardMenu;