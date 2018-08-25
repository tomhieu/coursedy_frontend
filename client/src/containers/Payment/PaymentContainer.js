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
import {
  PUBLIC_COURSE_DETAIL_REMOVE_COURSE_FROM_CART
} from "../../constants/Courses"
import { banks } from "../../constants/Banks"
import FormField from "../../components/Core/FormField"
import ObjectUtils from "utils/ObjectUtils"
import {LinkContainer} from 'react-router-bootstrap'
import TrashIcon from "../../components/Core/Icons/TrashIcon"

class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'manual',
      selectMethod: '',
      step: 1,
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

  // changePaymentMethods(method) {
  //   this.setState({
  //     selectMethod: method,
  //     step: 2
  //   })
  // }
  changeActiveTab(activeTab) {
    this.setState({
      activeTab: activeTab
    })
  }

  removeCourseFromCart(course) {
    // console.log('Remove course from cart ')
    // console.log(course)
    this.props.removeCourseFromCart(course)
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
        },
        step: 3
      })
    }
  }

  render() {
    const {
      selectBank,
      activeTab
    } = this.state
    const {
      paymentSettings,
      paymentInstructions,
      bankAccounts,
      cart,
      cartTotal
    } = this.props
    return (
      <div className="payment-box">
        <h2 className="text-center">{this.context.t('public_payment_instruct')}</h2>
        <div className="divider"></div>
        
        <div className="container-fluid row">
          {/*Payment method*/}
          <div className="col-md-8 col-sm-12">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={activeTab == "manual" ? "nav-link active" : "nav-link"} 
                  onClick={this.changeActiveTab.bind(this, 'manual')}
                >
                  {this.context.t('admin_payment_methods_manual')}
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={activeTab == "transfer" ? "nav-link active" : "nav-link"} 
                  onClick={this.changeActiveTab.bind(this, 'transfer')}
                >
                  {this.context.t('admin_payment_methods_transfer')}
                </a>
              </li>
            </ul>
            <div className="payment-container">
              {/*Manual payment*/}
              {
              activeTab == 'manual' ? 
                <div className="card">
                  <div className="card-body no-pad">
                    <div className="row container-fluid">
                      <div className="col-md-12 no-pad payment-step">
                        <p>
                          <i className="fa fa-chevron-circle-right payment-step-icon"></i>
                          <strong>Bước 1:</strong>
                          <span> Thông tin mang theo để nạp tiền gồm có</span>
                        </p>
                        <p className="text-center info-row">
                          <span className="info-box">Email: tinhuynh0992gmail.com</span>
                        </p>
                      </div>
                      <div className="col-md-12 no-pad payment-step">
                        <p>
                          <i className="fa fa-chevron-circle-right payment-step-icon"></i>
                          <strong>Bước 2:</strong>
                          <span> Vui lòng nạp tiền tại văn phòng theo địa chỉ:</span>
                        </p>
                      </div>
                      <div className="col-sm-12 no-pad-left col-md-7">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.737426598377!2d106.6580743143502!3d10.7547083923363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef11488a397%3A0x49680a6fa438017b!2sCheese+Coffee!5e0!3m2!1sen!2s!4v1534047689794" 
                          width="100%" 
                          height="300" 
                          frameBorder="0" 
                          style={{border:0}}
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="col-sm-12 no-pad col-md-5">
                        <ul className="list-unstyled">
                          <li className="mb-5"><i>Mọi chi tiết vui lòng liên hệ</i></li>
                          <li className="mb-5">Hotline: 0123.456.789</li>
                          <li>Hoặc E-mail: support@coursedy.com</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> : null
              }
              

              {/*Transfer payment*/}
              {
              activeTab == 'transfer' ?
                <div className="card">
                  <div className="card-body no-pad">
                    <div className="row container-fluid">
                      <div className="col-md-12 no-pad payment-step">
                        <p className="mb-15">
                          <i className="fa fa-chevron-circle-right payment-step-icon"></i>
                          <strong>Bước 1:</strong>
                          <span> Bên dưới là danh sách ngân hàng <strong>Coursedy</strong> hỗ trợ. 
                            Vui lòng chọn ngân hàng để nhận thông tin chuyển khoản:
                          </span>
                        </p>
                        <div className="row">
                          <div className="col-sm-12 col-md-3">
                          {
                            bankAccounts.map((item) => (
                              <div 
                                className="bank-logo text-center" 
                                key={item.name}
                                onClick={this.changeBank.bind(this, item.id)}
                              >
                                <img src={'/banks/'+item.name.toUpperCase()+'.png'} />
                              </div>
                            ))
                          }
                          </div>
                          <div className="col-sm-12 no-pad col-md-9">
                          {
                            selectBank.id != 0 ?
                            <table className="table bank-account-table">
                              <tbody>
                                <tr>
                                  <td className="first-col"><b>{this.context.t('public_payment_method_bank_name')}</b></td>
                                  <td>{selectBank.fullName}</td>
                                </tr>
                                <tr>
                                  <td><b>{this.context.t('public_payment_method_account_name')}</b></td>
                                  <td>{selectBank.bankAccount.accountName}</td>
                                </tr>
                                <tr>
                                  <td><b>{this.context.t('public_payment_method_account_number')}</b></td>
                                  <td>{selectBank.bankAccount.accountNumber}</td>
                                </tr>
                                <tr>
                                  <td><b>{this.context.t('public_payment_method_account_office')}</b></td>
                                  <td>{selectBank.bankAccount.accountOffice}</td>
                                </tr>
                              </tbody>
                            </table> : null
                          }
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 no-pad payment-step">
                        <p>
                          <i className="fa fa-chevron-circle-right payment-step-icon"></i>
                          <strong>Bước 2:</strong>
                          <span> Thực hiện chuyển khoản cho <strong>Coursedy</strong> với cú pháp:</span>
                        </p>
                        <div className="text-center">
                          <p className="text-center info-row">
                            <span className="info-box">NAP TIEN <span className="badge badge-info" alt="Đăng nhập để lấy mã">???</span> tinhuynh0992@gmail.com</span>
                          </p>
                          
                        </div>

                      </div>

                    </div>
                  </div>
                </div> : null
              }
            </div>
          </div>
          {/*Cart detail*/}
          <div className="col-md-4 col-sm-12">
            <div className="cart-container">
              <p className="cart-header"><strong>Khóa học đã chọn</strong></p>
            {
              cart.length !== 0 ?
              <div className="cart-content container">
                {
                  cart.map((course) => (
                    <div className="course-table-row row">
                      <div className="course-divider"></div>
                      <div className="col-md-8 no-pad-right">
                        <LinkContainer to={'/courses/' + course.id}>
                          <div className="course-link">
                            <p>
                              <img className="cover-image" src={course.cover_image} alt=""/>
                            </p>
                            <div className="course-title">
                              <span >{ course.title }</span>
                            </div>
                          </div>
                        </LinkContainer>
                      </div>
                      <div className="col-md-4 text-right">
                        <div className="course-tuition-fee">
                          <span>{ObjectUtils.currencyFormat(course.tuition_fee)}</span>
                        </div>
                        <a className="remove-course" onClick={this.removeCourseFromCart.bind(this, course)}>
                          <TrashIcon width={14} height={14}></TrashIcon>
                        </a>
                      </div>
                    </div>
                  ))
                }
                <div className="course-table-row row">
                  <div className="course-divider"></div>
                  <div className="col-md-7 pad"><strong>Tổng:</strong></div>
                  <div className="col-md-5 pad text-right"><strong>{ObjectUtils.currencyFormat(cartTotal)}</strong></div>
                </div>
                
              </div> : 
              <div className="text-center">
                <div className="course-divider"></div>
                <p>Không có khóa học được chọn</p>
              </div>
            }
              
            </div>
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
  cart: state.PublicCourseDetail.cart,
  cartTotal: state.PublicCourseDetail.cartTotal
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
  removeCourseFromCart: (props) => dispatch({
    type: PUBLIC_COURSE_DETAIL_REMOVE_COURSE_FROM_CART,
    payload: props
  })
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);