import React, { Component } from 'react';
import CourseListContainer from 'containers/Admin/Dashboard/Courses/CourseListContainer';
import AdminDashboard from './AdminDashboard';


class AdminDashboardCourseList extends Component {
  render() {
    return (
      <AdminDashboard>
        <CourseListContainer />
      </AdminDashboard>
    );
  }
}

export default AdminDashboardCourseList;
