import * as React from 'react';
import cssModules from 'react-css-modules';
import { Component } from 'react';
import styles from './CheckoutCartPopup.module.scss';
import SimpleDialogComponent from '../../Core/SimpleDialogComponent';
import CheckCircleIcon from '../../Core/Icons/CheckCircleIcon';
import ObjectUtils from '../../../utils/ObjectUtils'

class CheckoutCartPopup extends Component {
  render() {
    const {
      show, cart, cancelCallback, acceptCallback
    } = this.props;
    const total = cart.reduce((subtotal, item) => {
      return subtotal + item.tuition_fee 
    }, 0)
    return (
      <SimpleDialogComponent
        show={show}
        title={this.context.t('checkout_cart_title')}
        cancelCallback={cancelCallback}
        acceptCallback={acceptCallback}
        acceptLabel={this.context.t('checkout_cart_button')}
        customClass="enroll-popup"
      >
        <div className="row padding-15">
          <div className="col-md-12">
            <h5 className="mb-16">{this.context.t('checkout_cart_message')}</h5>
          </div>
          <div className="col-md-12">
            <CourseTermLine
              term={this.context.t('checkout_cart_term_1')}
              subTerm={this.context.t('checkout_cart_sub_term_1')}
            />
          </div>
          <div className="col-md-12">
            <CourseTermLine
              term={this.context.t('checkout_cart_term_2')}
              subTerm={this.context.t('checkout_cart_sub_term_2')}
            />
          </div>
          <div className="col-md-12">
            <CourseTermLine
              term={this.context.t('checkout_cart_term_3', { total: ObjectUtils.currencyFormat(total) })}
              subTerm={this.context.t('checkout_cart_sub_term_3', {
                chargeFee: <span className="highlight-term">{this.context.t('checkout_cart_charge_fee')}</span>
              })}
            />
          </div>
          <div className="col-md-12">
            <CourseTermLine
              term={this.context.t('checkout_cart_term_4')}
              subTerm={this.context.t('checkout_cart_sub_term_4')}
            />
          </div>
        </div>
      </SimpleDialogComponent>
    );
  }
}

function CourseTermLine(props) {
  const { term, subTerm } = props;
  return (
    <div className={`${styles.termLineContainer} d-flex flex-row`}>
      <div className={styles.iconCheck}>
        <CheckCircleIcon fillColor="#FF7F45" />
      </div>
      <div className="d-flex flex-column">
        <span className={styles.termContent}>{term}</span>
        <span>{subTerm}</span>
      </div>
    </div>
  );
}

CheckoutCartPopup.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CheckoutCartPopup.propTypes = {
  show: React.PropTypes.bool.isRequired,
  cart: React.PropTypes.array.isRequired,
  cancelCallback: React.PropTypes.func.isRequired,
  acceptLabel: React.PropTypes.string,
  cancelLabel: React.PropTypes.string,
  acceptCallback: React.PropTypes.func,
};

export default cssModules(CheckoutCartPopup, styles);
