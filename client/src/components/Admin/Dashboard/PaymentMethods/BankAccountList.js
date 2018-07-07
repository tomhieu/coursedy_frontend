import {Component} from "react";
import * as React from "react";

export default class BankAccountList extends Component {
  render() {
    const {bankAccounts, deleteBankAccount} = this.props
    return (
      <table>
        <thead>
          <tr>
            <th>Tên ngân hàng</th>
            <th>Chủ tài khoản</th>
            <th>Số tài khoản</th>
            <th>Chi nhánh</th>
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
                <button onClick={deleteBankAccount(item.id)}>Delete</button>
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
  deleteBankAccount: React.PropTypes.func.isRequired
}