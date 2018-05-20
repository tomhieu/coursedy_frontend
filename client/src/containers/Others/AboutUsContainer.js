import React, {Component} from 'react'

class AboutUsContainer extends Component {
  render() {
    return (
      <div className="container">
        {this.context.t('product_about_us_info')}
      </div>
    )
  }
}

AboutUsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default AboutUsContainer
