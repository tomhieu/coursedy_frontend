import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class FooterEnd extends Component {
  render() {
    return (
      <div className="footer__end">
        <div className="flexbox flexbox--row">
          <div className="footer__copyright">{this.context.t('product_copyright')}</div>
          <div className="footer__page-link">
            <Link to={`/terms`} className="_link-text">{this.context.t('product_terms')}</Link>
            <Link to={`/privacy`} className="_link-text">{this.context.t('product_privacy')}</Link>
          </div>
        </div>
      </div>
    )
  }
}

FooterEnd.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default FooterEnd
