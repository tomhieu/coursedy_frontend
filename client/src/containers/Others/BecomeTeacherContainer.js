import React, {Component} from 'react'

class BecomeTeacherContainer extends Component {
  render() {
    return (
      <div className="container">
        {this.context.t('product_become_teacher')}
      </div>
    )
  }
}

BecomeTeacherContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default BecomeTeacherContainer
