import React, {PropTypes, Component} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap'
import cssModules from 'react-css-modules';
import styles from './Footer.module.scss';

class Footer extends Component {
  render() {
    return (
      <footer id="footer" className="style2">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-3">
                <div className="footer-logo"><a href="#"><img src="http://dev.mindsworthy.com/tutorsci/demo/assets/uploads/settings/setting_35.png" alt=""/></a></div>
                <div className="footer-text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et lobortis diam vestibulum eget varius id, vulputate et mi. Nullam feugiat, diam quis interdum varius </p>
                  <div className="read-more">
                    <a href="#">Read More...</a>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <h5>Popular Courses</h5>
                <ul className="footer-link courses-list">
                  <li><a href="#">Management</a></li>
                  <li><a href="#">Banking</a></li>
                  <li><a href="#">Government Recruitment</a></li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-3">
                <h5>Quick Links</h5>
                <ul className="footer-link">
                  <li><a href="#">Summer Sessions</a></li>
                  <li><a href="#">Professional Courses</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Use</a></li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-3">
                <h5>Contact Us</h5>
                <div className="contact-view">
                  <div className="contact-slide">
                    <p><i className="fa fa-location-arrow"></i>  76 Woodland Ave. Sherman Drive  <br/>Fort Walton Beach,Harlingen</p>
                  </div>
                  <div className="contact-slide">
                    <p><i className="fa fa-phone"></i>  +84 164 9561 780</p>
                  </div>
                  <div className="contact-slide">
                    <p><i className="fa fa-envelope"></i>  <a href="mailTo:e"> contact@ezylearning.com</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-8">
                <div className="copy-right">
                  <p>Copyright © <span className="year">2017</span> Academy All Rights Reserved</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="social-media">
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-skype"></i></a></li>
                    <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  // content: PropTypes.string.isRequired,
  // onRemove: PropTypes.func.isRequired,
  // id: PropTypes.number.isRequired
};

export default cssModules(Footer, styles);
