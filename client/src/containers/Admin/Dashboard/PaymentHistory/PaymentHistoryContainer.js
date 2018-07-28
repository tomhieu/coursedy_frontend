import React, { Component } from 'react'
import {connect} from "react-redux";
import cssModules from 'react-css-modules';
import styles from './PaymentHistoryContainer.module.scss';
import {
} from "../../../../actions/AsyncActionCreator"
import {
} from "../../../../components/Admin"

class PaymentHistoryContainer extends Component {
  componentDidMount() {
    this.props.fetchPaymentHistory()
  }

  render() {
    const { paymentHistory } = this.props;
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t('admin_payment_history')}</span>
          </div>
        </div>
      </div>
    )
  }
}

PaymentHistoryContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  fetchPaymentHistory: (props) => dispatch({

  })
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(cssModules(PaymentHistoryContainer, styles))
