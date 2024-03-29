import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import ObjectUtils from '../../utils/ObjectUtils';
import {
  PAYMENT_HISTORY_PAGINATION_MAX_ITEM_PER_PAGE,
  PAYMENT_HISTORY_PAGINATION_MAX_NUMBER_DISPLAY_PAGE
} from '../../constants/WebConstants';

class PaymentHistory extends Component {
  render() {
    const {
      paymentHistory, isFetching, handlePageChange, currentPage, totalResult
    } = this.props;
    return (
      <div className="col-xs-12">
        <div className="panel panel-primary">
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table">
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
                  paymentHistory.map(item => (
                    <tr key={item.id + item.content}>
                      <td>{item.created_at}</td>
                      <td>
#
                        {item.order_id}
                      </td>
                      <td>{item.content}</td>
                      <td><i className="fa fa-print" /></td>
                      <td>{item.status}</td>
                      <td className="text-right">{ ObjectUtils.currencyFormat(item.value) }</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>

            <br />
            <br />
            {
              !isFetching && paymentHistory.length > PAYMENT_HISTORY_PAGINATION_MAX_ITEM_PER_PAGE ? (
                <div className="pagination-course_list">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={PAYMENT_HISTORY_PAGINATION_MAX_ITEM_PER_PAGE}
                    totalItemsCount={totalResult}
                    pageRangeDisplayed={PAYMENT_HISTORY_PAGINATION_MAX_NUMBER_DISPLAY_PAGE}
                    onChange={handlePageChange}
                  />
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

PaymentHistory.contextTypes = {
  t: React.PropTypes.func.isRequired
};

PaymentHistory.propTypes = {
};


export default PaymentHistory;
