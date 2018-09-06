import React, { Component } from 'react';
import TeacherListContainer from 'containers/Admin/Dashboard/Teachers/TeacherListContainer';
import AdminDashboard from './AdminDashboard';


class AdminDashboardTeacherList extends Component {
  render() {
    return (
      <AdminDashboard>
        <TeacherListContainer />
      </AdminDashboard>
    );
  }
}

export default AdminDashboardTeacherList;
