import React, { Component } from 'react';
import ListTutorCourseContainer from 'containers/Courses/CourseList/ListTutorCourseContainer';
import { CourseStatus } from 'constants/CourseStatus';

import TutorDashboard from './TutorDashboard';

class TutorDashboardCoursePending extends Component {
  render() {
    return (
      <TutorDashboard>
        <ListTutorCourseContainer status={CourseStatus.PENDING} />
      </TutorDashboard>
    );
  }
}

export default TutorDashboardCoursePending;
