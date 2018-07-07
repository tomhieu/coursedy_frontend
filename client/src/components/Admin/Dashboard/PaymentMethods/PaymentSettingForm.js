import {Component} from "react";
import * as React from "react";
import FormField from "../../../Core/FormField"

export default class PaymentSettingForm extends Component {
  render() {
    const {handleSubmit} = this.props
    let self = this

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div className="col-md-4">
          <FormField fieldId="manual" fieldLabel={'Chuyển khoản'}
              placeholder={'Chuyển khoản'} isMandatoryField={true}
              formControlName="manual" typeField="checkbox"/>
        </div>
        <div className="col-md-4">
          <FormField fieldId="paypal" fieldLabel={'Paypal'}
                placeholder={'Paypal'} isMandatoryField={true}
                formControlName="paypal" typeField="checkbox"/>
        </div>
        <div className="col-md-4">
          <FormField fieldId="visa" fieldLabel={'Visa / MasterCard'}
                placeholder={'Visa / MasterCard'} isMandatoryField={true}
                formControlName="bank_account_number" typeField="checkbox"/>
        </div>
        <button type="submit" className="btn">Cập nhật</button>
      </form>
    )
  }
}

PaymentSettingForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PaymentSettingForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}