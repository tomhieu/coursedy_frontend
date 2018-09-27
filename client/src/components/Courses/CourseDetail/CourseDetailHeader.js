import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseDetailHeader.module.scss';
import RatingItem from '../../Rating/index';
import DateUtils from '../../../utils/DateUtils';

class CourseDetailHeader extends Component {
  render() {
    const { categories, course, course_sections, forStudentView } = this.props;
    const completedLessons = [];
    course_sections.forEach(section => {
      completedLessons.push(section.lessons.filter(les => les.status === 'finished'));
    });
    return (
      <div className={styles.courseDetailHeader}>
        <div className="container">
          <div className="content mb-15">
            <h2 className={styles.courseTitle}>
              {
              course && course.title
                ? course.title : this.context.t('unknown')
            }
            </h2>
          </div>

          <div className="d-flex flex-column">
            <div className={styles.courseCategory}>
              {this.context.t('header_course_category', {
                course_category: categories.length > 0 ? categories[0].name : this.context.t('unknown')
              })}
            </div>
            <div className={styles.courseTeacherInfo}>
              <div className="d-flex flex-row">
                <div className={styles.teacherName}>
                  {this.context.t('header_teacher_name', { teacherName: course && course.user ? course.user.name : this.context.t('unknown') })}
                </div>
                <div className={styles.lastUpdate}>
                  {this.context.t('header_last_update', { lastUpdate: course && course.updated_at ? DateUtils.dateTimeFromNow(course.updated_at) : this.context.t('unknown') })}
                </div>
              </div>
            </div>
            <div className={styles.courseRatingInfo}>
              <RatingItem
                num_stars={course.rating_count === 0 ? 0 : parseFloat(course.rating_points) / course.rating_count}
                num_reviews={course.rating_count}
              />
            </div>
            {
              forStudentView ?
                <div>
                  <div className="d-flex flex-row">
                    <div className={styles.numberLesson}>{this.context.t('header_number_lesson', { numberLesson: course.lesson_count })}</div>
                    {
                      completedLessons.length > 0
                        ? completedLessons.length === 1 ? <div className={styles.periodLesson}>{this.context.t('header_number_completed_single_lesson')}</div>
                        : <div className={styles.periodLesson}>{this.context.t('header_number_completed_lessons', { numberLesson: completedLessons.length })}</div>
                        : <div className={styles.periodLesson}>{this.context.t('header_no_completed_lesson')}</div>
                    }
                  </div>
                </div> :
                <div className={styles.courseSummaryInfo}>
                  <div className="d-flex flex-row">
                    {
                      course.lesson_count > 0
                        ? <div className={styles.numberLesson}>{this.context.t('header_number_lesson', { numberLesson: course.lesson_count})}</div>
                        : null
                    }
                    {
                      course.lesson_count > 0
                        ? <div className={styles.periodLesson}>{this.context.t('header_available_lesson', { numberLesson: course.lesson_count })}</div>
                        : null
                    }
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

CourseDetailHeader.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseDetailHeader.propTypes = {
  forStudentView: React.PropTypes.bool
};

export default cssModules(CourseDetailHeader, styles);
