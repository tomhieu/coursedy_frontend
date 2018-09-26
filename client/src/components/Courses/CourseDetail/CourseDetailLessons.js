import React, { Component } from 'react';
import './CourseDetailLessons.scss';
import { PUBLIC_COURSE_DETAIL_MENU_LESSONS } from '../../../constants/WebConstants.js';
import SectionDetails from './SectionDetails';
/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailLessons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { course_sections, activeMenu } = this.props;
    const active = activeMenu === PUBLIC_COURSE_DETAIL_MENU_LESSONS;
    return (
      <div id="course-detail-lessons" className="course-detail-section">
        <div className="coursedy-headline text-left mb-20">
          <h3>{this.context.t('course_lessons')}</h3>
        </div>
        <div className="course-lession-wrapper-2">
          {
            course_sections.map((course_section, index) => (
              <SectionDetails section={course_section} key={index} />
            ))
          }
        </div>
      </div>
    );
  }
}

CourseDetailLessons.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseDetailLessons.propTypes = {
};

export default CourseDetailLessons;
