import React, { Component } from 'react';
import TutorDashboard from './TutorDashboard';
import CourseFormContainer from '../../containers/Courses/CourseForm/CourseFormContainer';

class TutorDashboardCourseNew extends Component {
  render() {
    return (
      <TutorDashboard>
        <CourseFormContainer />
      </TutorDashboard>
    );
  }
}

export default TutorDashboardCourseNew;
