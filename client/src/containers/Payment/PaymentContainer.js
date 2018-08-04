import * as React from "react";
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import {Elements} from "react-stripe-elements";
import {DomesticBank} from "../../components/Checkout/DomesticBank";
import * as Actions from '../../actions/PaymentActionCreator'
import styles from './PaymentContainer.module.scss';
import {connect} from "react-redux";
import cssModules from 'react-css-modules';
import {Component} from "react";
import {
  FETCH_ADMIN_PAYMENT_SETTINGS,
  FETCH_ADMIN_PAYMENT_INSTRUCTIONS,
  FETCH_ADMIN_BANK_ACCOUNTS,
} from "../../actions/AsyncActionCreator"


class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMethod: '',
      selectBank: {
        name: '',
        bankAccount: {
          accountName: '',
          accountNumber: '',
          accountOffice: ''
        }
      }
    }
  }

  componentDidMount() {
    this.props.fetchPaymentSettings(this.props)
    this.props.fetchPaymentInstructions(this.props)
    this.props.fetchBankAccounts(this.props)
  }

  changePaymentMethods(method) {
    // console.log('DEBUG changePaymentMethods')
    // console.log(method)
    this.setState({
      selectMethod: method
    })
  }

  changeBank(bank) {
    console.log('DEBUG changeBank')
    console.log(bank)
  }

  render() {
    const {
      paymentSettings,
      paymentInstructions,
      bankAccounts
    } = this.props
    return (
      <div className="">
        <div className="row">
        {
          paymentSettings.manual ?
          <div className="col-md-12">
            <label htmlFor="">
              <input type="radio" name="payment-method" onClick={this.changePaymentMethods.bind(this, 'manual')} />
              Tại quầy
            </label>
          </div>
          : null
        }
        {
          paymentSettings.transfer ?
          <div className="col-md-12">
            <label htmlFor="">
              <input type="radio" name="payment-method" onClick={this.changePaymentMethods.bind(this, 'transfer')} />
              Chuyển khoản
            </label>
          </div>
          : null
        }
        </div>
        
        <div className="row payment-instruct">
          {
            this.state.selectMethod == 'manual' ? 
              <div className="col-md-12">
                {paymentInstructions.manual_instruct}  
              </div>
              : null
          }
          {
            this.state.selectMethod == 'transfer' ?
              <div className="col-md-12">
                {paymentInstructions.transfer_instruct}
              </div>
              : null
           }
        </div>

        {
          this.state.selectMethod == 'transfer' ?
          <div className="row bank-accounts">
            <div className="col-md-12">
              <select name="" id="" onChange={this.changeBank.bind(this)}>
                <option value="">Vietcombank</option>
                <option value="">Vietinbank</option>
                <option value="">Sacombank</option>
              </select>
            </div>
          </div>
          : null
        }
        {
          this.state.selectMethod == 'transfer' ?
          <div className="row bank-account">
            <div className="col-md-12">
              <table>
                <tbody>
                  <tr>
                    <td><b>Tên ngân hàng</b></td>
                    <td>{this.state.selectBank.name}</td>
                  </tr>
                  <tr>
                    <td><b>Chủ tài khoản</b></td>
                    <td>{this.state.selectBank.bankAccount.accountName}</td>
                  </tr>
                  <tr>
                    <td><b>Số tài khoản</b></td>
                    <td>{this.state.selectBank.bankAccount.accountNumber}</td>                    
                  </tr>
                  <tr>
                    <td><b>Chi nhánh</b></td>
                    <td>{this.state.selectBank.bankAccount.accountOffice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          : null
        }

      </div>
    )
  }

}

PaymentContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PaymentContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  paymentSettings: state.AdminPaymentMethodsReducer.paymentSettings,
  paymentInstructions: state.AdminPaymentMethodsReducer.paymentInstructions,
  bankAccounts: state.AdminPaymentMethodsReducer.bankAccounts,
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
            status: true
          }, {
            payment_method: 'transfer',
            status: true
          }, {
            payment_method: 'paypal',
            status: false
          }, {
            payment_method: 'visa',
            status: false
          }
        ])
      }, 250)
    })
  }),
  fetchPaymentInstructions: (props) => dispatch({
    type: FETCH_ADMIN_PAYMENT_INSTRUCTIONS,
    // payload: Network().get('payment-instructions'),
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve({
          'manual_instruct': 'Hướng dẫn thanh toán tại quầy',
          'transfer_instruct': 'Hướng dẫn thanh toán chuyển khoản',
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
})

const StyledComponent = cssModules(PaymentContainer, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent);