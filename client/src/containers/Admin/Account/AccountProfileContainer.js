import React, {Component} from 'react'
import {connect} from 'react-redux'
import ObjectUtils from '../../../utils/ObjectUtils'

class AdminProfileContainer extends Component {
  componentWillMount() {
  }
  render() {
    const { currentUser, userBalance } = this.props
    return (
      <div className="dashboard-profile">
        <div className="media media-team">
          <div className="media-left">
            <figure className="imghvr-zoom-in">
              <img className="media-object img-circle" 
                src="http://placehold.it/100x100" 
                alt={currentUser.name}
              />
              <figcaption></figcaption>
            </figure>
          </div>
          <div className="media-body">
            <h4>{ currentUser.name }</h4>
            <p>{this.context.t('my_balance')}: <strong>{ ObjectUtils.currencyFormat(userBalance) }</strong></p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  userBalance: state.session.userBalance
})

AdminProfileContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

AdminProfileContainer.propTypes = {
}

export default connect(
  mapStateToProps
)(AdminProfileContainer)
