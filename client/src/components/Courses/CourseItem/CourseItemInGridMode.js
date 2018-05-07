import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import {LinkContainer} from 'react-router-bootstrap'
import {SERVER_NAME} from "utils/CommonConstant";
import {TT} from "utils/locale";
import Image from 'react-graceful-image';
import RatingItem from '../../Rating/index'
import ObjectUtils from "utils/ObjectUtils";


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
      isPublic
    } = this.props;

    return (
      <div className="course-item">
        <LinkContainer to={isPublic ? '/course/' + item.id : '/dashboard/courses/detail/' + item.id} className='course-detail-lnk'>
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
          <div className="course-item-price">
            {ObjectUtils.currencyFormat(item.tuition_fee, item.currency)}
          </div>
        </div>
        <LinkContainer to={isPublic ? '/course/' + item.id : '/dashboard/courses/detail/' + item.id} className='course-detail-lnk'>
          <div className="course-item-content">
            <RatingItem num_stars={item.rating_count == 0 ? 0 : parseFloat(item.rating_points)/item.rating_count} num_reviews={item.rating_count}/>
            <h3>{item.title}</h3>
            <p className='course-item-description'>{item.description}</p>
          </div>
        </LinkContainer>
        <div className="course-item-bottom clearfix">
          <div><i className="fa fa-folder-open-o"/><span className="block"> {item.category.name} </span></div>
          <div><i className="fa fa-pencil-square-o"/><span className="block"> {this.context.t('lesson_count', {lessons: item.period})}</span></div>
        </div>
      </div>
    )
  }
}

CourseItemInGridMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseItemInGridMode.propTypes = {
  item: React.PropTypes.object.isRequired
};

export default cssModules(CourseItemInGridMode, styles);
