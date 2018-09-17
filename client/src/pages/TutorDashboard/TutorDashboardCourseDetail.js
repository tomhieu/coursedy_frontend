import React, {Component} from 'react';
import TutorDashboard from './TutorDashboard';
import CourseFormContainer from '../../containers/Courses/CourseForm/CourseFormContainer';

class TutorDashboardCourseDetail extends Component {
  render() {
    let courseId;
    if (this.props.match) {
      courseId = this.props.match.params.id;
    }
    return (
      <TutorDashboard>
        <CourseFormContainer courseId={courseId} />
      </TutorDashboard>
    );
  }
}

export default TutorDashboardCourseDetail;
