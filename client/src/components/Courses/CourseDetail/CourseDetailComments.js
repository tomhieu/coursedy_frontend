import React, { Component} from 'react';
import {SERVER_NAME} from "utils/CommonConstant";
import './CourseDetailComments.scss'
import { PUBLIC_COURSE_MAX_NUMBER_COMMENTS_PER_LOAD } from "../../../constants/WebConstants.js"
import {CommentFormContainer} from '../../../containers/index'
import { PUBLIC_COURSE_DETAIL_MENU_COMMENTS } from "../../../constants/WebConstants.js"
/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailComments extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {course_comments, loadMoreCommentsHdl, activeMenu} = this.props
    const active = activeMenu === PUBLIC_COURSE_DETAIL_MENU_COMMENTS
    return (
      <div id="courses-detail-comments" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>{this.context.t('course_comments')}</h3>
        </div>
        <div className="review-wrapper">
          <div className="review-header">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="review-overall">
                  <h5>{this.context.t('course_rating')}</h5>
                  <p className="review-overall-point"><span>4.6</span> / 5.0</p>
                  <div className="rating-wrapper">
                    <div className="rating-item">
                    </div>
                    <span> ({course_comments.length} {this.context.t('course_comments')})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="review-content">
            <ul className="review-list">
            {
              course_comments.map((item, index) => (
                <li className="clearfix" key={'course-detail-comments-' + index}>
                  <div className="image img-circle">
                    <img 
                      className="rounded-circle full-width"
                      src={item.user.avatar ? item.user.avatar : "http://placehold.it/46x46"}
                      alt={this.context.t('course_comments')} 
                    />
                  </div>
                  <div className="content">
                    <div className="row gap-20 mb-0">
                      <div className="col-xs-12 col-sm-9">
                        <h6>{item.user.first_name} {item.user.last_name}</h6>
                        <div className="rating-wrapper">
                          <div className="rating-item">
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-3">
                        <p className="review-date">{item.created_at}</p>
                      </div>
                    </div>
                    <div className="review-text">
                      {item.content}
                    </div>
                    <div className="review-other">
                      <div className="row gap-20 mb-0">
                      </div>
                    </div>
                  </div>
                </li>
              ))
            }
            </ul>
          </div>
        </div>

        <div className="mt-30 mb-10 text-right">
          &nbsp;&nbsp;
        </div>
        
        <CommentFormContainer></CommentFormContainer>
      </div>
    )
  }
}

CourseDetailComments.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailComments.propTypes = {
};

export default CourseDetailComments;
