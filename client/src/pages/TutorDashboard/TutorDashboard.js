import React from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorDashboard.module.scss';
import {TutorProfile} from '../../components/index'

const TutorDashboard = (props) => (
  <section className="dashboard-section">
    <div className="container">
      <div className="row offcanvas offcanvas-right row-margin">
        <div className="col-xs-8 col-sm-4 sidebar-offcanvas" id="sidebar">
          <div className="panel-group dashboard-menu" id="accordion">
            <TutorProfile/>
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
          </div>
        </div>
        <div className="col-xs-12 col-sm-8 dashboard-content ">
          <div className="dashboard-panel">
            <div className="row">

              <div className="col-md-4 pad10">
                <div className="dash-block d-block1">
                  <h2>6856</h2>
                  <p>Net Credits</p>
                </div>
              </div>

              <div className="col-md-4 pad10">
                <div className="dash-block d-block2">
                  <h2>26<a className="pull-right" href="http://sudoedu.ca/student-enquiries">View</a></h2>
                  <p>Total Bookings</p>
                </div>
              </div>

              <div className="col-md-4 pad10">
                <div className="dash-block d-block3">
                  <h2>4<a className="pull-right" href="http://sudoedu.ca/student-enquiries/pending">View</a></h2>
                  <p>Bookings Pending</p>
                </div>
              </div>

              <div className="col-md-4 pad10">
                <div className="dash-block d-block4">
                  <h2>2<a className="pull-right" href="http://sudoedu.ca/student-enquiries/completed">View</a></h2>
                  <p>Booking Completd</p>
                </div>
              </div>

              <div className="col-md-4 pad10">
                <div className="dash-block d-block5">
                  <h2>3<a className="pull-right" href="http://sudoedu.ca/student-enquiries/running">View</a></h2>
                  <p>Booking Running</p>
                </div>
              </div>

              <div className="col-md-4 pad10">
                <div className="dash-block d-block6">
                  <h2>17<a className="pull-right" href="http://sudoedu.ca/tutor/manage-courses">View</a></h2>
                  <p>Total Tutoring Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default cssModules(TutorDashboard, styles);
