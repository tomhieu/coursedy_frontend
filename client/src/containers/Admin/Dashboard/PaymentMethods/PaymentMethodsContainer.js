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
  FETCH_ADMIN_PAYMENT_INSTRUCTIONS,
  FETCH_ADMIN_PAYMENT_INTEGRATIONS,
  FETCH_ADMIN_BANK_ACCOUNTS,
  FETCH_ADMIN_BANK_ACCOUNT,
  DELETE_ADMIN_BANK_ACCOUNT
} from "../../../../actions/AsyncActionCreator"
import {
  BankAccountList,
} from "../../../../components/Admin"
import BankAccountContainer from "./BankAccountContainer"
import PaymentSettingContainer from "./PaymentSettingContainer"
import PaymentInstructionsContainer from "./PaymentInstructionsContainer"

class PaymentMethodsContainer extends Component {
  componentDidMount() {
    this.props.fetchPaymentSettings(this.props)
    this.props.fetchPaymentIntergrations(this.props)
    this.props.fetchBankAccounts(this.props)
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
            <span className="text-uppercase bold">{this.context.t('admin_payment_methods')}</span>
          </div>

          {/*Payment Setting Container*/}
          <div className="col-md-12">
            <PaymentSettingContainer
              onSubmit={this.savePaymentSetting.bind(this)}
              {...this.props}
            />
          </div>

          {/*Payment instructions*/}
          <div className="col-md-12">
            <PaymentInstructionsContainer
              onSubmit={this.savePaymentSetting.bind(this)}
              {...this.props}
            />
          </div>

          {/*Bank account list*/}
          {
            paymentSettings.transfer ? 
              <div className="col-md-12">
                <BankAccountList
                  bankAccounts={bankAccounts}
                  {...this.props}
                ></BankAccountList>
              </div> :
              null
          }

          {/*Bank account form*/}
          {
            paymentSettings.transfer ? 
              <div className="col-md-12">
                <BankAccountContainer {...this.props} />
              </div> :
              null
          }
         
          

        </div>
      </div>

    )
  }
}

PaymentMethodsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
}

const mapStateToProps = (state) => ({
  paymentSettings: state.AdminPaymentMethodsReducer.paymentSettings,
  paymentIntegrations: state.AdminPaymentMethodsReducer.paymentIntegrations,
  paymentInstructions: state.AdminPaymentMethodsReducer.paymentInstructions,
  bankAccounts: state.AdminPaymentMethodsReducer.bankAccounts,
  isLoading: state.AdminPaymentMethodsReducer.isLoading,
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
            payment_method: 'transfer',
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
  fetchPaymentInstructions: (props) => dispatch({
    type: FETCH_ADMIN_PAYMENT_INSTRUCTIONS,
    // payload: Network().get('payment-instructions'),
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve({
          'manual_instruct': '',
          'transfer_instruct': '',
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
  fetchBankAccount: (props) => dispatch({
    type: FETCH_ADMIN_BANK_ACCOUNT,
    // payload: Network().get('bank-accounts/{id}')
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(props)
      }, 250)
    })
  }),
  deleteBankAccount: (props) => dispatch({
    type: DELETE_ADMIN_BANK_ACCOUNT,
    // payload: Network().get('bank-accounts/{id}')
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(props)
      }, 250)
    })
  }),

  storePaymentSettings: (props) => dispatch({

  }),
  storePaymentIntegrations: (props) => dispatch({

  })
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(cssModules(PaymentMethodsContainer, styles))
