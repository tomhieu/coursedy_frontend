import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import { LinkContainer } from 'react-router-bootstrap'
import {SERVER_NAME} from "utils/CommonConstant";
import {Checkbox} from 'material-ui'


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
      isFollowed
    } = this.props;
    return (
      <div className="col-xs-12 no-ml no-mr">
        <div className="row pt-15 pb-15 course-container">
          <div className="col-xs-2">
            <div className="course-thumb">
              <LinkContainer to={ !this.props.item.onlyTutor ? '/course/' + this.props.item.id : '/dashboard/courses/detail/' + this.props.item.id } className={styles.fullWidth + ' img-responsive'}>
                <img src={!this.props.item.cover_image ? 'http://placehold.it/200x100' : SERVER_NAME + this.props.item.cover_image } alt="" />
              </LinkContainer>
              {
                // isPublic ? <Checkbox
                //   style={{position: 'absolute', top: '5px', right: '-20px'}}
                //   checked={selectedCourses.indexOf(this.props.item.id) >= 0}
                //   onCheck={selectCourseHdl.bind(this, this.props.item.id)}
                // /> : null
                isPublic ? (
                  isFollowed ? <Checkbox
                    style={{position: 'absolute', top: '5px', right: '-20px'}}
                    checked={true}
                  /> : <Checkbox
                    style={{position: 'absolute', top: '5px', right: '-20px'}}
                    checked={false}
                  />
                ) : null
              }
            </div>
          </div>{/* End course thumb */}

          <div className="col-xs-10">
            <div className={"col-xs-8 course-info"}>
              <h3 className={styles.courseTitle}>
                <LinkContainer to={ !this.props.item.onlyTutor ? '/course/' + this.props.item.id : '/dashboard/courses/detail/' + this.props.item.id }><span>{this.props.item.title}</span></LinkContainer>
              </h3>
            </div>

            <div className="clearfix"></div>
            <div className="col-xs-6">
              <table className="table">
                <tbody>
                  <tr>
                    <td><div className="" data-score="4"></div></td>
                    <td>{this.props.item.no_comments ? this.props.item.no_comments : 0} nhận xét</td>
                  </tr>
                  <tr>
                    <td>{this.context.t('course_item_duration', {duration: this.props.item.period ? this.props.item.period : 0})}</td>
                    <td>{this.context.t('course_item_lesson_duration', {time: this.props.item.schedule ? this.props.item.schedule : 0})}</td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </table>
            </div>
            {!this.props.item.onlyTutor && this.props.item.user ? (
            <div className="col-xs-6 course-tutor-info">
              <div className={styles.courseTutorAvatar}>
                <LinkContainer to={'/tutor/' + this.props.item.user.id }>
                  <img src={this.props.item.user.avatar ? SERVER_NAME + this.props.item.user.avatar : 'http://placehold.it/75x75'} alt="" className={styles.courseTutorAvatar + ' img-responsive img-circle'} />
                </LinkContainer>
              </div>
              <br/>
              <p className={styles.courseTutorName}>
                <LinkContainer to={'/tutor/' + this.props.item.user.id }>
                  <span>
                  { 
                    this.props.item.user.first_name && this.props.item.user.last_name ? 
                      this.props.item.user.first_name + ' ' + this.props.item.user.last_name :
                      this.context.t('updating')
                  }
                  </span>
                </LinkContainer>
              </p>
            </div>
            ) : (<div></div>)}
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
