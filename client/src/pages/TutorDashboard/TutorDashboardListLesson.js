import React, { Component } from 'react';
import TutorDashboard from './TutorDashboard';
import ListLessonContainer from '../../containers/Courses/Lesson/ListLessonContainer';

class TutorDashboardListLesson extends Component {
  render() {
    return (
      <TutorDashboard>
        <ListLessonContainer />
      </TutorDashboard>
    );
  }
}

export default TutorDashboardListLesson;
