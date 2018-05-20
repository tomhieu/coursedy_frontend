import React, {Component} from 'react'

class PrivacyContainer extends Component {
  render() {
    return (
      <div className="container">
        {this.context.t('product_privacy_info')}
      </div>
    )
  }
}

PrivacyContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default PrivacyContainer
