import React, { Component } from 'react';
import TutorAccount from 'containers/Account/Tutor/TutorAccountContainer';
import TutorDashboard from './TutorDashboard';


class TutorDashboardAccount extends Component {
  render() {
    return (
      <TutorDashboard>
        <TutorAccount />
      </TutorDashboard>
    );
  }
}

export default TutorDashboardAccount;
