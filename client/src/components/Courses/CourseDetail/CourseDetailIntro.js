import React, { Component } from 'react'
import './CourseDetailIntro.scss'
import DateUtils from "../../../utils/DateUtils"
import {SERVER_NAME} from "../../../utils/CommonConstant";

class CourseDetailIntro extends Component {
  render() {
    const {course, course_sections} = this.props
    return (
      <div id="course-detail-intro" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>{this.context.t('course_intro')}</h3>
        </div>
        <div className="mb-20 text-center">
          <img src={course.cover_image ? course.cover_image : "http://placehold.it/1366x768"} alt="" className="img-fluid"/>
        </div>
        <div className="course-intro">
          <div className="listing-box clearfix">
            <h5>{this.context.t('course_highlight')}</h5>
            <ul className="listing-box-list">
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-6"><i className="fa fa-clock-o mr-5"></i> {this.context.t('period')}</div>
                  <div className="col-xs-7 col-sm-6 text-right font600">{course.period}</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-5"><i className="fa fa-calendar mr-5"></i> {this.context.t('start_time')}</div>
                  <div className="col-xs-7 col-sm-7 text-right font600">{DateUtils.formatDate(course.start_date)}</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-5"><i className="fa fa-pencil-square-o mr-5"></i> {this.context.t('course_lessons')}</div>
                  <div className="col-xs-7 col-sm-7 text-right font600"> {course_sections.length}</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-6 col-sm-6"><i className="fa fa-users mr-5"></i> {this.context.t('number_of_students')}</div>
                  <div className="col-xs-6 col-sm-6 text-right font600"> {course.number_of_students}</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-5"><i className="fa fa-graduation-cap"></i> {this.context.t('course_requirements')}</div>
                  <div className="col-xs-7 col-sm-7 text-right font600"> {this.context.t('unknown')}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <h5 className="text-uppercase font700">{this.context.t('course_about')}</h5>
        <div className="course-about-content">
          {course.description}
        </div>
      </div>
    )
  }
}

CourseDetailIntro.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailIntro.propTypes = {
};

export default CourseDetailIntro