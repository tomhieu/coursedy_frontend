import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class FooterMain extends Component {
  render() {
    return (
      <div className="footer__main">
        <div className="footer__links">
          <div className="footer__links__column">
            <div className="footer__links__list">
              <h4 className="footer__label">{this.context.t('product_discover_coursedy')}</h4>
              <ul>
                <li><Link to="/about">{this.context.t('product_about_us')}</Link></li>
                <li><a href="//blog.coursedy.com" target="_blank">{this.context.t('product_blog')}</a></li>
              </ul>
            </div>
          </div>

          <div className="footer__links__column">
            <div className="footer__links__list">
              <h4 className="footer__label">{this.context.t('product_resources')}</h4>
              <ul>
                <li><Link to="/help">{this.context.t('product_help_center')}</Link></li>
                <li><Link to="/become-a-teacher">{this.context.t('product_become_a_teacher')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer__links__column">
            <div className="footer__social-network">
              <h4 className="footer__label">{this.context.t('product_follow_on')}</h4>
              <ul>
                <li>
                  <Link to={this.context.t('product_fb_link')} target="_blank">
                    <i className="fa fa-facebook" />
                  </Link>
                </li>
                <li>
                  <Link to={this.context.t('product_twitter_link')} target="_blank">
                    <i className="fa fa-twitter" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer__payment">
              <h4 className="footer__label">{this.context.t('product_payment_partners')}</h4>
              <ul>
                <li><img src="/icon-visa-1.svg" alt="" /></li>
                <li><img src="/icon-mastercard.svg" alt="" /></li>
                <li><img src="/icon-paypal-1.svg" alt="" /></li>
                <li><img src="/american-express.jpg" alt="" style={{ width: '50px' }} /></li>
                <li><img src="/icon-jcb.svg" alt="" /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FooterMain.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default FooterMain;
