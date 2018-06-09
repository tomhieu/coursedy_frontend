import React, {Component} from 'react'


class AboutCenter extends Component {
  render() {
    return (
      <div className="about-us__center">
        <div className="product-introduce">
          <h2>{this.context.t('product-introduce')}</h2>
          <div className="divider"></div>
          <p className="product-introduce__description">
            {this.context.t('product-introduce-description')}
          </p>
        </div>
      </div>
    )
  }
}

AboutCenter.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default AboutCenter
