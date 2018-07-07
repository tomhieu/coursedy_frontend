import {Component} from "react";
import * as React from "react";
import FormField from "../../../Core/FormField"

export default class PaymentIntegrationForm extends Component {
  render() {
    const {handleSubmit} = this.props
    let self = this

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div className="col-md-4">
          <div className="bank-name">
            <FormField fieldId="stripe_api_key" fieldLabel={'Stripe API key'}
                  placeholder={'Stripe API key'} isMandatoryField={true}
                  formControlName="stripe_api_key" typeField="text"/>
          </div>
        </div>
        <button type="submit" className="btn">Cập nhật</button>
      </form>
    )
  }
}

PaymentIntegrationForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PaymentIntegrationForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}