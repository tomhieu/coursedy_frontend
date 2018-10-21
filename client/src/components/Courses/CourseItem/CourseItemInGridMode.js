import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import {LinkContainer} from 'react-router-bootstrap';
import styles from '../Course.module.scss';
import RatingItem from '../../Rating/index';
import ObjectUtils from '../../../utils/ObjectUtils';
import {CourseStatus} from '../../../constants/CourseStatus';
import CoursedyProgressBar from '../../Core/CoursedyProgressBar/CoursedyProgressBar';

/**
 * @Course group item template 2
 * @Use for CoursePage
 */
class CourseItemInGridMode extends Component {
  render() {
    const { item, courseStatus } = this.props;

    return (
      <div className="course-item d-flex flex-column">
        <LinkContainer to={`/courses/${item.id}`} className="course-detail-lnk">
          <div className="course-item-image">
            <img
              src={!item.cover_image ? 'http://placehold.it/200x150' : item.cover_image}
              width={200}
              height={150}
              alt="comming soon"
              className="full-width-img"
            />
          </div>
        </LinkContainer>
        <div className="course-item-top clearfix">
          <div className="course-detail-lnk">
            <div className="course-item-instructor">
              <div className="image">
                <img
                  src={!item.user.avatar ? 'http://placehold.it/40x40' : item.user.avatar}
                  alt="comming soon"
                  className="full-width-img img-circle"
                />
              </div>
              <span>{item.user.name}</span>
            </div>
          </div>
        </div>
        <LinkContainer to={`/courses/${item.id}`} className="course-detail-lnk flex-auto">
          <div className="d-flex flex-column justify-content-right course-item-content">
            <RatingItem num_stars={item.rating_count === 0 ? 0 : parseFloat(item.rating_points) / item.rating_count} num_reviews={item.rating_count} />
            <h3 className={styles.courseDescription} title={item.title}>{item.title}</h3>
            <div className={styles.courseItemPrice}>
              {
                item.is_free
                  ? this.context.t('free')
                  : ObjectUtils.currencyFormat(item.tuition_fee || 0, item.currency || 'VND')
              }
            </div>

          </div>
        </LinkContainer>
        {
          courseStatus === CourseStatus.STARTED
            ? (
              <div className={styles.courseProgress}>
                <CoursedyProgressBar progress={30} />
                <span>{this.context.t('course_progress', { progress: 30 })}</span>
              </div>
            ) : (
              <div className="course-item-bottom clearfix">
                <div className="category">
                  <i className="fa fa-folder-open-o" />
                  <span className="block" title={item.category.name}>
                    {' '}
                    {item.category.name}
                    {' '}
                  </span>
                </div>
                <div className="number-lesson">
                  <i className="fa fa-pencil-square-o" />
                  <span className="block" title={this.context.t(this.context.t('lesson_count'), { lessons: item.lesson_count })}>
                    {' '}
                    {this.context.t(this.context.t('lesson_count'), { lessons: item.lesson_count })}
                  </span>
                </div>
              </div>
            )}
      </div>
    );
  }
}

CourseItemInGridMode.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseItemInGridMode.propTypes = {
  item: React.PropTypes.object.isRequired,
  isPublic: React.PropTypes.bool,
  courseStatus: React.PropTypes.string
};

export default cssModules(CourseItemInGridMode, styles);
