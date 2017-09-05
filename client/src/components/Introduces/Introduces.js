import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Introduces.module.scss';

class Introduces extends Component {
  render() {
    return (
      <section>
        <div className="container">
          <div className="row row-margin">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="advantage">
                <div className="media-left">
                  <img src="http://dev.mindsworthy.com/tutorsci/demo/assets/front/images/icn-video.png" alt=".."/>
                </div>
                <div className="media-body">
                  <h4><a href="">Videos &amp; Images</a></h4>
                  <p>Listen to our teachers spexeches and see our video testimonials before you take any decisions</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="advantage">
                <div className="media-left">
                  <img src="http://dev.mindsworthy.com/tutorsci/demo/assets/front/images/icn-score.png" alt=".."/>
                </div>
                <div className="media-body">
                  <h4><a href="">Quality Scores</a></h4>
                  <p>We have rated teachers for safety and convenience as we know how important this is for you</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="advantage">
                <div className="media-left">
                  <img src="http://dev.mindsworthy.com/tutorsci/demo/assets/front/images/icn-calendar.png" alt=".."/>
                </div>
                <div className="media-body">
                  <h4><a href="">Reviews &amp; Ratings</a></h4>
                  <p>No more emails, Calls or messaging friends for recommendations - Get acces to real reviews in seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Introduces.contextTypes = {
  t: React.PropTypes.func.isRequired
}

Introduces.propTypes = {
};

export default cssModules(Introduces, styles);
