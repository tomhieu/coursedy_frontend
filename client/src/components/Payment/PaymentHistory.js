import React, { Component } from 'react'
import ObjectUtils from '../../utils/ObjectUtils'

class PaymentHistory extends Component {
  render() {
    const { paymentHistory, isFetching } = this.props
    return (
      <div className="col-xs-12">
        <div className="panel panel-primary">
          <div className="panel-body">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Đơn hàng</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className="text-right">Giá trị</th>
                </tr>
              </thead>
              <tbody>
              {
                paymentHistory.map((item) => (
                  <tr key={item.id + item.title}>
                    <td>{item.created_at}</td>
                    <td>#{item.order_id}</td>
                    <td>{item.title}</td>
                    <td><i className="fa fa-print"></i></td>
                    <td>{item.status}</td>
                    <td className="text-right">{ ObjectUtils.currencyFormat(item.value) }</td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default PaymentHistory