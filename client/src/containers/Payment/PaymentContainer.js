import * as React from "react";
import {Component} from "react";
import './PaymentContainer.scss';
import {connect} from "react-redux";
import {
  FETCH_ADMIN_BANK_ACCOUNTS,
  FETCH_BANK_TRANSFER_TOKEN,
  FETCH_ADMIN_PAYMENT_INSTRUCTIONS,
  FETCH_ADMIN_PAYMENT_SETTINGS,
} from "../../actions/AsyncActionCreator"
import "../../../styles/global_style.scss"
// import {banks} from "../../constants/Banks"
import {
  PUBLIC_COURSE_DETAIL_REMOVE_COURSE_FROM_CART,
  PUBLIC_COURSE_DETAIL_FETCH_CART
} from "../../constants/Courses"
import ObjectUtils from "utils/ObjectUtils"
import {LinkContainer} from 'react-router-bootstrap'
import TrashIcon from "../../components/Core/Icons/TrashIcon"
import CourseSelectionIcon from "../../components/Core/Icons/CourseSelectionIcon"
import SimpleDialogComponent from "../../components/Core/SimpleDialogComponent"
import EnrollCoursePopup from "../../components/Courses/EnrollPopup/EnrollCoursePopup"
import EnrollCourseSuccessPopup from "../../components/Courses/EnrollPopup/EnrollCourseSuccessPopup"
import * as PublicCourseActions from '../../actions/PublicCourseActionCreator';
import request from "../../utils/request"
import config from 'config'

class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'manual',
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
      },
      selectedCourse: null,
      showConfirmModal: false,
      showEnrollModal: false,
      showEnrollSuccessModal: false,
    }
  }

  componentDidMount() {
    this.props.fetchPaymentSettings(this.props)
    // this.props.fetchPaymentInstructions(this.props)
    this.props.fetchBankAccounts(this.props)
    this.props.fetchBankTransferToken(this.props)
    // if (this.props.cart.length == 0) {
    //   this.props.fetchCart()
    // }
  }

  changeActiveTab(activeTab) {
    this.setState({
      activeTab: activeTab
    })
  }

  openConfirmModal(course) {
    this.setState({
      selectedCourse: course,
      showConfirmModal: true
    })
  }

  closeConfimModal() {
    this.setState({
      selectedCourse: null,
      showConfirmModal: false
    })
  }

  removeCourseFromCart() {
    console.log('DEBUG ')
    // console.log(this.state.selectedCourse)
    this.props.removeCourseFromCart(this.state.selectedCourse)
    this.setState({
      selectedCourse: null,
      showConfirmModal: false
    })
  }

  openEnrollModal(course) {
    this.setState({
      selectedCourse: course,
      showEnrollModal: true
    })
  }

  closeEnrollModal() {
    this.setState({
      selectedCourse: null,
      showEnrollModal: false
    })
  }

  enrollToCourse(course) {
    //Add To Cart
    const res = this.props.enrollCourse(course.id);
    res.then(() => {
      this.closeEnrollModal();
      this.openEnrollSuccessModal();
      //Refresh user balance
    }, (error) => {
      let { errors } = error
      console.log(errors)
      this.closeEnrollModal();
    })
  }

  openEnrollSuccessModal() {
    this.setState({
      showEnrollSuccessModal: true
    })
  }

  closeEnrollSuccessModal() {
    this.setState({
      showEnrollSuccessModal: false
    })
  }

  changeBank(bankId) {
    let bank = this.props.bankAccounts.filter((item) => {
      return item.id == bankId
    })
    if (bank.length > 0) {
      this.setState({
        selectBank: bank[0],
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
      cartTotal,
      currentUser,
      bankTransferToken
    } = this.props
    return (
      <div className="payment-box">
        <h2 className="text-center">{this.context.t('public_payment_instruct')}</h2>
        <div className="divider"></div>

        <div className="container-fluid row">
          {/*Payment method*/}
          <div className="col-md-7 col-sm-12 payment-instruction-container">
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
                          <strong>{this.context.t('public_payment_manual_step_1')}</strong>
                          <span> {this.context.t('public_payment_manual_step_1_instruction')}</span>
                        </p>
                        <p className="text-center info-row">
                          <span className="info-box">{this.context.t('public_payment_manual_step_1_email')} { currentUser ? currentUser.email : '' }</span>
                        </p>
                      </div>
                      <div className="col-md-12 no-pad payment-step">
                        <p className="mb-5">
                          <i className="fa fa-chevron-circle-right payment-step-icon"></i>
                          <strong>{this.context.t('public_payment_manual_step_2')}</strong>
                          <span> {this.context.t('public_payment_manual_step_2_instruction')}</span>
                        </p>
                        <p
                          dangerouslySetInnerHTML={{ __html: this.context.t('public_payment_manual_step_2_address') }}
                        />
                      </div>
                      <div className="col-sm-12 no-pad-left col-md-7">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15676.608394619212!2d106.7052924!3d10.7996605!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7707608b48ac3c25!2sDreamplex+195!5e0!3m2!1sen!2s!4v1542856328832"
                          width="100%"
                          height="300"
                          frameBorder="0"
                          style={{border:0}}
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="col-sm-12 no-pad col-md-5">
                        <ul className="list-unstyled">
                          <li
                            className="mb-5"
                            dangerouslySetInnerHTML={{ __html: this.context.t('public_payment_manual_contact') }}
                          />
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
                          <strong>{this.context.t('public_payment_transfer_step_1')} </strong>
                          <span
                            dangerouslySetInnerHTML={{ __html: this.context.t('public_payment_transfer_step_1_instruction') }}
                          />
                        </p>
                        <div className="row">
                          <div className="col-sm-12 col-md-3">
                          {
                            bankAccounts.map((item) => (
                              <div
                                className={
                                  selectBank.id != item.id
                                    ? "bank-logo text-center"
                                    : "bank-logo text-center active-bank"
                                }
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
                          <strong>{this.context.t('public_payment_transfer_step_2')} </strong>
                          <span
                            dangerouslySetInnerHTML={{ __html: this.context.t('public_payment_transfer_step_2_instruction') }}
                          />
                        </p>
                        <div className="text-center">
                          <p className="text-center info-row">
                            <span className="info-box">
                              NAP TIEN <span className="badge badge-info" alt="Đăng nhập để lấy mã">{bankTransferToken || '???'}</span> {currentUser ? currentUser.email : ''}
                            </span>
                          </p>

                        </div>

                      </div>
                      <div className="col-md-12 no-pad payment-step">
                        <p>
                          <i className="fa fa-chevron-circle-right payment-step-icon"></i>
                          <strong>{this.context.t('public_payment_transfer_step_3')} </strong>
                          <span
                            dangerouslySetInnerHTML={{ __html: this.context.t('public_payment_transfer_step_3_instruction') }}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div> : null
              }
            </div>
          </div>
          {/*Cart detail*/}
          <div className="col-md-1 col-sm-12"/>
          <div className="col-md-4 col-sm-12">
            <div className="cart-container">
              <p className="cart-header"><strong>{this.context.t('public_payment_cart_title')}</strong></p>
            {
              cart.length !== 0 ?
              <div className="cart-content container">
                {
                  cart.map((course) => (
                    <div className="course-table-row row" key={'cart-course-' + course.id}>
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
                        {
                          course.tuition_fee < currentUser.balance ?
                            <a className="remove-course" onClick={this.openEnrollModal.bind(this, course)}>
                              <CourseSelectionIcon width={14} height={14}></CourseSelectionIcon>
                            </a> : null
                        }

                        <a className="remove-course" onClick={this.openConfirmModal.bind(this, course)}>
                          <TrashIcon width={14} height={14}></TrashIcon>
                        </a>
                      </div>
                    </div>
                  ))
                }
                <div className="course-table-row row">
                  <div className="course-divider"></div>
                  <div className="col-md-7 pad"><strong>{this.context.t('public_payment_cart_total')}</strong></div>
                  <div className="col-md-5 pad text-right"><strong>{ObjectUtils.currencyFormat(cartTotal)}</strong></div>
                  <div className="col-md-7 pad"><strong>{this.context.t('public_payment_your_balance')}</strong></div>
                  <div className="col-md-5 pad text-right">
                    <strong className={currentUser.balance < cartTotal ? "color-red" : "color-green" }>{ObjectUtils.currencyFormat(currentUser.balance)}</strong>
                  </div>
                </div>
                <EnrollCoursePopup
                  show={this.state.showEnrollModal}
                  course={this.state.selectedCourse}
                  acceptCallback={this.enrollToCourse.bind(this, this.state.selectedCourse)}
                  cancelCallback={this.closeEnrollModal.bind(this)}
                />
                <EnrollCourseSuccessPopup
                  show={this.state.showEnrollSuccessModal}
                  course={this.state.selectedCourse}
                  acceptCallback={this.closeEnrollSuccessModal.bind(this)}
                />
                <SimpleDialogComponent
                  show={this.state.showConfirmModal}
                  title={this.context.t('public_payment_cart_confirm_modal_title')}
                  acceptCallback={this.removeCourseFromCart.bind(this)}
                  cancelCallback={this.closeConfimModal.bind(this)}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.context.t(
                        'public_payment_cart_confirm_modal_content',
                        {title: this.state.selectedCourse ? this.state.selectedCourse.title : ''}
                      )
                    }}
                  />
                </SimpleDialogComponent>
              </div> :
              <div className="text-center">
                <div className="course-divider"></div>
                <p>{this.context.t('public_payment_cart_empty')}</p>
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
};

PaymentContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  paymentSettings: state.AdminPaymentMethodsReducer.paymentSettings,
  paymentInstructions: state.AdminPaymentMethodsReducer.paymentInstructions,
  bankAccounts: state.AdminPaymentMethodsReducer.bankAccounts,
  cart: state.PublicCourseDetail.cart,
  cartTotal: state.PublicCourseDetail.cartTotal,
  currentUser: state.session.currentUser,
  bankTransferToken: state.Payment.bankTransferToken,
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
    payload: request(config.assetServer + '/runtime/bankAccounts.json', {})
  }),
  fetchCart: (props) => dispatch({
    type: PUBLIC_COURSE_DETAIL_FETCH_CART + '_FULFILLED',
    payload: props
    // type: PUBLIC_COURSE_DETAIL_FETCH_CART,
    // payload: Network().get(`fetch-cart`, {})
  }),
  removeCourseFromCart: (props) => dispatch({
    type: PUBLIC_COURSE_DETAIL_REMOVE_COURSE_FROM_CART + '_FULFILLED',
    payload: props
    // type: PUBLIC_COURSE_DETAIL_REMOVE_COURSE_FROM_CART,
    // payload: Network().post(`courses/${props.id}/remove-from-cart`, {})
  }),
  fetchBankTransferToken: (props) => dispatch({
    type: FETCH_BANK_TRANSFER_TOKEN,
    // payload: Network().get('payment-token')
    payload: new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve({
          token: 'abcdef',
        })
      }, 250)
    })
  }),
  enrollCourse: (courseId) => dispatch(PublicCourseActions.submitEnrollCourse(courseId)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
