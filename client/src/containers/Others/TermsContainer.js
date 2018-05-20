import React, {Component} from 'react'

class TermsContainer extends Component {
  render() {
    return (
      <div className="container">
        {this.context.t('product_terms_info')}
      </div>
    )
  }
}

TermsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TermsContainer
