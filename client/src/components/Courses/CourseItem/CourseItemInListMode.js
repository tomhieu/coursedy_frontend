import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { LinkContainer } from 'react-router-bootstrap';
import RatingItem from 'components/Rating';
import ObjectUtils from 'utils/ObjectUtils';
import { globalHistory } from 'utils/globalHistory';
import styles from './CourseItem.module.scss';
import Image from '../../Core/ImageComponent';
import defaultAvatar from '../../../../images/default_avatar.png';


/**
  * @Course group item template 2
  * @Use for CoursePage
  */
class CourseItemInListMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewMore: false
    };
  }

  componentDidMount() {
    if (this.courseRefDes && this.courseRefDes.clientHeight > 80) {
      this.toggleViewMore();
    }
  }

  handleViewMore(e) {
    e.stopPropagation();
    this.toggleViewMore();
  }

  toggleViewMore() {
    this.setState({ isViewMore: !this.state.isViewMore });
  }

  navigateToCourseDetails(onlyTutor, courseId) {
    if (onlyTutor) {
      globalHistory.push(`/dashboard/courses/detail/${courseId}`);
    } else {
      globalHistory.push(`/courses/${courseId}`);
    }
  }

  render() {
    const {
      item,
    } = this.props;
    const {
      id, onlyTutor, cover_image: coverImage, noComments, category, period, schedule, title, description, user
    } = item;
    const { id: userId, name, avatar } = user;
    return (
      <div className={styles.courseListItem} onClick={() => this.navigateToCourseDetails(onlyTutor, id)}>
        <div className="row gap-25">
          <div className="col-xss-12 col-xs-3 col-lg-3 col-sm-4 col-md-4">
            <LinkContainer to={!onlyTutor ? `/courses/${id}` : `/dashboard/courses/detail/${id}`} className={`${styles.image} img-responsive`}>
              <Image
                className={styles.courseImageList}
                src={!coverImage ? 'http://placehold.it/200x100' : coverImage}
                fallbackSrc="http://placehold.it/200x100"
                alt=""
              />
            </LinkContainer>
          </div>
          <div className="col-xss-12 col-xs-12 col-lg-9 col-sm-8 col-md-8">
            <div className={styles.content}>
              <LinkContainer to={!onlyTutor ? `/courses/${id}` : `/dashboard/courses/detail/${id}`}>
                <h4>{title}</h4>
              </LinkContainer>
              <div className={styles.contentInner}>
                <div className="row gap-20">
                  <div className="col-xss-12 col-xs-12 col-lg-8 col-md-7">
                    <div className={styles.courseInstructor}>
                      <LinkContainer className={styles.image} to={`/tutor/${userId}`}>
                        <Image
                          src={avatar || defaultAvatar}
                          alt=""
                          className={`${styles.courseTutorAvatar} img-responsive img-circle`}
                          fallbackSrc={defaultAvatar}
                        />
                      </LinkContainer>
                      <span>{name}</span>
                    </div>
                  </div>
                  <div className="col-xss-12 col-xs-12 col-lg-2 col-md-3">
                    <div className={styles.ratingWrapper}>
                      <RatingItem num_stars={item.rating_count === 0 ? 0 : parseFloat(item.rating_points) / item.rating_count} num_reviews={item.rating_count} />
                      <div>{noComments > 0 ? this.context.t('number_of_comment', { numOfComment: noComments }) : this.context.t('no_rating')}</div>
                    </div>
                  </div>

                  <div className="col-xss-12 col-xs-12 col-lg-2 col-sm-2 col-md-2">
                    <div className={styles.price}>
                      {
                        item.is_free
                          ? this.context.t('free')
                          : ObjectUtils.currencyFormat(item.tuition_fee || 0, item.currency || 'VND')
                      }
                    </div>
                  </div>
                </div>
              </div>
              <p
                ref={(ref) => { this.courseRefDes = ref; }}
                className={`${styles.courseListItemDesc} ${this.state.isViewMore ? styles.courseDesViewLess : styles.courseDesViewMore}`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
              {this.state.isViewMore
                ? (
                  <div
                    className={styles.courseDesViewMoreBtn}
                    onClick={this.handleViewMore.bind(this)}
                  >
                    {this.context.t('see_more')}
                  </div>
                )
                : null
              }
              <ul className={`${styles.metaList} clearfix`}>
                <li>
                  <i className="fa fa-folder-open-o" />
                  <span className="block">{category.name}</span>
                </li>
                <li>
                  <i className="fa fa-calendar-check-o" />
                  <span className="block">
                    {this.context.t(this.context.t('course_item_duration'), { duration: period || 0 })}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CourseItemInListMode.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseItemInListMode.propTypes = {
  // the public course will have some additional feature like following
  isPublic: React.PropTypes.bool.isRequired
};

export default cssModules(CourseItemInListMode, styles);
