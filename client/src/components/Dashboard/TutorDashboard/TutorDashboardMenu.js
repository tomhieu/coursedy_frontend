import React, {Component} from 'react';

class TutorDashboardMenu extends Component {
  render(){
    return (
      <div className="dashboard-menu-panel">
        <div className="dashboard-link"><a className="active" href="http://sudoedu.ca/tutor/index"><i className="fa fa-tachometer"></i>Dashboard</a></div>

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
                <li><a href="http://sudoedu.ca/student-enquiries">All </a></li>
                <li><a href="http://sudoedu.ca/student-enquiries/pending">Pending </a></li>
                <li><a href="http://sudoedu.ca/student-enquiries/approved">Approved </a></li>
                <li><a href="http://sudoedu.ca/student-enquiries/session_initiated">Session Initiated </a></li>
                <li><a href="http://sudoedu.ca/student-enquiries/running">Running </a></li>
                <li><a href="http://sudoedu.ca/student-enquiries/completed">Completed </a></li>
                <li><a href="http://sudoedu.ca/student-enquiries/called_for_admin_intervention">Claim For Admin Intervention </a></li>
                <li><a href="http://sudoedu.ca/student-enquiries/closed">Closed </a></li>
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
                <li><a href="http://sudoedu.ca/tutor/manage-courses">Courses </a></li>
                <li><a href="http://sudoedu.ca/tutor/manage-locations">Locations </a></li>
                <li><a href="http://sudoedu.ca/tutor/manage-teaching-types">Teaching Type</a></li>
                <li><a href="http://sudoedu.ca/tutor/certificates">Certificates</a></li>
                <li><a href="http://sudoedu.ca/tutor/manage-privacy">Privacy</a></li>
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
                <li><a href="http://sudoedu.ca/tutor/list-packages">List Packages </a></li>
                <li><a href="http://sudoedu.ca/tutor/mysubscriptions">My Subscriptions </a></li>
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
                <li><a href="http://sudoedu.ca/tutor/sell-courses-online">Publish </a></li>
                <li><a href="http://sudoedu.ca/tutor/list-selling-courses">List Selling Courses </a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="dashboard-link"><a href="http://sudoedu.ca/tutor/purchased-courses"><i className="fa fa-money"></i>Purchased Courses</a></div>


        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseReqs">
                <i className="fa fa-money"></i>Credit Conversion<span className="hidden-xs"> Request </span>
              </a>
            </h4>
          </div>
          <div id="collapseReqs" className="panel-collapse collapse">
            <div className="panel-body">
              <ul className="dashboard-links">
                <li><a href="http://sudoedu.ca/credit-conversion-requests/Pending">Pending </a></li>
                <li><a href="http://sudoedu.ca/credit-conversion-requests/Done">Done </a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="dashboard-link"><a href="http://sudoedu.ca/tutor/credits-transactions-history"><i className="fa fa-exchange"></i>Credits Transactions<span className="hidden-xs"> History </span></a></div>

        <div className="dashboard-link"><a href="http://sudoedu.ca/user-reviews"><i className="fa fa-retweet"></i>Reviews</a></div>
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
                <li><a href="http://sudoedu.ca/tutor/personal-info">Personnel Information </a></li>
                <li><a href="http://sudoedu.ca/tutor/profile-information">Profile Information </a></li>
                <li><a href="http://sudoedu.ca/tutor/experience">Experience </a></li>
                <li><a href="http://sudoedu.ca/tutor/contact-information">Contact Information</a></li>
                <li><a href="http://sudoedu.ca/tutor/my-gallery">Gallery</a></li>
                <li><a href="http://sudoedu.ca/auth/change-password">Change Password</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="dashboard-link"><a href="http://sudoedu.ca/auth/logout"><i className="fa fa-sign-out"></i>Logout</a></div>
        </div>

      </div>
    )
  }
}

export default TutorDashboardMenu;