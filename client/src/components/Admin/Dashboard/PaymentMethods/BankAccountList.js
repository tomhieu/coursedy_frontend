import {Component} from "react";
import * as React from "react";
import TrashIcon from "../../../Core/Icons/TrashIcon";
import SettingIcon from "../../../Core/Icons/SettingIcon";

class BankAccountList extends Component {
  fetchBankAccountHdl(bankAccount) {
    this.props.fetchBankAccount(bankAccount)
  }
  deleteBankAccountHdl(bankAccount) {
    if (confirm(this.context.t('admin_payment_methods_bank_account_delete_confirm'))) {
      this.props.deleteBankAccount(bankAccount)
    }
  }

  render() {
    const { bankAccounts } = this.props
    return (
      <table className="table table-responsive table-borderd">
        <thead>
          <tr>
            <th>{this.context.t('admin_payment_methods_bank_name')}</th>
            <th>{this.context.t('admin_payment_methods_account_name')}</th>
            <th>{this.context.t('admin_payment_methods_account_number')}</th>
            <th>{this.context.t('admin_payment_methods_account_office')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          bankAccounts.map((item, index) => (
            <tr key={item.id + item.name}>
              <td>{item.name}</td>
               <td>{item.bankAccount.accountName}</td>
               <td>{item.bankAccount.accountNumber}</td>
               <td>{item.bankAccount.accountOffice}</td>
               <td>
                  <button type="button" onClick={this.fetchBankAccountHdl.bind(this, item)}>
                    <SettingIcon width={14} height={14}></SettingIcon>
                  </button>
                  <button type="button" onClick={this.deleteBankAccountHdl.bind(this, item)}>
                    <TrashIcon width={14} height={14}></TrashIcon>
                  </button>
               </td>
             </tr>
           ))
        }
        </tbody>
      </table>
    )
  }
}

BankAccountList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

BankAccountList.propTypes = {
  bankAccounts: React.PropTypes.array.isRequired,
}

export default BankAccountList