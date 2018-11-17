import React, { Component } from 'react';
import ListTutorCourseContainer from 'containers/Courses/CourseList/ListTutorCourseContainer';
import { CourseStatus } from 'constants/CourseStatus';
import TutorDashboard from './TutorDashboard';

class TutorDashboardCourseFinished extends Component {
  render() {
    return (
      <TutorDashboard>
        <ListTutorCourseContainer status={CourseStatus.FINISHED} />
      </TutorDashboard>
    );
  }
}

export default TutorDashboardCourseFinished;
