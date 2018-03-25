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
                  <th>{this.context.t('payment_created_at')}</th>
                  <th>{this.context.t('payment_order')}</th>
                  <th>{this.context.t('payment_content')}</th>
                  <th>{this.context.t('payment_invoice')}</th>
                  <th>{this.context.t('payment_status')}</th>
                  <th className="text-right">{this.context.t('payment_value')}</th>
                </tr>
              </thead>
              <tbody>
              {
                paymentHistory.map((item) => (
                  <tr key={item.id + item.content}>
                    <td>{item.created_at}</td>
                    <td>#{item.order_id}</td>
                    <td>{item.content}</td>
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

PaymentHistory.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PaymentHistory.propTypes = {
}


export default PaymentHistory