import React, {Component} from 'react';

class TutorDashboardMenu extends Component {
  render(){
    return (
      <div className="dashboard-menu-panel">
        <div className="dashboard-link"><a className="active" href="http://localhost:3000/tutor/index"><i className="fa fa-tachometer"></i>Dashboard</a></div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                <i className="fa fa-calendar-check-o"></i>Bookings		</a>
            </h4>
          </div>
          <div id="collapseOne" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li><a href="http://localhost:3000/student-enquiries">All </a></li>
                <li><a href="http://localhost:3000/student-enquiries/pending">Pending </a></li>
                <li><a href="http://localhost:3000/student-enquiries/approved">Approved </a></li>
                <li><a href="http://localhost:3000/student-enquiries/session_initiated">Session Initiated </a></li>
                <li><a href="http://localhost:3000/student-enquiries/running">Running </a></li>
                <li><a href="http://localhost:3000/student-enquiries/completed">Completed </a></li>
                <li><a href="http://localhost:3000/student-enquiries/called_for_admin_intervention">Claim For Admin Intervention </a></li>
                <li><a href="http://localhost:3000/student-enquiries/closed">Closed </a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseManage">
                <i className="fa fa-cog"></i>Manage
              </a>
            </h4>
          </div>
          <div id="collapseManage" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li><a href="http://localhost:3000/tutor/manage-courses">Courses </a></li>
                <li><a href="http://localhost:3000/tutor/manage-locations">Locations </a></li>
                <li><a href="http://localhost:3000/tutor/manage-teaching-types">Teaching Type</a></li>
                <li><a href="http://localhost:3000/tutor/certificates">Certificates</a></li>
                <li><a href="http://localhost:3000/tutor/manage-privacy">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapsePackages">
                <i className="fa fa-archive"></i>Packages		</a>
            </h4>
          </div>
          <div id="collapsePackages" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li><a href="http://localhost:3000/tutor/list-packages">List Packages </a></li>
                <li><a href="http://localhost:3000/tutor/mysubscriptions">My Subscriptions </a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSellCourses">
                <i className="fa fa-book"></i>Sell Courses Online		</a>
            </h4>
          </div>
          <div id="collapseSellCourses" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li><a href="http://localhost:3000/tutor/sell-courses-online">Publish </a></li>
                <li><a href="http://localhost:3000/tutor/list-selling-courses">List Selling Courses </a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="dashboard-link"><a href="http://localhost:3000/user-reviews"><i className="fa fa-retweet"></i>Reviews</a></div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                <i className="fa fa-user"></i>Account		</a>
            </h4>
          </div>
          <div id="collapseThree" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li><a href="http://localhost:3000/tutor/personal-info">Personnel Information </a></li>
                <li><a href="http://localhost:3000/tutor/profile-information">Profile Information </a></li>
                <li><a href="http://localhost:3000/tutor/experience">Experience </a></li>
                <li><a href="http://localhost:3000/tutor/contact-information">Contact Information</a></li>
                <li><a href="http://localhost:3000/tutor/my-gallery">Gallery</a></li>
                <li><a href="http://localhost:3000/auth/change-password">Change Password</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="dashboard-link"><a href="http://localhost:3000/auth/logout"><i className="fa fa-sign-out"></i>Logout</a></div>
        </div>

      </div>
    )
  }
}

export default TutorDashboardMenu;