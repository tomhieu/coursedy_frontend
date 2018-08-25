import { Component } from 'react';
import * as React from 'react';
import FormField from '../../../Core/FormField';
import PrimaryButton from '../../../Core/PrimaryButton/PrimaryButton';


export default class PaymentSettingForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div className="col-md-4">
          <FormField
            fieldId="manual"
            fieldLabel={this.context.t('admin_payment_methods_manual')}
            placeholder={this.context.t('admin_payment_methods_manual')}
            isMandatoryField
            formControlName="manual"
            typeField="checkbox"
          />
        </div>
        <div className="col-md-4">
          <FormField
            fieldId="paypal"
            fieldLabel={this.context.t('admin_payment_methods_paypal')}
            placeholder={this.context.t('admin_payment_methods_paypal')}
            isMandatoryField
            formControlName="paypal"
            typeField="checkbox"
          />
        </div>
        <div className="col-md-4">
          <FormField
            fieldId="visa"
            fieldLabel={this.context.t('admin_payment_methods_visa')}
            placeholder={this.context.t('admin_payment_methods_visa')}
            isMandatoryField
            formControlName="visa"
            typeField="checkbox"
          />
        </div>
      </form>
    );
  }
}

PaymentSettingForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

PaymentSettingForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};
