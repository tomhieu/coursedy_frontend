import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorCourseList.module.scss';
import TutorCourseItem from "../CourseItem/TutorCourseItem";

class TutorCourseList extends Component {
  render() {
    const {courseList} = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row flex-auto pb-10px">
            <div className="col-xl-5 col-sm-12">
              <div className="row">
                <div className="col-md-9 col-sm-12">
                  <div className={styles.tutorCourseHeader + ' ' + styles.courseName}>{this.context.t('course_name')}</div>
                </div>
                <div className="col-md-3 col-sm-12">
                  <div className={styles.tutorCourseHeader}>{this.context.t('tutor_course_fee')}</div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-sm-12">
              <div className="row">
                <div className="col-md-2 col-sm-4">
                  <div className={styles.tutorCourseHeader}>{this.context.t('number_enrolled_student')}</div>
                </div>
                <div className="col-md-2 col-sm-4">
                  <div className={styles.tutorCourseHeader}>{this.context.t('maximum_student')}</div>
                </div>
                <div className="col-md-2 col-sm-4">
                  <div className={styles.tutorCourseHeader}>{this.context.t('number_lesson')}</div>
                </div>
                <div className="col-md-3 col-sm-4">
                  <div className={styles.tutorCourseHeader}>{this.context.t('tutor_course_status')}</div>
                </div>
                <div className="col-md-3 col-sm-4">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            {
              courseList.map((course) =>
                <div className="col-md-12">
                  <TutorCourseItem key={'tutorCourse' + course.id} course={course} {...this.props}></TutorCourseItem>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
TutorCourseList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorCourseList.propTypes = {
  // the public course will have some additional feature like following
  courseList: React.PropTypes.array.isRequired
};

export default cssModules(TutorCourseList, styles);