import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorCourseList.module.scss';
import TutorCourseItem from '../CourseItem/TutorCourseItem';

class TutorCourseList extends Component {
  render() {
    const { courseList } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row flex-auto pb-10px">
            <div className="col-md-5 col-sm-12">
              <div className="row">
                <div className="col-xl-9 col-sm-12">
                  <div className={`${styles.tutorCourseHeader} ${styles.courseName}`}>{this.context.t('course_name')}</div>
                </div>
                <div className="col-xl-3 col-sm-12 course-fee-col">
                  <div className={styles.tutorCourseHeader}>{this.context.t('tutor_course_fee')}</div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-sm-12">
              <div className="row">
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4">
                  <div className={styles.tutorCourseHeader}>{this.context.t('number_enrolled_student')}</div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4 max-student-col">
                  <div className={styles.tutorCourseHeader}>{this.context.t('maximum_student')}</div>
                </div>
                <div className="col-xl-2 col-sm-4 num-lesson-col">
                  <div className={styles.tutorCourseHeader}>{this.context.t('number_lesson')}</div>
                </div>
                <div className="col-xl-2 col-lg-4 col-md-4 col-sm-4 course-status-col">
                  <div className={styles.tutorCourseHeader}>{this.context.t('tutor_course_status')}</div>
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            {
              courseList.map(course => (
                <div className="col-md-12" key={`tutorCourse${course.id}`}>
                  <TutorCourseItem course={course} {...this.props} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}
TutorCourseList.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorCourseList.propTypes = {
  // the public course will have some additional feature like following
  courseList: React.PropTypes.array.isRequired
};

export default cssModules(TutorCourseList, styles);
