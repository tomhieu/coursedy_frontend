import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import { LinkContainer } from 'react-router-bootstrap'



/**
  * @Course group item template 2
  * @Use for CoursePage
  */
class CourseItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-xs-12 no-ml no-mr">
        <div className="row pt-15 pb-15 course-container">
          <div className="col-xs-12">
            <div className="course-thumb">
              <LinkContainer to={ !this.props.item.onlyTutor ? '/course/' + this.props.item.id : '/dashboard/courses/detail/' + this.props.item.id } className={styles.fullWidth + ' img-responsive'}>
                <img src={!this.props.item.cover_image ? 'http://placehold.it/200x100' : this.props.item.cover_image } alt="" />
              </LinkContainer>
            </div>
          </div>{/* End course thumb */}

          <div className="clearfix"></div>
          <div className="col-xs-12">
            <ul className={styles.courseRating + ' list-unstyled'}>
              <li><div className="" data-score="4"></div></li>
              <li><div className={styles.text}>{this.props.item.no_comments} nhận xét</div></li>
            </ul>
          </div>{/* End course rating */}

          <div className="clearfix"></div>
          <div className="col-xs-12">
            <div className={!this.props.item.onlyTutor ? "col-xs-12 col-sm-12 col-md-8 course-info no-pad" : "col-xs-12 col-sm-12 col-md-12 course-info no-pad"}>
              <h3 className={styles.courseTitle}>
                <LinkContainer to={ !this.props.item.onlyTutor ? '/course/' + this.props.item.id : '/dashboard/courses/detail/' + this.props.item.id }><span>{this.props.item.title}</span></LinkContainer>
              </h3>
              <div className={styles.text + " col-xs-12 col-sm-12 col-md-5 no-pad"}>{this.context.t('course_item_duration', {duration: this.props.item.period})}</div>
              <div className={styles.text + " col-xs-12 col-sm-12 col-md-7 no-pad"}>{this.context.t('course_item_lesson_duration', {time: this.props.item.schedule})}</div>
              <div className="col-xs-12 col-sm-12 col-md-12 no-pad">
                <br/>
                <button className="btn btn-primary">{this.context.t('course_view_detail')}</button>
              </div>
            </div>{/* End course info */}
              {!this.props.item.onlyTutor ? (
                  <div className="col-xs-12 col-sm-12 col-md-4 course-tutor-info">
                    <div className={styles.courseTutorAvatar}>
                      <LinkContainer to={'/tutor/' + this.props.item.user.id }>
                        <img src={this.props.item.user.avatar} alt="" className={styles.courseTutorAvatar + ' img-responsive img-circle'} />
                      </LinkContainer>
                    </div>
                    <br/>
                    <p className={styles.courseTutorName}>
                      <a href="#"> {this.props.item.user.first_name} {this.props.item.user.last_name}</a>
                    </p>
                  </div>
              ) : (<div></div>)}
          </div>
        </div>
      </div>

    )
  }
}

CourseItem.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseItem.propTypes = {
};

export default cssModules(CourseItem, styles);
