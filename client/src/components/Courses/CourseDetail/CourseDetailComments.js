import React, { Component } from 'react';
import './CourseDetailComments.scss';
import { PUBLIC_COURSE_DETAIL_MENU_COMMENTS } from '../../../constants/WebConstants.js';
import { CommentFormContainer } from '../../../containers/index';
import RatingItem from '../../Rating/index';
import DateUtils from '../../../utils/DateUtils';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailComments extends Component {
  constructor(props) {
    super(props);
  }

  scrollToCommentForm() {

  }

  render() {
    const {
      course_comments, loadMoreCommentsHdl, activeMenu, course
    } = this.props;
    const active = activeMenu === PUBLIC_COURSE_DETAIL_MENU_COMMENTS;
    const ratingOverall = course.rating_count === 0 ? 0 : parseFloat(course.rating_points) / course.rating_count;
    return (
      <div id="courses-detail-comments" className="course-detail-section">
        <div className="row review-wrapper">
          <div className="col-md-4 review-header">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title text-left mb-20">
                  <h3>{this.context.t('course_rating')}</h3>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="review-overall">
                  <p className="review-overall-point"><span>{ratingOverall}</span></p>
                  <div className="rating-wrapper">
                    <RatingItem
                      num_stars={ratingOverall}
                      num_reviews={course.rating_count}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8 review-content">
            <div className="d-flex flex-row">
              <div className="seperate-comment-line" />
              <div className="d-flex flex-column flex-auto">
                <div className="section-title text-left mb-20">
                  <h3>{this.context.t('course_comments')}</h3>
                  <span>
                    {' '}
(
                    {course_comments.length}
                    {' '}
                    {this.context.t('course_comments')}
)
                  </span>
                </div>
                {
                  course_comments.length > 0
                    ? (
                      <ul className="review-list">
                        {
                        course_comments.map((item, index) => (
                          <li className="clearfix" key={`course-detail-comments-${index}`}>
                            <div className="image img-circle">
                              <img
                                className="rounded-circle full-width"
                                src={item.user.avatar ? item.user.avatar : 'http://placehold.it/46x46'}
                                alt={this.context.t('course_comments')}
                              />
                            </div>
                            <div className="content">
                              <div className="gap-20 mb-0">
                                <div className="d-flex">
                                  <strong className="pr-10">{item.user.name}</strong>
                                  <span>{DateUtils.dateTimeFromNow(item.created_at)}</span>
                                </div>
                              </div>
                              <div className="review-text">
                                {item.content}
                              </div>
                              <div className="review-other">
                                <div className="row gap-20 mb-0" />
                              </div>
                            </div>
                          </li>
                        ))
                      }
                      </ul>
                    )
                    : (
                      <div className="d-flex flex-column flex-auto">
                        <span>{this.context.t('no_comment_about_course')}</span>
                        <a className="active-link" href="#" onClick={this.scrollToCommentForm.bind(this)}>{this.context.t('course_comments_no_comment')}</a>
                      </div>
                    )
                }
              </div>
            </div>
          </div>
        </div>

        <div className="mt-30 mb-10 text-right">
          &nbsp;&nbsp;
        </div>

        <CommentFormContainer />
      </div>
    );
  }
}

CourseDetailComments.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseDetailComments.propTypes = {
};

export default CourseDetailComments;
