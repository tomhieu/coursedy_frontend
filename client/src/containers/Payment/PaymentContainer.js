import * as React from "react";
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import {Elements} from "react-stripe-elements";
import {DomesticBank} from "../../components/Checkout/DomesticBank";
import * as Actions from '../../actions/PaymentActionCreator'
import './PaymentContainer.scss';
import {connect} from "react-redux";
import {Component} from "react";
import {
  FETCH_ADMIN_PAYMENT_SETTINGS,
  FETCH_ADMIN_PAYMENT_INSTRUCTIONS,
  FETCH_ADMIN_BANK_ACCOUNTS,
} from "../../actions/AsyncActionCreator"
import "../../../styles/global_style.scss"
import { banks } from "../../constants/Banks"

class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMethod: '',
      selectBank: {
        id: 0,
        name: '',
        fullName: '',
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
    this.setState({
      selectMethod: method
    })
  }

  changeBank(bankId) {
    console.log('DEBUG changeBank')
    console.log(bankId)
    let bank = this.props.bankAccounts.filter((item) => {
      return item.id == bankId
    })
    if (bank.length > 0) {
      let bankProfile = banks.filter((item) => {
        return item.code == bank[0].name
      })
      this.setState({
        selectBank: {
          ...bank[0],
          fullName: bankProfile[0].name
        }
      })
    }
  }

  render() {
    const {
      paymentSettings,
      paymentInstructions,
      bankAccounts
    } = this.props
    return (
      <div className="payment-container">
        <div className="row">
          <div className="col-md-6 no-pad">
            <div className="col-md-12 no-pad">
              <p><b>Hình thức thanh toán</b></p>
            </div>
            {
              paymentSettings.manual ?
              <div className="col-md-12 no-pad">
                <div className="form-check">
                  <label className="form-check-label">
                    <input 
                      type="radio" 
                      class="form-check-input" 
                      name="payment-method" 
                      onClick={this.changePaymentMethods.bind(this, 'manual')} 
                    />
                    Tại quầy
                  </label>
                </div>
              </div>
              : null
            }
            {
              paymentSettings.transfer ?
              <div className="col-md-12 no-pad">
                <div className="form-check">
                  <label className="form-check-label">
                    <input 
                      type="radio" 
                      class="form-check-input" 
                      name="payment-method" 
                      onClick={this.changePaymentMethods.bind(this, 'transfer')} 
                    />
                    Chuyển khoản
                  </label>
                </div>
              </div>
              : null
            }
          </div>
          <div className="col-md-6 payment-instruct">
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
        </div>

        <div className="divider-payment clearfix"></div>
        <div className="row">
          <div className="col-md-12 no-pad">
            <p><i>Thank toán bằng cách chuyển khoản vào 1 trong các tài khoản sau</i></p>
          </div>
          {
            this.state.selectMethod == 'transfer' ?
              <div className="col-md-12 no-pad">
                {
                  bankAccounts.map((item) => (
                    <div 
                      className="bank-logo pull-left" 
                      key={item.name}
                      onClick={this.changeBank.bind(this, item.id)}
                    >
                      <img src={'/banks/'+item.name.toUpperCase()+'.png'} />
                    </div>
                  ))
                }
              </div>
            : null
          }
        </div>

        <div className="divider-payment clearfix"></div>
        <div className="row">
          <div className="col-md-12 no-pad">
            <p><i>Thông tin tài khoản</i></p>
          </div>
          <div className="col-md-12 no-pad">
            <table className="table table-responsive">
              <tbody>
                <tr>
                  <td><b>Ngân hàng</b></td>
                  <td>{this.state.selectBank.fullName}</td>
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
          'transfer_instruct': '\
            <p>\
              <b>Hướng dẫn thanh toán chuyển khoản</b>\
            </p>\
            <p>\
              <i>Nội dung chuyển khoản theo cú pháp: NAP TIEN *TOKEN* *EMAIL*</i>\
            </p>',
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
              accountName: "Pham Duy Bao Trung ACB",
              accountNumber: "9124 6788 6778 900",
              accountOffice: "Ly Thuong Kiet"
            }
          }, {
            id: 2,
            name: "VCB",
            bankAccount: {
              accountName: "Pham Duy Bao Trung",
              accountNumber: "9124 6788 6778 900 VCB",
              accountOffice: "Ly Thuong Kiet"
            }
          }
        ])
      }, 250)
    })
  }),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);