import React, { Component} from 'react';
import {SERVER_NAME} from "utils/CommonConstant";
import './CourseDetailComments.scss'


/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailComments extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      /*<div className="course-detail-comments">
        <div className="col-md-12">
          <ul className="tree">
          {
            this.props.course_comments.map(item => (
            <li key={'course-comment-' + item.id}>
              <div className="media comments-list">
                <div className="media-left">
                  <img src={item.user.avatar ? 
                      SERVER_NAME + item.user.avatar : 
                      'http://placehold.it/75x75'} 
                    alt="" 
                    className="comment-profile img-circle" />
                </div>
                <div className="media-body">
                  <h4>
                    <strong>{item.user.first_name} {item.user.last_name}</strong> {item.created_at}
                    <span className="avg_rating"></span>
                  </h4>
                  <div>{item.content}</div>
                </div>
              </div>
            </li>  
            ))
          }
          </ul>
        </div>
      </div>*/
      <div id="courses-detail-comments" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>Review</h3>
        </div>
        <div className="review-wrapper">
          <div className="review-header">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-3">
                <div className="review-overall">
                  <h5>Score Breakdown</h5>
                  <p className="review-overall-point"><span>4.6</span> / 5.0</p>
                  <div className="rating-wrapper">
                    <div className="rating-item">
                    </div>
                    <span> (7 review)</span>
                  </div>
                  <p className="review-overall-recommend">90% recommend this course</p>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-9">
                <div className="review-overall-breakdown">
                  <div className="row gap-20">
                    <div className="col-xs-12 col-sm-7">
                      <h5>Score Breakdown</h5>
                      <ul className="breakdown-list">
                        <li className="clearfix">
                          <div className="rating-wrapper">
                            <div className="rating-item">
                            </div>
                            <span> (5)</span>
                          </div>
                          <div className="progress progress-primary">
                          </div>
                          <div className="breakdown-count"> (58)</div>
                        </li>
                        <li className="clearfix">
                          <div className="rating-wrapper">
                            <div className="rating-item">
                            </div>
                            <span> (4)</span>
                          </div>
                          <div className="progress progress-primary">
                          </div>
                          <div className="breakdown-count"> (132)</div>
                        </li>
                        <li className="clearfix">
                          <div className="rating-wrapper">
                            <div className="rating-item">
                            </div>
                            <span> (3)</span>
                          </div>
                          <div className="progress progress-primary">
                          </div>
                          <div className="breakdown-count"> (89)</div>
                        </li>
                        
                        <li className="clearfix">
                          <div className="rating-wrapper">
                            <div className="rating-item">
                            </div>
                            <span> (2)</span>
                          </div>
                          <div className="progress progress-primary">
                          </div>
                          <div className="breakdown-count"> (58)</div>
                        </li>
                        <li className="clearfix">
                          <div className="rating-wrapper">
                            <div className="rating-item">
                            </div>
                            <span> (1)</span>
                          </div>
                          <div className="progress progress-primary">
                          </div>
                          <div className="breakdown-count"> (9)</div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="col-xs-12 col-sm-5 col-md-4 mt-20-xs">
                      <h5>Average Rating For</h5>
                      <ul className="breakdown-list for-avg clearfix">
                        <li>
                          Content <span className="pull-right">4.5</span>
                        </li>
                        <li>
                          Knowledge <span className="pull-right">4.5</span>
                        </li>
                        <li>
                          Assignment <span className="pull-right">4.2</span>
                        </li>
                        <li>
                          ClassNameroom <span className="pull-right">3.8</span>
                        </li>
                        <li>
                          Instructor <span className="pull-right">4.4</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="review-content">
            <ul className="review-list">
              <li className="clearfix">
                <div className="image img-circle">
                  <img className="rounded-circle" src="http://placehold.it/46x46" alt="Man" />
                </div>
                <div className="content">
                  <div className="row gap-20 mb-0">
                    <div className="col-xs-12 col-sm-9">
                      <h6>Antony Robert</h6>
                      <div className="rating-wrapper">
                        <div className="rating-item">
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-3">
                      <p className="review-date">18/03/2016</p>
                    </div>
                  </div>
                  <div className="review-text">
                    <p>She meant new their sex could defer child. An lose at quit to life do dull. Moreover end horrible endeavor entrance any families. Income appear extent on of thrown in admire.</p>
                    <p>It as announcing it me stimulated frequently continuing. Least their she you now above going stand forth. He pretty future afraid should genius spirit on. Set property addition building put likewise get. Of will at sell well at as. Too want but tall nay like old. Removing yourself be in answered he. Consider occasion get improved him she eat. Letter by lively oh denote an.</p>
                  </div>
                  <div className="review-other">
                    <div className="row gap-20 mb-0">
                      <div className="col-xs-12 col-sm-6">
                        <ul className="social-share-sm">
                          <li><span><i className="fa fa-share-square"></i> share</span></li>
                          <li className="the-label"><a href="#">Facebook</a></li>
                          <li className="the-label"><a href="#">Twitter</a></li>
                          <li className="the-label"><a href="#">Google Plus</a></li>
                        </ul>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <ul className="social-share-sm for-useful">
                          <li><span>Was this review helpful? </span></li>
                          <li className="the-label"><a href="#"><i className="fa fa-thumbs-up"></i></a> 2</li>
                          <li className="the-label"><a href="#"><i className="fa fa-thumbs-down"></i></a> 1</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-30 mb-10 text-right">
          <a href="course-review.html" className="btn btn-primary btn-sm">Read more reviews</a>
          <a href="course-review.html#review-form" className="btn btn-danger btn-sm anchor">Leave your review</a>
        </div>
        
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
