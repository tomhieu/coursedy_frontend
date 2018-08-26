import * as React from 'react';
import { Component } from 'react';
import { TT } from 'utils/locale';
import Select2 from 'react-select2-wrapper';

export class DomesticBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBank: { accountNumber: '', accountName: '', transactionOffice: '' }
    };
  }

  onSelectBank(e) {
    const selectedBanks = this.props.supportedBankList.filter(b => b.id == e.target.value);
    this.setState = { selectedBank: selectedBanks[0] };
  }

  render() {
    const { supportedBankList = [] } = this.props;
    const { accountNumber, accountName, transactionOffice } = this.state.selectedBank;
    return (
      <div>
        <Select2
          placeholder={this.context.t('select_domestic_bank')}
          disabled={false}
          data={supportedBankList.map((bank) => {
            return { id: bank.id, text: bank.name };
          })}
          onChange={this.onSelectBank.bind(this)}
        />
        <BankAccount accountNumber={accountNumber} accountName={accountName} transaction={transactionOffice} />
      </div>
    );
  }
}

const BankAccount = (props) => {
  const { accountNumber, accountName, transaction } = props;
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
  );
};

DomesticBank.contextTypes = {
  t: React.PropTypes.func.isRequired
};

DomesticBank.propTypes = {
  supportedBankList: React.PropTypes.array.isRequired,
};
