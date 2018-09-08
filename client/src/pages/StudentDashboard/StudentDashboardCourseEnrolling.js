import React, { Component } from 'react';
import StudentDashboard from './StudentDashboard';
import StudentCoursesEnrollingContainer from '../../containers/Student/Dashboard/Courses/StudentCoursesEnrollingContainer';

class StudentDashboardCourseEnrolling extends Component {
  render() {
    return (
      <StudentDashboard>
        <StudentCoursesEnrollingContainer />
      </StudentDashboard>
    );
  }
}

export default StudentDashboardCourseEnrolling;
