import React, {Component} from 'react'

class StudentDashboardIndex extends Component {
  render(){
    return (
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
              <h2>26<a className="pull-right" href="http://localhost:3000/student-enquiries">View</a></h2>
              <p>Total Bookings</p>
            </div>
          </div>

          <div className="col-md-4 pad10">
            <div className="dash-block d-block3">
              <h2>4<a className="pull-right" href="http://localhost:3000/student-enquiries/pending">View</a></h2>
              <p>Bookings Pending</p>
            </div>
          </div>

          <div className="col-md-4 pad10">
            <div className="dash-block d-block4">
              <h2>2<a className="pull-right" href="http://localhost:3000/student-enquiries/completed">View</a></h2>
              <p>Booking Completd</p>
            </div>
          </div>

          <div className="col-md-4 pad10">
            <div className="dash-block d-block5">
              <h2>3<a className="pull-right" href="http://localhost:3000/student-enquiries/running">View</a></h2>
              <p>Booking Running</p>
            </div>
          </div>

          <div className="col-md-4 pad10">
            <div className="dash-block d-block6">
              <h2>17<a className="pull-right" href="http://localhost:3000/tutor/manage-courses">View</a></h2>
              <p>Total Tutoring Courses</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentDashboardIndex