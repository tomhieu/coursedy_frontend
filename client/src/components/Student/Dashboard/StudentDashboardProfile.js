import React, { Component } from 'react';

class StudentDashboardProfile extends Component {
  render() {
    return (
      <h1>StudentDashboardProfile</h1>
    );
  }
}

StudentDashboardProfile.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default StudentDashboardProfile;
