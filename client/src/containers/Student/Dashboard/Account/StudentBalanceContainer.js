import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { PaymentComponents } from '../../../../components/index';
import {
  PaymentActions
} from '../../../../actions/index';
import LoadingMask from '../../../LoadingMask/LoadingMask';
import { FETCH_PAYMENT_HISTORY } from '../../../../actions/AsyncActionCreator';

class StudentBalanceContainer extends Component {
  componentWillMount() {
    this.props.dispatch(PaymentActions.fetchPaymentHistory());
  }

  handlePageChange(currentPage) {
    console.log('DEBUG');
    console.log(currentPage);
    const query = {};
    query.page = currentPage;

    this.props.dispatch(PaymentActions.fetchPaymentHistory(query));
  }

  render() {
    const { paymentHistory, paymentHistoryPagination, isFetching } = this.props;
    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex justify-content-left mb-10">

          <LinkContainer className="nav-link" to="/login">
            <span className="nav-btn">{this.context.t('make_a_payment')}</span>
          </LinkContainer>
        </div>
        <div className="d-flex flex-auto">
          <LoadingMask belongingActions={[FETCH_PAYMENT_HISTORY]}>
            {
              paymentHistory.length !== 0
                ? (
                  <PaymentComponents.PaymentHistory
                    paymentHistory={paymentHistory}
                    currentPage={paymentHistoryPagination.currentPage}
                    totalResult={paymentHistoryPagination.totalResult}
                    handlePageChange={this.handlePageChange.bind(this)}
                  />
                ) : null
            }
          </LoadingMask>
        </div>
      </div>
    );
  }
}

StudentBalanceContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

const mapStateToProps = (state) => {
  const { Payment } = state;
  const {
    isFetchingPaymentHistory,
    paymentHistory,
    paymentHistoryPagination
  } = Payment;
  return { paymentHistory, paymentHistoryPagination, isFetching: isFetchingPaymentHistory };
};

export default connect(
  mapStateToProps
)(StudentBalanceContainer);
