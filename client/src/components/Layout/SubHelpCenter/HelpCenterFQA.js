import React, {Component} from 'react'
import FQAItemList from './FQAItemList'
import FQAContact from './FQAContact'

class HelpCenterFQA extends Component {
  render() {
    return (
      <div className="fqa">
        <h1 className="fqa__header">{this.context.t('coursedy_fqa')}</h1>
        <div className="divider"></div>
        <FQAItemList />
        <FQAContact />
      </div>
    )
  }
}

HelpCenterFQA.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default HelpCenterFQA
