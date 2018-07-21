import * as React from "react";
import {Component} from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {validate} from '../../../../validations/BankAccountFormValidator'
import {
  BankAccountForm
} from "../../../../components/Admin"
import {
  STORE_ADMIN_BANK_ACCOUNT,
  UPDATE_ADMIN_BANK_ACCOUNT,
  CLEAR_ADMIN_BANK_ACCOUNT
} from "../../../../actions/AsyncActionCreator"

class BankAccountContainer extends Component {
  saveBankAccount(data) {
    console.log('DEBUG saveBankAccount')
    console.log(data)
    if (data.id && data.id !== 0) {
      this.props.updateBankAccount(data)
    } else {
      this.props.storeBankAccount(data)
    }
    this.props.clearBankAccount()
  }

  clearBankAccount() {
    this.props.clearBankAccount()
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <BankAccountForm 
            {...this.props}
            onSubmit={this.saveBankAccount.bind(this)} 
            clearBankAccount={this.clearBankAccount.bind(this)}
          />
        </div>
      </div>
    )
  }
};

BankAccountContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  initialValues: state.AdminPaymentMethodsReducer.bankAccount
})

const mapDispatchToProps = (dispatch) => ({
  storeBankAccount: (props) => dispatch({
    type: STORE_ADMIN_BANK_ACCOUNT,
    // payload: Network().post('bank-accounts'),
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve({
          id: 1000,
          ...props
        })
      }, 250)
    })
  }),
  updateBankAccount: (props) => dispatch({
    type: UPDATE_ADMIN_BANK_ACCOUNT,
    // payload: Network().put('bank-accounts/props.id'),
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(props)
      }, 250)
    })
  }),
  clearBankAccount: (props) => dispatch({
    type: CLEAR_ADMIN_BANK_ACCOUNT
  }),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'bankAccount',
  fields: [
    'name', 
    'bankAccount.accountName', 
    'bankAccount.accountNumber', 
    'bankAccount.accountOffice'
  ],
  enableReinitialize: true,
  validate
})(BankAccountContainer));
