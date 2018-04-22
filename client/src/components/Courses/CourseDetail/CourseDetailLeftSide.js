import React, { Component } from 'react'
import './CourseDetailLeftSide.scss'

class CourseDetailLeftSide extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-4 col-md-3 hidden-xs">
        <aside className="sidebar-wrapper">
          <div className="scrollspy-sidebar alt-style-01 affix-top">
            <ul className="scrollspy-sidenav">
              <li className="sidebar-heading"><h5>Course Menu</h5></li>
              <li className="">
                <ul className="course-detail-left-nav">
                  <li className=""><a href="#course-detail-section-0" className="anchor">Course Introduction</a></li>
                  <li className=""><a href="#course-detail-section-1" className="anchor">Course Lession</a></li>
                  <li className=""><a href="#course-detail-section-2" className="anchor">About Teacher</a></li>
                  <li className=""><a href="#course-detail-section-3" className="anchor">Review</a></li>
                  <li className=""><a href="#course-detail-section-4" className="anchor">Related Courses</a></li>
                </ul>
              </li>
            </ul>
            
           
          </div>

          <div className="clearfix mb-20 mt-30">
            <a href="#" className="btn btn-primary btn-block btn-md">Attend Now</a>
          </div>
          
          <div className="call-featiured">
            <div className="icon">
              <i className="fa fa-phone"></i>
            </div>
            <div className="content">
              <h5>Call for more details</h5>
              <p className="phone-number">
                +66-85-658-8754
              </p>
            </div>
          </div>
          <div className="favor-link-wrapper mb-30">
            <a href="#" className="favor-link"><i className="fa fa-heart"></i> Add To Wishlist</a>
          </div>
        </aside>
      </div>
    )
  }
}

export default CourseDetailLeftSide;