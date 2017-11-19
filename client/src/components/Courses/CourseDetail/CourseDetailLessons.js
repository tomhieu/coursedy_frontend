import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailLessons extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="course-detail-lessons">
        <div className="col-md-12">
          <h3 className="heading-line">{this.context.t('course_detail')}</h3>
          <div className="course-content">
          {
            this.props.course_sections.map((course_section, index) => (
            <table className="table table-responsive" key={course_section.title + index}>
              <thead>
                <tr className={styles.rowPrimary}>
                  <th className="text-left" colSpan="2">{course_section.title}</th>
                </tr>
              </thead>
              <tbody>
              {
                course_section.lessons.map((lesson, index) => (
                <tr key={lesson.title + index}>
                  <td className="text-left">{lesson.title}</td>
                  <td className="text-right">{lesson.period} phút</td>
                </tr>
                ))
              }
              </tbody>
            </table>
            ))
          }
          </div>
          {/*<div className="text-center">
            <button className="btn btn-primary"></button>
          </div>*/}
        </div>{/* Course content */}
      </div>
    )
  }
}

CourseDetailLessons.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailLessons.propTypes = {
};

export default cssModules(CourseDetailLessons, styles);
