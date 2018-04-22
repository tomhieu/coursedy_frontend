import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import {LinkContainer} from 'react-router-bootstrap'
import {TT} from "utils/locale";


/**
  * @Course group item template 2
  * @Use for CoursePage
  */
class CourseItemInListMode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      deleteCourse, 
      selectCourseHdl, 
      displayMode, 
      selectedCourses, 
      isPublic,
      isFollowed,
      item,
    } = this.props;
    const {id, onlyTutor, cover_image: coverImage, noComments, category, period, schedule, title, description, user} = item;
    const {id: userId, name, avatar} = user;
    const noAvatarImage = 'http://placehold.it/75x75';
    return (
      <div className="course-list-item">
        <div className="row gap-25">
          <div className="col-xss-12 col-xs-3 col-lg-3 col-sm-4 col-md-4">
            <LinkContainer to={ !onlyTutor ? '/course/' + id : '/dashboard/courses/detail/' + id } className='image img-responsive'>
              <img className={styles.courseImageList} src={!coverImage ? 'http://placehold.it/200x100' : coverImage } alt="" />
            </LinkContainer>
          </div>
          <div className="col-xss-12 col-xs-12 col-lg-9 col-sm-8 col-md-8">
            <div className="content">
              <h4><a href="#">{title}</a></h4>
              <div className="content-inner">
                <div className="row gap-20">
                  <div className="col-xss-7 col-xs-8 col-lg-8 col-sm-8 col-sm-8">
                    <div className="course-instructor">
                      <LinkContainer className="image" to={'/tutor/' + userId }>
                        <img src={avatar ? avatar : 'http://placehold.it/75x75'} alt="" className={styles.courseTutorAvatar + ' img-responsive img-circle'} />
                      </LinkContainer>
                      <span>{name}</span>
                    </div>
                  </div>
                  <div className="col-xss-5 col-xs-12 col-lg-2 col-sm-2 col-md-2">
                    <div className="rating-wrapper">
                      <div className="rating-item">
                        <span>
                          <div className="rating-symbol">
                            <div className="rating-symbol-background fa fa-star-o" ></div>
                            <div className="rating-symbol-foreground">
                              <span className="fa fa-star"></span>
                            </div>
                          </div>
                          <div className="rating-symbol">
                            <div className="rating-symbol-background fa fa-star-o" ></div>
                            <div className="rating-symbol-foreground">
                              <span className="fa fa-star"></span>
                            </div>
                          </div>
                          <div className="rating-symbol">
                            <div className="rating-symbol-background fa fa-star-o" ></div>
                            <div className="rating-symbol-foreground">
                              <span className="fa fa-star"></span>
                            </div>
                          </div>
                          <div className="rating-symbol" >
                            <div className="rating-symbol-background fa fa-star-o" ></div>
                            <div className="rating-symbol-foreground">
                              <span className="fa fa-star"></span>
                            </div>
                          </div>
                          <div className="rating-symbol">
                            <div className="rating-symbol-background fa fa-star-o" ></div>
                            <div className="rating-symbol-foreground">
                              <span></span>
                            </div>
                          </div>
                        </span>
                        <input type="hidden" className="rating" data-filled="fa fa-star" data-empty="fa fa-star-o" data-fractions="2" data-readonly="" value="3.5"/>
                      </div>
                      <span>{noComments > 0 ? TT.t('number_of_comment', {numOfComment: noComments}) : TT.t('no_comment')}</span>
                    </div>
                  </div>

                  <div className="col-xss-12 col-xs-12 col-lg-2 col-sm-2 col-md-2">
                    <div className="price">
                      $19,65
                    </div>
                  </div>
                </div>
              </div>
              <p>{description}</p>
              <ul className="meta-list clearfix">
                <li>
                  <i className="fa fa-folder-open-o"></i>
                  <span className="block">{category.name}</span>
                </li>
                <li><i className="fa fa-pencil-square-o"></i><span className="block">
                  {this.context.t('course_item_lesson_duration', {time: schedule ? schedule : 0})}
                </span></li>
                <li><i className="fa fa-calendar-check-o"></i><span className="block">
                  {this.context.t('course_item_duration', {duration: period ? period : 0})}
                </span></li>
                <li className="btn-box"><a href="#" className="btn btn-primary btn-form btn-inverse">
                  {this.context.t('course_detail')}
                </a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CourseItemInListMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseItemInListMode.propTypes = {
  // the public course will have some additional feature like following
  isPublic: React.PropTypes.bool.isRequired
};

export default cssModules(CourseItemInListMode, styles);
