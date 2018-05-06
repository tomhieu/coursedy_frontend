import React,  { Component } from 'react';
import './CourseDetailHeader.scss';
import ObjectUtils from "../../../utils/ObjectUtils"
import {SERVER_NAME} from "../../../utils/CommonConstant";


class CourseDetailHeader extends Component {
  render() {
    const { 
      styles, categories, course, 
      course_tutor, course_sections, course_comments,
      displayFixedSidebar
    } = this.props
    return (
      <div 
        className={
            displayFixedSidebar ? 
              "course-detail-header course-detail-header-scrolled" :
              "course-detail-header course-detail-header-normal"
        }
      >
        <div 
          className={
            displayFixedSidebar ? "d-none" : "container"
          }
        >
          <div className="content mb-15">
            <h2>{ course.title }</h2>
          </div>
          <ul className="meta-list">
            <li className="d-none d-md-inline-block">
              <div className="meta-teacher clearfix">
                <div className="image">
                  <img src="http://placehold.it/40x40" alt="Images" />
                </div>
                <div className="content">
                  <span className="text-muted mt-3 block">{this.context.t('teacher')}</span>
                  <h6>
                    <a href="course-detail-section-2" className="anchor">
                      {course.user ? course.user.name : this.context.t('unknown')}
                    </a>
                  </h6>
                </div>
              </div>
            </li>
            
            <li className="d-none d-md-inline-block">
              <div className="meta-category">
                <div className="content">
                  <span className="text-muted mt-3 block">{this.context.t('category')}</span>
                  <h6>
                    <a href="course-detail-section-2" className="anchor">
                      {categories.length > 0 ? categories[0].name : this.context.t('unknown')}
                    </a> 
                  </h6>
                </div>
              </div>
            </li>
            
            <li className="d-none d-md-inline-block">
              <div className="meta-category">
                <div className="content">
                  <span className="text-muted mt-3 block">{this.context.t('period')}</span>
                  <h6>{course_sections.length} {this.context.t('period')}</h6>
                </div>
              </div>
            </li>
            
            <li className="d-none d-md-inline-block">
              <div className="meta-rating">
                <div className="content">
                  <span className="text-muted mt-3 block">{this.context.t('course_comments')}</span>
                  <h6>{course_comments.length} {this.context.t('course_comments')}</h6>
                </div>
              </div>
            </li>
            <li className="meta-price">
              <div className="price bg-danger">{ObjectUtils.currencyFormat(course.tuition_fee)}</div>
            </li>
          </ul>
        </div>

        <div 
          className={
            displayFixedSidebar ? "container" : "d-none"
          }
        >
          <div className="row">
            <div className="col-xs-12 col-md-9">
              <div className="content">
                <h2>{ course.title }</h2>
              </div>
            </div>
            <div className="col-xs-12 col-md-3">
              <ul className="meta-list">
                <li className="meta-price no-margin">
                  <div className="price bg-danger">{ObjectUtils.currencyFormat(course.tuition_fee)}</div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

CourseDetailHeader.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailHeader.propTypes = {
};

export default CourseDetailHeader;