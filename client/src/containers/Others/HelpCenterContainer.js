import React, {Component} from 'react'

class HelpCenterContainer extends Component {
  render() {
    return (
      <div className="container">
        {this.context.t('product_helper_center_info')}
      </div>
    )
  }
}

HelpCenterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default HelpCenterContainer
