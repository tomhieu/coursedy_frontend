import React, {Component} from 'react'
import {connect} from 'react-redux'
import ObjectUtils from '../../../../utils/ObjectUtils'

class StudentProfileContainer extends Component {
  render() {
    const { currentUser } = this.props
    return (
      <div className="dashboard-profile">
        <div className="media media-team">
          <div className="media-left">
            <figure className="imghvr-zoom-in">
              <img
                className="media-object img-circle"
                src="http://placehold.it/100x100"
                alt={currentUser.name}
              />
              <figcaption />
            </figure>
          </div>
          <div className="media-body">
            <h4>{ currentUser.name }</h4>
            <p>{this.context.t('my_balance')}: <strong>{ ObjectUtils.currencyFormat(currentUser.balance) }</strong></p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
})

StudentProfileContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

StudentProfileContainer.propTypes = {
};

export default connect(
  mapStateToProps
)(StudentProfileContainer);
