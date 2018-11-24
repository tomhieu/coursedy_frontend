import {Component} from "react";
import * as React from "react";
import FormField from "../../../Core/FormField"


export default class PaymentInstructionsForm extends Component {
  render() {
    const {handleSubmit, paymentSettings} = this.props

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-12">
            {
              paymentSettings.manual ? 
              <FormField fieldId="manual_instruct" fieldLabel={this.context.t('admin_payment_methods_manual_instruct')}
                  placeholder={this.context.t('admin_payment_methods_manual_instruct')} isMandatoryField={true}
                  formControlName="manual_instruct" typeField="custom_textarea"/>
              : null
            }
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-12">
              {
                paymentSettings.transfer ?
                <FormField fieldId="transfer_instruct" fieldLabel={this.context.t('admin_payment_methods_transfer_instruct')}
                  placeholder={this.context.t('admin_payment_methods_transfer_instruct')} isMandatoryField={true}
                  formControlName="transfer_instruct" typeField="custom_textarea"/>
                : null
              }
            </div>
          </div>
        </div>
      </form>
    )
  }
}

PaymentInstructionsForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PaymentInstructionsForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}