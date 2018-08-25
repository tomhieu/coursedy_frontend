import * as React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { validate } from '../../../../validations/BankAccountFormValidator';
import {
  BankAccountForm,
  PaymentSettingForm
} from '../../../../components/Admin';
import {
  STORE_ADMIN_PAYMENT_SETTINGS,
} from '../../../../actions/AsyncActionCreator';

class PaymentSettingContainer extends Component {
  savePaymentSettings(data) {
    console.log('DEBUG savePaymentSettings');
    console.log(data);
    this.props.storePaymentSettings(data);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <PaymentSettingForm
            {...this.props}
            onSubmit={this.savePaymentSettings.bind(this)}
          />
        </div>
      </div>
    );
  }
}

PaymentSettingContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  initialValues: state.AdminPaymentMethodsReducer.paymentSettings
});

const mapDispatchToProps = dispatch => ({
  storePaymentSettings: props => dispatch({
    type: STORE_ADMIN_PAYMENT_SETTINGS,
    // payload: Network().post('payment-settings'),
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(props);
      }, 250);
    })
  }),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'paymentSetting',
  fields: [
    'manual',
    'paypal',
    'visa'
  ],
  onChange: (values, dispatch, props, previousValues) => {
    props.storePaymentSettings(values);
  },
  validate
})(PaymentSettingContainer));
