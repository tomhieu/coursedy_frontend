import React, { Component } from 'react'
import './CourseDetailLeftSide.scss'

class CourseDetailLeftSide extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-4 col-md-3 hidden-xs">
        <aside className="sidebar-wrapper">
          <div className="scrollspy-sidebar alt-style-01 affix-top">
            <ul className="scrollspy-sidenav">
              <li className="sidebar-heading"><h5>{this.context.t('course_menu')}</h5></li>
              <li className="">
                <ul className="course-detail-left-nav">
                  <li className=""><a href="#course-detail-section-0" className="anchor">{this.context.t('course_intro')}</a></li>
                  <li className=""><a href="#course-detail-section-1" className="anchor">{this.context.t('course_lessons')}</a></li>
                  <li className=""><a href="#course-detail-section-2" className="anchor">{this.context.t('course_teacher')}</a></li>
                  <li className=""><a href="#course-detail-section-3" className="anchor">{this.context.t('course_comments')}</a></li>
                  <li className=""><a href="#course-detail-section-4" className="anchor">{this.context.t('course_related')}</a></li>
                </ul>
              </li>
            </ul>
            
           
          </div>

          <div className="clearfix mb-20 mt-30">
            <a href="#" className="btn btn-primary btn-block btn-md">{this.context.t('course_enroll')}</a>
          </div>
          
          <div className="call-featiured">
            <div className="icon">
              <i className="fa fa-phone"></i>
            </div>
            <div className="content">
              <h5>{this.context.t('contact')}</h5>
              <p className="phone-number">
                +66-85-658-8754
              </p>
            </div>
          </div>
          <div className="favor-link-wrapper mb-30">
            <a href="#" className="favor-link"><i className="fa fa-heart"></i> {this.context.t('course_follow')}</a>
          </div>
        </aside>
      </div>
    )
  }
}

CourseDetailLeftSide.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailLeftSide.propTypes = {
};

export default CourseDetailLeftSide;