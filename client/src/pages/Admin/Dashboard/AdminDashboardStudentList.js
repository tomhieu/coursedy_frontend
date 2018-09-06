import React, { Component } from 'react';
import StudentListContainer from 'containers/Admin/Dashboard/Students/StudentListContainer';
import AdminDashboard from './AdminDashboard';


class AdminDashboardStudentList extends Component {
  render() {
    return (
      <AdminDashboard>
        <StudentListContainer />
      </AdminDashboard>
    );
  }
}

export default AdminDashboardStudentList;
