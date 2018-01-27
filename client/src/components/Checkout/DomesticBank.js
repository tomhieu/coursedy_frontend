import {Component} from "react";
import * as React from "react";
import {TT} from "utils/locale";

export class DomesticBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBank: undefined
    }
  }

  onSelectBank(e) {
    const selectedBanks = this.props.supportedBankList.filter((b) => b.id == e.target.value);
    this.setState = {selectedBank: selectedBanks[0]};
  }

  render() {
    const {supportedBankList} = this.props;
    const {accountNumber, accountName, transactionOffice} = this.state.selectedBank;
    return (
      <div>
        <Select2 {...input} disabled={disabled} data={supportedBankList} onChange={this.onSelectBank.bind(this)}/>
        <BankAccount accountNumber={accountNumber} accountName={accountName} transaction={transactionOffice}>
        </BankAccount>
      </div>
    )
  }
}

const BankAccount = (props) => {
  const {accountNumber, accountName, transaction} = props;
  return (
    <div className="d-flex flex-vertical">
      <div className="d-flex flex-horizontal">
        <span>{TT.t('bank_name')}</span>
        <span>{accountName}</span>
      </div>
      <div className="d-flex flex-horizontal">
        <span>{TT.t('bank_number')}</span>
        <span>{accountNumber}</span>
      </div>
      <div className="d-flex flex-horizontal">
        <span>{TT.t('transaction_office')}</span>
        <span>{transaction}</span>
      </div>
    </div>
  )
}

DomesticBank.contextTypes = {
  t: React.PropTypes.func.isRequired
}

DomesticBank.propTypes = {
  supportedBankList: React.PropTypes.array.isRequired
};