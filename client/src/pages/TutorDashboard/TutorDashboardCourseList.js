import React, { Component } from 'react';
import ListTutorCourseContainer from 'containers/Courses/CourseList/ListTutorCourseContainer';
import { CourseStatus } from 'constants/CourseStatus';

import TutorDashboard from './TutorDashboard';

class TutorDashboardCourseList extends Component {
  render() {
    return (
      <TutorDashboard>
        <ListTutorCourseContainer status={CourseStatus.NOT_STARTED} />
      </TutorDashboard>
    );
  }
}

export default TutorDashboardCourseList;
