import {Component} from "react";
import * as React from "react";
import FormField from "../../../Core/FormField"
import PrimaryButton from "../../../Core/PrimaryButton/PrimaryButton"

export default class BankAccountForm extends Component {

  resetForm() {
    this.props.clearBankAccount()
    this.props.reset()
  }

  render() {
    const {handleSubmit} = this.props

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div className="bank-account">
          <div className="bank-name">
            <FormField fieldId="bankName" fieldLabel={'Tên ngân hàng'}
                  placeholder={'Tên ngân hàng'} isMandatoryField={true}
                  formControlName="name" typeField="custom_input"/>
          </div>
          <div className="bank-account-name">
            <FormField fieldId="bankAccountName" fieldLabel={'Chủ tài khoản'}
                  placeholder={'Chủ tài khoản'} isMandatoryField={true}
                  formControlName="bankAccount.accountName" typeField="custom_input"/>
          </div>
          <div className="bank-account-number">
            <FormField fieldId="bankAccountNumber" fieldLabel={'Số tài khoản'}
                  placeholder={'Số tài khoản'} isMandatoryField={true}
                  formControlName="bankAccount.accountNumber" typeField="custom_input"/>
          </div>
          <div className="bank-account-office">
            <FormField fieldId="bankAccountOffice" fieldLabel={'Chi nhánh'}
                  placeholder={'Chi nhánh'} isMandatoryField={true}
                  formControlName="bankAccount.accountOffice" typeField="custom_input"/>
          </div>
        </div>

        <PrimaryButton type={'submit'} title={"Lưu"} />
        <PrimaryButton 
          type={'button'} 
          title={"Xóa"} 
          isPrimary={false}
          callback={this.resetForm.bind(this)}
        />
        {/*<button type="submit" className="btn btn-primary">Thêm tài khoản</button>*/}
        {/*<button type="reset" className="btn btn-default">Xóa</button>*/}
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