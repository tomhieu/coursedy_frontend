import {Component} from "react";
import * as React from "react";
import FormField from "../../../Core/FormField"
import PrimaryButton from "../../../Core/PrimaryButton/PrimaryButton"
import { banks } from "../../../../constants/Banks"
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
            <FormField fieldId="bankName" fieldLabel={this.context.t('admin_payment_methods_bank_name')}
                isMandatoryField={true}
                formControlName="name" typeField="custom_select"
                option={banks.map(item => {return {id: item.code, text: item.name}})} />
          </div>
          <div className="bank-account-name">
            <FormField fieldId="bankAccountName" fieldLabel={this.context.t('admin_payment_methods_account_name')}
                  placeholder={this.context.t('admin_payment_methods_account_name')} isMandatoryField={true}
                  formControlName="bankAccount.accountName" typeField="custom_input"/>
          </div>
          <div className="bank-account-number">
            <FormField fieldId="bankAccountNumber" fieldLabel={this.context.t('admin_payment_methods_account_number')}
                  placeholder={this.context.t('admin_payment_methods_account_number')} isMandatoryField={true}
                  formControlName="bankAccount.accountNumber" typeField="custom_input"/>
          </div>
          <div className="bank-account-office">
            <FormField fieldId="bankAccountOffice" fieldLabel={this.context.t('admin_payment_methods_account_office')}
                  placeholder={this.context.t('admin_payment_methods_account_office')} isMandatoryField={true}
                  formControlName="bankAccount.accountOffice" typeField="custom_input"/>
          </div>
        </div>

        <PrimaryButton type={'submit'} title={this.context.t('admin_payment_methods_save')} />
        <PrimaryButton 
          type={'button'} 
          title={this.context.t('admin_payment_methods_cancel')} 
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