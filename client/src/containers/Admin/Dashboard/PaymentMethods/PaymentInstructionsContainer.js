import * as React from "react";
import {Component} from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {validate} from '../../../../validations/BankAccountFormValidator'
import {
  BankAccountForm,
  PaymentInstructionsForm
} from "../../../../components/Admin"
import {
  STORE_ADMIN_PAYMENT_INSTRUCTIONS,
} from "../../../../actions/AsyncActionCreator"

class PaymentInstructionsContainer extends Component {
  savePaymentInstructions(data) {
    console.log('DEBUG savePaymentInstructions')
    console.log(data)
    this.props.storePaymentInstructions(data)
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <PaymentInstructionsForm 
            {...this.props}
            onSubmit={this.savePaymentInstructions.bind(this)} 
          />
        </div>
      </div>
    )
  }
};

PaymentInstructionsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  initialValues: state.AdminPaymentMethodsReducer.PaymentInstructionss
})

const mapDispatchToProps = (dispatch) => ({
  storePaymentInstructions: (props) => dispatch({
    type: STORE_ADMIN_PAYMENT_INSTRUCTIONS,
    // payload: Network().post('payment-settings'),
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(props)
      }, 250)
    })
  }),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'PaymentInstructions',
  fields: [
    'manual_instruct',
    'transfer_instruct',
  ],
  onChange: (values, dispatch, props, previousValues) => {
    props.storePaymentInstructions(values)
  },
  validate
})(PaymentInstructionsContainer));
