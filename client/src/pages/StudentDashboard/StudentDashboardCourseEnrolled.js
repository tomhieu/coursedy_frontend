import React, { Component } from 'react';
import StudentDashboard from './StudentDashboard';
import StudentCoursesEnrolledContainer from '../../containers/Student/Dashboard/Courses/StudentCoursesEnrolledContainer';

class StudentDashboardCourseEnrolled extends Component {
  render() {
    return (
      <StudentDashboard>
        <StudentCoursesEnrolledContainer />
      </StudentDashboard>
    );
  }
}

export default StudentDashboardCourseEnrolled;
