import React, { Component } from 'react';
import StudentDashboard from './StudentDashboard';
import StudentCoursesFollowContainer from '../../containers/Student/Dashboard/Courses/StudentCoursesFollowContainer';
import StudentCourseDetailContainer from '../../containers/Student/Dashboard/Courses/StudentCourseDetailContainer';

class StudentDashboardCourseDetails extends Component {
  render() {
    const courseId = this.props.match.params.id;
    return (
      <StudentDashboard>
        <StudentCourseDetailContainer courseId={courseId} />
      </StudentDashboard>
    );
  }
}

export default StudentDashboardCourseDetails;
