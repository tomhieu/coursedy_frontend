import React, {Component} from 'react'

class FooterAside extends Component {
  render() {
    return (
      <div className="footer__aside">
        <div className="footer__logo">
          <img src="/logo2.png" />
        </div>
        <p>{this.context.t('product_description')}</p>
        <div className="footer__support">
          <a href={`mailto:${this.context.t('product_contact_email')}`} className="_no-underline">
            <i className="_icon fa fa-envelope"></i>
            <span className="_label">{this.context.t('product_customer_support')}</span>
            <strong>{this.context.t('product_contact_email')}</strong>
          </a>
        </div>
      </div>
    )
  }
}

FooterAside.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default FooterAside
