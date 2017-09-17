import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorItem.module.scss';

class TutorItem extends Component {
  render() {
    return (
      <div className="row ">
        <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12 no-padright">
          <div className="profile-listing">
            <a href="http://tutors.projectmenorah.com/tutor-profile/berit-jaleiah">
              <img src="http://tutors.projectmenorah.com/assets/uploads/profiles/8.jpg" alt="" className="img-responsive img-circle" />
            </a>
          </div>
          <p className="user-status"><i className="fa fa-clock-o"></i> Online now</p>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 col-lg-push-7 col-md-push-5 col-sm-push-5">
          <div className="send-quote-block text-center">
            <p className="teaching-experience"><b>Experience:</b> 4 Years</p>
            <p className="qualification"><b>Qualification:</b> M.Sc</p>
            <p className="qualification"><b>Free Demo:</b> Yes</p>
            <div className="profile-view">
              <a href="http://tutors.projectmenorah.com/tutor-profile/berit-jaleiah" className="btn-link-dark">View Profile</a>
            </div>
            <div className="profile-view">
              <a href="http://tutors.projectmenorah.com/tutor-profile/berit-jaleiah#reserve" className="btn-link-dark">Book Now</a>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-md-5 col-sm-5 col-xs-12 col-lg-pull-3 col-md-pull-4 col-sm-pull-4">
          <div className="user-profile-content">
            <ul className="user-badges">
              <li>
                <a title="Last verified" data-content="2nd September, 2017" className="red-popover" data-toggle="popover" data-placement="top" data-trigger="hover">
                  <i className="fa fa-heart"></i>
                </a>
              </li>
            </ul>
            <h4 className="title">
              <a href="http://tutors.projectmenorah.com/tutor-profile/berit-jaleiah"> Berit Jaleiah</a>
            </h4>
            <ul className="user-info">
              <li>
                <div className="avg_rating" data-score="4"></div>
              </li>
              <li>1 Ratings</li>
            </ul>
            <div><strong>Teaches</strong>  Chemistry, Physics, Biology, Mathematics, Trigonometry, Adobe Photoshop</div>
            <p>Able to connect with children, understand their level and proceed accordingly. Patient, Flexible, Professional in classroom, Good Knowledge of Subject. </p>

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
