import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseDetailHeader.module.scss';
import RatingItem from "../../Rating/index";
import DateUtils from "../../../utils/DateUtils";


class CourseDetailHeader extends Component {
  render() {
    const { categories, course, course_tutor, course_sections, course_comments } = this.props;
    return (
      <div className={styles.courseDetailHeader}>
        <div className="container">
          <div className={styles.courseTitle + " content mb-15"}>
            <h2>{
              course && course.title ?
                course.title : this.context.t('unknown')
            }</h2>
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
                  {this.context.t('header_teacher_name', {teacherName: course && course.user ? course.user.name : this.context.t('unknown')})}
                </div>
                <div className={styles.lastUpdate}>
                  {this.context.t('header_last_update', {lastUpdate: course && course.updated_date ? DateUtils.formatDate(course.updated_date) : this.context.t('unknown')})}
                </div>
              </div>
            </div>
            <div className={styles.courseRatingInfo}>
              <RatingItem num_stars={4} num_reviews={100}/>
            </div>
            <div className={styles.courseSummaryInfo}>
              <div className="d-flex flex-row">
                <div className={styles.numberLesson}>{this.context.t('header_number_lesson', {numberLesson: course_sections.length})}</div>
                <div className={styles.periodLesson}>{this.context.t('header_period_lesson', {periodLesson: 45})}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CourseDetailHeader.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailHeader.propTypes = {
};

export default cssModules(CourseDetailHeader, styles);