import {Component} from "react";
import * as React from "react";
import TrashIcon from "../../../Core/Icons/TrashIcon";
import SettingIcon from "../../../Core/Icons/SettingIcon";

class BankAccountList extends Component {
  fetchBankAccountHdl(bankAccount) {
    console.log('DEBUG fetchBankAccount')
    console.log(bankAccount)
    this.props.fetchBankAccount(bankAccount)
  }
  deleteBankAccountHdl(bankAccount) {
    console.log('DEBUG deleteBankAccount')
    console.log(bankAccount)
    if (confirm('Are you sure?')) {
      this.props.deleteBankAccount(bankAccount)
    }
  }

  render() {
    const { bankAccounts } = this.props
    return (
      <table className="table table-responsive table-borderd">
        <thead>
          <tr>
            <th>Tên ngân hàng</th>
            <th>Chủ tài khoản</th>
            <th>Số tài khoản</th>
            <th>Chi nhánh</th>
            <th>
            </th>
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