import React, { Component } from 'react';
import PaymentMethodsContainer from 'containers/Admin/Dashboard/PaymentMethods/PaymentMethodsContainer';
import AdminDashboard from './AdminDashboard';


class AdminDashboardPaymentMethod extends Component {
  render() {
    return (
      <AdminDashboard>
        <PaymentMethodsContainer />
      </AdminDashboard>
    );
  }
}

export default AdminDashboardPaymentMethod;
