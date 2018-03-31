import React, { Component } from 'react'
import ObjectUtils from '../../utils/ObjectUtils'
import Pagination from 'react-js-pagination';
import {
  PAYMENT_HISTORY_PAGINATION_MAX_ITEM_PER_PAGE,
  PAYMENT_HISTORY_PAGINATION_MAX_NUMBER_DISPLAY_PAGE
} from '../../constants/WebConstants'

class PaymentHistory extends Component {
  render() {
    const { paymentHistory, isFetching, handlePageChange, currentPage, totalResult } = this.props
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

            {
              !isFetching && paymentHistory.length > 0 ? (
                <div className="pagination-course_list ">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={PAYMENT_HISTORY_PAGINATION_MAX_ITEM_PER_PAGE}
                    totalItemsCount={totalResult}
                    pageRangeDisplayed={PAYMENT_HISTORY_PAGINATION_MAX_NUMBER_DISPLAY_PAGE}
                    onChange={handlePageChange.bind(this)}
                  />
                </div>
              ) : null
            }
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