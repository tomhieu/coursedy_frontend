import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import {LinkContainer} from 'react-router-bootstrap'
import Image from 'react-graceful-image';
import RatingItem from '../../Rating/index'
import ObjectUtils from "../../../utils/ObjectUtils"
import {CourseStatus} from "../../../constants/CourseStatus";
import CoursedyProgressBar from "../../Core/CoursedyProgressBar/CoursedyProgressBar";
import PrimaryButton from "../../Core/PrimaryButton/PrimaryButton";

/**
 * @Course group item template 2
 * @Use for CoursePage
 */
class CourseItemInGridMode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      item,
      isPublic, courseStatus
    } = this.props;

    return (
      <div className="course-item d-flex flex-column">
        <LinkContainer to={isPublic ? '/courses/' + item.id : '/dashboard/courses/detail/' + item.id} className='course-detail-lnk'>
          <div className="course-item-image">
            <Image src={item.cover_image} width={200} height={150} alt={'comming soon'} className="full-width-img"
                   noLazyLoad={true}/>
          </div>
        </LinkContainer>
        <div className="course-item-top clearfix">
          <LinkContainer to={'/teachers/' + item.user_id} className='course-detail-lnk'>
            <div className="course-item-instructor">
              <div className="image">
                <Image src={item.user.avatar} alt="no image"
                       className="full-width-img img-circle"
                       noLazyLoad={true}/>
              </div>
              <span>{item.user.name}</span>
            </div>
          </LinkContainer>
        </div>
        <LinkContainer to={isPublic ? '/courses/' + item.id : '/dashboard/courses/detail/' + item.id} className='course-detail-lnk flex-auto'>
          <div className="d-flex flex-column justify-content-right course-item-content">
            <RatingItem num_stars={item.rating_count == 0 ? 0 : parseFloat(item.rating_points)/item.rating_count} num_reviews={item.rating_count}/>
            <h3>{item.title}</h3>
            <div className={styles.courseItemPrice}>
              {
                item.is_free ?
                  this.context.t('free') :
                  ObjectUtils.currencyFormat(item.tuition_fee || 0, item.currency || 'VND')
              }
            </div>

          </div>
        </LinkContainer>
        {
          courseStatus === CourseStatus.STARTED ?
            <div className={styles.courseProgress}>
              <CoursedyProgressBar progress={30}></CoursedyProgressBar>
              <span>{this.context.t('course_progress', {progress: 30})}</span>
            </div>:
            <div className="course-item-bottom clearfix">
              <div><i className="fa fa-folder-open-o"/><span className="block"> {item.category.name} </span></div>
              <div><i className="fa fa-pencil-square-o"/><span className="block"> {this.context.t('lesson_count', {lessons: item.lesson_count})}</span></div>
            </div>
        }
      </div>
    )
  }
}

CourseItemInGridMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseItemInGridMode.propTypes = {
  item: React.PropTypes.object.isRequired,
  isPublic: React.PropTypes.bool,
  courseStatus: React.PropTypes.string
};

export default cssModules(CourseItemInGridMode, styles);
