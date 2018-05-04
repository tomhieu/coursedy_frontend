import React,  { Component } from 'react';
import './CourseDetailHeader.scss';
import ObjectUtils from "../../../utils/ObjectUtils"
import {SERVER_NAME} from "../../../utils/CommonConstant";


class CourseDetailHeader extends Component {
  render() {
    const { styles, categories, course, course_tutor, course_sections, course_comments } = this.props
    return (
      <div className='course-detail-header'>
        <div className="info clearfix">
          <div className="image">
            <img src={course.cover_image ? course.cover_image : 'http://placehold.it/155/103'} alt="Image" className="img-fluid" />
          </div>
          <div className="content">
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