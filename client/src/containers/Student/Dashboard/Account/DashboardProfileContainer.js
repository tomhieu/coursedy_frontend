import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class StudentProfileContainer extends Component {
  render() {
    const { currentUser } = this.props
    return (
      <div className="dashboard-profile">
        <div className="media media-team">
          <Link to={'/student/dashboard'}>
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
              <p>User Login: 23/09/2017 08:22:03</p>
            </div>
            <p>Account Balance: <strong>0</strong>
              <span className="pull-right">Per Credit Value: <strong>$2</strong></span>
            </p>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
})

export default connect(
  mapStateToProps
)(StudentProfileContainer)
