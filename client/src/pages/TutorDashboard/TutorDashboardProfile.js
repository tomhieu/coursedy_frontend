import React, { Component } from 'react';
import TutorProfileDetailsContainer from '../../containers/Tutor/Profile/TutorProfileDetailsContainer';
import TutorDashboard from './TutorDashboard';

class TutorDashboardProfile extends Component {
  render() {
    return (
      <TutorDashboard>
        <TutorProfileDetailsContainer />
      </TutorDashboard>
    );
  }
}

export default TutorDashboardProfile;
