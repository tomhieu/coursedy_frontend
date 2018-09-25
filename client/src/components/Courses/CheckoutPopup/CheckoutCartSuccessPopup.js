import * as React from 'react';
import cssModules from 'react-css-modules';
import { Component } from 'react';
import styles from './CheckoutCartSuccessPopup.module.scss';
import SimpleDialogComponent from '../../Core/SimpleDialogComponent';

class CheckoutCartSuccessPopup extends Component {
  render() {
    const { show, acceptCallback, cart } = this.props;
    return (
      <SimpleDialogComponent
        show={show}
        title={this.context.t('checkout_cart_success_title')}
        acceptLabel={this.context.t('checkout_cart_success_button')}
        acceptCallback={acceptCallback}
      >
        <div className={`${styles.enrollSuccessContent} row`}>
          <div className="col-md-12">
            <span className={styles.enrollSuccessMessage}>{this.context.t('checkout_cart_success_message')}</span>
          </div>
          <div className="col-md-12">
            <span className={styles.enrollSuccessMessage}>{this.context.t('checkout_cart_success_message_2')}</span>
          </div>
        </div>
      </SimpleDialogComponent>
    );
  }
}

CheckoutCartSuccessPopup.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CheckoutCartSuccessPopup.propTypes = {
  show: React.PropTypes.bool.isRequired,
  acceptCallback: React.PropTypes.func.isRequired,
  cart: React.PropTypes.array
};

export default cssModules(CheckoutCartSuccessPopup, styles);
