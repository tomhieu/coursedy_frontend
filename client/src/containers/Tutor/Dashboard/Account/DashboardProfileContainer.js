import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  PaymentActions
} from '../../../../actions/index'
import ObjectUtils from '../../../../utils/ObjectUtils'

class DashboardProfileContainer extends Component {
  componentWillMount() {
    this.props.dispatch(PaymentActions.fetchUserBalance())
  }
  render() {
    const { currentUser, userBalance } = this.props
    return (
      currentUser ? 
      <div className="dashboard-profile text-center">
        <div className="row">
          <div className="col-sm-12">
            <figure className="imghvr-zoom-in">
              <img className="media-object img-circle" 
                src="http://placehold.it/100x100" 
                alt={currentUser.name}
              />
              <figcaption></figcaption>
            </figure>
          </div>
          <div className="col-sm-12">
            <h4>{ currentUser.name }</h4>
          </div>
          <div className='col-sm-12'><p>{this.context.t('my_balance')}: <strong>{ ObjectUtils.currencyFormat(userBalance) }</strong></p></div>
        </div>
      </div> : null
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  userBalance: state.session.userBalance
})

DashboardProfileContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

DashboardProfileContainer.propTypes = {
  currentUser: React.PropTypes.object.isRequired
}

export default connect(
  mapStateToProps
)(DashboardProfileContainer)
