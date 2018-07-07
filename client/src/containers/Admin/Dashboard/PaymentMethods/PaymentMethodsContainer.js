import React, { Component } from 'react'
import {connect} from "react-redux";
import ObjectUtils from "../../../../utils/ObjectUtils"
import ReactTable from 'react-table'
import "react-table/react-table.css";
import Network from "utils/network";
import DateUtils from "utils/DateUtils";
import {reduxForm} from "redux-form";
import cssModules from 'react-css-modules';
import styles from './PaymentMethodsContainer.module.scss';
import FormField from "../../../../components/Core/FormField";
import {
  FETCH_ADMIN_STUDENTS,
  FETCH_ADMIN_PAYMENT_SETTINGS,
  FETCH_ADMIN_PAYMENT_INTEGRATIONS,
  FETCH_ADMIN_BANK_ACCOUNTS
} from "../../../../actions/AsyncActionCreator"
import {validate} from '../../../../validations/PaymentMethodFormValidator'
import {
  BankAccountForm,
  BankAccountList,
  PaymentSettingForm,
  PaymentIntegrationForm
} from "../../../../components/Admin"

class PaymentMethodsContainer extends Component {
  componentDidMount() {
    this.props.fetchPaymentSettings(this.props)
    this.props.fetchPaymentIntergrations(this.props)
    this.props.fetchBankAccounts(this.props)
  }

  deleteBankAccount() {
    console.log('DEBUG deleteBankAccounte')
    // this.props.deleteBankAccount(0)
  }

  saveBankAccount(data) {
    const {bank_name, bank_account_name, bank_account_number, bank_account_office} = data
    console.log('DEBUG saveBankAccount')
    console.log(data)
  }

  savePaymentSetting(data) {
    console.log('DEBUG savePaymentSetting')
  }

  savePaymentIntegration(data) {
    console.log('DEBUG savePaymentIntegration')
  }

  render() {
    const { paymentSettings, paymentIntegrations, bankAccounts } = this.props;
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">Phương thức thanh toán</span>
          </div>

          {/*Payment Setting Form*/}
          <div className="col-md-12">
            <PaymentSettingForm
              onSubmit={this.savePaymentSetting.bind(this)}
              {...this.props}
            ></PaymentSettingForm>
          </div>
  
          {/*Payment Integration Form*/}
          <div className="col-md-12">
            <PaymentIntegrationForm
              {...this.props}
              onSubmit={this.savePaymentIntegration.bind(this)}
            ></PaymentIntegrationForm>
          </div>

          {/*Bank account list*/}
          <div className="col-md-12">
            <BankAccountList
              bankAccounts={bankAccounts}
              deleteBankAccount={this.deleteBankAccount.bind(this)}
            ></BankAccountList>
          </div>

          {/*Bank account form */}
          <div className="col-md-12">
            <BankAccountForm
              onSubmit={this.saveBankAccount.bind(this)}
              {...this.props}
            >
            </BankAccountForm>
          </div>
          

        </div>
      </div>

    )
  }
}

PaymentMethodsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
}

const buildQuery = (props) => {
  return {
    page: props.currentPage,
    per_page: props.perPage
  }
}

const mapStateToProps = (state) => ({
  paymentSettings: state.AdminPaymentMethodsReducer.paymentSettings,
  paymentIntegrations: state.AdminPaymentMethodsReducer.paymentIntegrations,
  bankAccounts: state.AdminPaymentMethodsReducer.bankAccounts,
  isLoading: state.AdminPaymentMethodsReducer.isLoading,
  initialValues: state.session.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  fetchPaymentSettings: (props) => dispatch({
    type: FETCH_ADMIN_PAYMENT_SETTINGS,
    // payload: Network().get('payment-settings'),
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve([
          {
            payment_method: 'manual',
            status: false
          }, {
            payment_method: 'paypal',
            status: true
          }, {
            payment_method: 'visa',
            status: false
          }
        ])
      }, 250)
    })
  }),
  fetchPaymentIntergrations: (props) => dispatch({
    type: FETCH_ADMIN_PAYMENT_INTEGRATIONS,
    // payload: Network().get('payment-intergrations'),
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve({
          stripe_api_key: '',
        })
      }, 250)
    })
  }),
  fetchBankAccounts: (props) => dispatch({
    type: FETCH_ADMIN_BANK_ACCOUNTS,
    // payload: Network().get('bank-accounts')
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve([
          {
            id: 1,
            name: "ACB",
            bankAccount: {
              accountName: "Pham Duy Bao Trung",
              accountNumber: "9124 6788 6778 900",
              accountOffice: "Ly Thuong Kiet"
            }
          }, {
            id: 2,
            name: "Vietcombank",
            bankAccount: {
              accountName: "Pham Duy Bao Trung",
              accountNumber: "9124 6788 6778 900",
              accountOffice: "Ly Thuong Kiet"
            }
          }
        ])
      }, 250)
    })
  }),
  storeBankAccount: (props) => dispatch({

  }),
  deleteBankAccount: (props) => dispatch({

  }),
  storePaymentSettings: (props) => dispatch({

  }),
  storePaymentIntegrations: (props) => dispatch({

  })
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'personInfo',
  fields: ['name', 'email', 'address', 'date_of_birth'],
  validate
})(cssModules(PaymentMethodsContainer, styles)));
