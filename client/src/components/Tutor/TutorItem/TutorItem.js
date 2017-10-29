import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorItem.module.scss';

class TutorItem extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6">
        <div className="col-xs-12">
          <div className="profile-listing">
            <a href="http://tutors.projectmenorah.com/tutor-profile/berit-jaleiah">
              <img src="http://tutors.projectmenorah.com/assets/uploads/profiles/8.jpg" alt="" className="img-responsive" />
            </a>
          </div>
        </div>
        <div className="col-xs-12">
          <div className="col-xs-7"></div>
          
          <div className="col-xs-5">
            <div className="profile-listing">
              <a href="http://tutors.projectmenorah.com/tutor-profile/berit-jaleiah">
                <img src="http://tutors.projectmenorah.com/assets/uploads/profiles/8.jpg" alt="" className="img-responsive img-circle" /><br/>
                <span>Berit Jaleiah</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

TutorItem.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorItem.propTypes = {
};

export default cssModules(TutorItem, styles);
