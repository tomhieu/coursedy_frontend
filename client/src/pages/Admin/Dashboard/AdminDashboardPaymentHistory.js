import React, { Component } from 'react';
import PaymentHistoryContainer from 'containers/Admin/Dashboard/PaymentHistory/PaymentHistoryContainer';
import AdminDashboard from './AdminDashboard';


class AdminDashboardPaymentHistory extends Component {
  render() {
    return (
      <AdminDashboard>
        <PaymentHistoryContainer />
      </AdminDashboard>
    );
  }
}

export default AdminDashboardPaymentHistory;
