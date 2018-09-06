import React, { Component } from 'react';
import AccountProfileContainer from 'containers/Admin/Account/AccountProfileContainer';
import AdminDashboard from './AdminDashboard';


class AdminDashboardAccount extends Component {
  render() {
    return (
      <AdminDashboard>
        <AccountProfileContainer />
      </AdminDashboard>
    );
  }
}

export default AdminDashboardAccount;
