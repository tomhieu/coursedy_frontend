import React, { Component } from 'react';
import StudentDashboard from './StudentDashboard';
import TutorProfileDetailsContainer from '../../containers/Tutor/Profile/TutorProfileDetailsContainer';

class StudentDashboardProfile extends Component {
  render() {
    return (
      <StudentDashboard>
        <TutorProfileDetailsContainer />
      </StudentDashboard>
    );
  }
}

export default StudentDashboardProfile;
