import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import {LinkContainer} from 'react-router-bootstrap'
import {SERVER_NAME} from "utils/CommonConstant";
import {Checkbox} from 'material-ui'
import {TT} from "utils/locale";
import Image from 'react-graceful-image';


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
    } = this.props;

    return (
      <div className="course-item">
        <LinkContainer to={'/course/' + item.id} className='course-detail-lnk'>
          <div className="course-item-image">
            <Image src={item.cover_image} width={200} height={150} alt={'comming soon'} className="full-width-img"
                   noLazyLoad={true}/>
          </div>
        </LinkContainer>
        <div className="course-item-top clearfix">
          <LinkContainer to={'/teachers/' + item.user_id} className='course-detail-lnk'>
            <div className="course-item-instructor">
              <div className="image">
                <Image src={item.user.avatar} alt="no image" className="img-circle"
                       className="full-width-img img-circle"
                       noLazyLoad={true}/>
              </div>
              <span>{item.user.name}</span>
            </div>
          </LinkContainer>
          <div className="course-item-price">
            {this.context.t('course_item_price_tag', {price: item.price || 0, currency: item.currency || 'VND'})}
          </div>
        </div>
        <LinkContainer to={'/course/' + item.id} className='course-detail-lnk'>
          <div className="course-item-content">
            <div className="rating-wrapper">
              <div className="rating-item">
                    <span style={{cursor: 'default'}}><div className="rating-symbol"
                                                           style={{display: 'inline-block', position: 'relative'}}><div
                      className="rating-symbol-background fa fa-star-o" style={{visibility: 'hidden'}}/><div
                      className="rating-symbol-foreground" style={{
                      display: 'inline-block',
                      position: 'absolute',
                      overflow: 'hidden',
                      left: 0,
                      right: 0,
                      width: 'auto'
                    }}><span className="fa fa-star"/></div></div><div className="rating-symbol" style={{
                      display: 'inline-block',
                      position: 'relative'
                    }}><div className="rating-symbol-background fa fa-star-o" style={{visibility: 'hidden'}}/><div
                      className="rating-symbol-foreground" style={{
                      display: 'inline-block',
                      position: 'absolute',
                      overflow: 'hidden',
                      left: 0,
                      right: 0,
                      width: 'auto'
                    }}><span className="fa fa-star"/></div></div><div className="rating-symbol" style={{
                      display: 'inline-block',
                      position: 'relative'
                    }}><div className="rating-symbol-background fa fa-star-o" style={{visibility: 'hidden'}}/><div
                      className="rating-symbol-foreground" style={{
                      display: 'inline-block',
                      position: 'absolute',
                      overflow: 'hidden',
                      left: 0,
                      right: 0,
                      width: 'auto'
                    }}><span className="fa fa-star"/></div></div><div className="rating-symbol" style={{
                      display: 'inline-block',
                      position: 'relative'
                    }}><div className="rating-symbol-background fa fa-star-o" style={{visibility: 'visible'}}/><div
                      className="rating-symbol-foreground" style={{
                      display: 'inline-block',
                      position: 'absolute',
                      overflow: 'hidden',
                      left: 0,
                      right: 0,
                      width: '50%'
                    }}><span className="fa fa-star"/></div></div><div className="rating-symbol" style={{
                      display: 'inline-block',
                      position: 'relative'
                    }}><div className="rating-symbol-background fa fa-star-o" style={{visibility: 'visible'}}/><div
                      className="rating-symbol-foreground" style={{
                      display: 'inline-block',
                      position: 'absolute',
                      overflow: 'hidden',
                      left: 0,
                      right: 0,
                      width: 0
                    }}><span/></div></div></span><input type="hidden" className="rating" data-filled="fa fa-star"
                                                        data-empty="fa fa-star-o" data-fractions={2} data-readonly
                                                        defaultValue="3.5"/>
              </div>
              <span> {this.context.t('total_review', {reviews: item.rating_count})} </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </LinkContainer>
        <div className="course-item-bottom clearfix">
          <div><i className="fa fa-folder-open-o"/><span className="block"> {item.category.name} </span></div>
          <div><i className="fa fa-pencil-square-o"/><span className="block"> {this.context.t('lesson_count', {lessons: item.lesson_count})}</span></div>
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
