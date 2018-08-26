import React, { Component } from 'react';

class FooterAside extends Component {
  render() {
    return (
      <div className="footer__aside">
        <div className="footer__label">{this.context.t('support_customer_title')}</div>
        <div className="footer__support">
          <a href={`mailto:${this.context.t('product_contact_email')}`} className="_no-underline">
            <i className="_icon fa fa-envelope" />
            <span className="_label">{this.context.t('product_customer_support')}</span>
            <strong>{this.context.t('product_contact_email')}</strong>
          </a>
        </div>
      </div>
    );
  }
}

FooterAside.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default FooterAside;
