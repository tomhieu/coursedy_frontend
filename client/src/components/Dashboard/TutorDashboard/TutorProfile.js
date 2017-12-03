import React, {Component} from 'react';

class TutorProfile extends Component {
  render() {
    return (
      <div className="dashboard-profile">
        <div className="media media-team">
          <a href="http://localhost:3000/tutor/index">
            <div className="media-left">
              <figure className="imghvr-zoom-in">
                <img className="media-object  img-circle" src="http://localhost:3000/assets/uploads/profiles/7.jpg" alt="Behati Corinn"/>
                <figcaption></figcaption>
              </figure>
            </div>
            <div className="media-body">
              <h4>Behati Corinn</h4>
              <p>User Login: 23/09/2017 08:22:03</p>
            </div>
            <p>Net Credits: <strong>6856</strong>
              <span className="pull-right">Per Credit Value: <strong>$2</strong></span>
            </p>
          </a>
        </div>
      </div>
    )
  }
}

TutorProfile.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TutorProfile;
