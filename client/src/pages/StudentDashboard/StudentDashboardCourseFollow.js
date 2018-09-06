import React, { Component } from 'react';
import StudentDashboard from './StudentDashboard';
import StudentCoursesFollowContainer from '../../containers/Student/Dashboard/Courses/StudentCoursesFollowContainer';

class StudentDashboardCourseFollow extends Component {
  render() {
    return (
      <StudentDashboard>
        <StudentCoursesFollowContainer />
      </StudentDashboard>
    );
  }
}

export default StudentDashboardCourseFollow;
