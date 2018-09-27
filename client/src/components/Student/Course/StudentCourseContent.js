import React, {Component} from 'react';
import './StudentCourseContent.scss';
import CourseDetailLessons from '../../Courses/CourseDetail/CourseDetailLessons';
import CourseDetailTutor from '../../Courses/CourseDetail/CourseDetailTutor';
import StudentCourseDetailIntro from './StudentCourseDetailIntro';

class CourseDetailRightSide extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { course_sections } = this.props;
    return (
      <div className="course-summary">
        <div className="detail-content-wrapper">
          <StudentCourseDetailIntro {...this.props} showCourseSummary={false} />
          {
            course_sections.length
              ? <CourseDetailLessons {...this.props} forStudentView={true} /> : null
          }
          <CourseDetailTutor {...this.props} />
        </div>
      </div>
    );
  }
}

CourseDetailRightSide.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseDetailRightSide.propTypes = {
};

export default CourseDetailRightSide;
