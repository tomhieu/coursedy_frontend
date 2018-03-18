import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import { LinkContainer } from 'react-router-bootstrap'
import {SERVER_NAME} from "utils/CommonConstant";
import {Checkbox} from 'material-ui'
import {TT} from "utils/locale";


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
      deleteCourse, 
      item,
      selectedCourses,
      selectCourseHdl,
      isPublic
    } = this.props;
    return (
      <div className="row pt-15 pb-15 course-container">
        <CourseThumb item={item} isPublic={isPublic} selectedCourses={selectedCourses} selectCourseHdl={selectCourseHdl} />
        <CourseRating item={item} />
        <div className="col-md-12 col-sm-12">
          <div className="row">
            <CourseInfo deleteCourse={deleteCourse} item={item} />
            {!this.props.item.onlyTutor ? (<TutorInfo item={item} />) : null}
          </div>
        </div>
      </div>
    )
  }
}

const CourseRating = (props) => {
  const {onlyTutor, no_comments, id, title} = props.item;
  return (
    <div className="col-md-12 col-sm-12">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <ul className={styles.courseRating + ' list-unstyled'}>
            <li><div className="" data-score="4"></div></li>
            <li><div className={styles.text}>{no_comments ? no_comments : 0} nhận xét</div></li>
          </ul>
        </div>
        <div className="col-md-12 col-sm-12">
          <h3 className={styles.courseTitle}>
            <LinkContainer to={ !onlyTutor ? '/course/' + id : '/dashboard/courses/detail/' + id }><span>{title}</span></LinkContainer>
          </h3>
        </div>
      </div>
    </div>
  )
}

const CourseThumb = (props) => {
  const {selectedCourses, selectCourseHdl} = props;
  const {onlyTutor, id, cover_image} = props.item;
  const {isPublic} = props;
  return (
    <div className="col-md-12 col-sm-12">
      <div className="course-thumb">
        <LinkContainer to={ !onlyTutor ? '/course/' + id : '/dashboard/courses/detail/' + id } className={styles.courseAvatar + ' img-responsive'}>
          <img src={!cover_image ? 'http://placehold.it/200x100' : SERVER_NAME + cover_image } alt="" />
        </LinkContainer>
        {
          isPublic ? <Checkbox
            style={{position: 'absolute', top: '5px', right: '-20px'}}
            checked={selectedCourses.indexOf(id) >= 0}
            onCheck={selectCourseHdl.bind(this, id)}
          /> : null
        }
      </div>
    </div>
  )
}

const CourseInfo = (props) => {
  const {deleteCourse} = props;
  const {onlyTutor, id, period, schedule} = props.item;
  return (
    <div className={!onlyTutor ? "col-sm-12 col-md-7 course-info" : "col-sm-12 col-md-12 course-info"}>
      <div className="row">
        <div className={styles.text + " col-sm-12 col-md-12"}>
          {TT.t('course_item_duration', {duration: period ? period : 0})}
        </div>
        <div className={styles.text + " col-sm-12 col-md-12"}>
          {TT.t('course_item_lesson_duration', {time: schedule ? schedule : 0})}
        </div>
      </div>
      {
        onlyTutor ? (
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <button className="btn btn-primary" onClick={() => deleteCourse(id)}>{TT.t('course_delete_btn')}</button>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

const TutorInfo = (props) => {
  const {id, avatar, last_name, first_name} = props.item.user;
  return (
    <div className="col-sm-12 col-md-5 course-tutor-info">
      <div className={styles.courseTutorAvatar + " mb-15"}>
        <LinkContainer to={'/tutor/' + id }>
          <img src={avatar ? SERVER_NAME + avatar : 'http://placehold.it/50x50'} alt="" className={styles.courseTutorAvatar + ' img-responsive img-circle'} />
        </LinkContainer>
      </div>
      <div className={styles.courseTutorName}>
        <LinkContainer to={'/tutor/' + id }>
            <span>
              {
                first_name && last_name ? first_name + ' ' + last_name : TT.t('updating')
              }
            </span>
        </LinkContainer>
      </div>
    </div>
  )
}

CourseItemInGridMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseItemInGridMode.propTypes = {
  // the public course will have some additional feature like following
  isPublic: React.PropTypes.bool.isRequired,
  item: React.PropTypes.object.isRequired
};

export default cssModules(CourseItemInGridMode, styles);
