import {Component} from "react";
import * as React from "react";
import FormField from "../../../../components/Core/FormField"

export default class BankAccountForm extends Component {
  render() {
    const {handleSubmit, deleteBankAccount} = this.props
    let self = this

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div className="bank-account">
          <div className="bank-name">
            <FormField fieldId="bankName" fieldLabel={'Tên ngân hàng'}
                  placeholder={'Tên ngân hàng'} isMandatoryField={true}
                  formControlName="bank_name" typeField="text"/>
          </div>
          <div className="bank-account-name">
            <FormField fieldId="bankAccountName" fieldLabel={'Chủ tài khoản'}
                  placeholder={'Chủ tài khoản'} isMandatoryField={true}
                  formControlName="bank_account_name" typeField="text"/>
          </div>
          <div className="bank-account-number">
            <FormField fieldId="bankAccountNumber" fieldLabel={'Số tài khoản'}
                  placeholder={'Số tài khoản'} isMandatoryField={true}
                  formControlName="bank_account_number" typeField="text"/>
          </div>
          <div className="bank-account-office">
            <FormField fieldId="bankAccountOffice" fieldLabel={'Chi nhánh'}
                  placeholder={'Chi nhánh'} isMandatoryField={true}
                  formControlName="bank_account_office" typeField="text"/>
          </div>
        </div>
        <button type="submit" className="btn">Thêm tài khoản</button>
      </form>
    )
  }
}

BankAccountForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

BankAccountForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}