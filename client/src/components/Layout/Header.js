import React, {Component, PropTypes} from 'react';
import {NavbarToggler, NavLink} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './Header.module.scss';
import {LinkContainer} from 'react-router-bootstrap'
import {dashboardUrls} from '../../actions/ReferenceActions/ReferenceData'
import {SecurityUtils} from "utils/SecurityUtils";
import {TRIGGER_STICKY_HEADER_AT} from "constants/Layout";

class Header extends Component {
  componentWillMount() {
    if (SecurityUtils.isAuthenticated()) {
      this.props.fetchUser();
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll(event) {
    const triggerPosition = TRIGGER_STICKY_HEADER_AT
    const top = window.pageYOffset || document.documentElement.scrollTop
    if (triggerPosition < top) {
      this.header.classList.add('navbar-sticky', 'fixed-top')
    } else {
      this.header.classList.remove('navbar-sticky', 'fixed-top')
    }
  }

  render() {
    let dashboardUrl = this.props.session.currentUser ? 
      dashboardUrls[this.props.session.currentUser.roles[0]] : '';
    const showDarkHeader = this.props.main.darkHeader;
    return (
      <nav className={"header-nav navbar navbar-expand-lg navbar-light navbar-default " + (showDarkHeader ? "dark-header" : "bg-light")} ref={el => this.header = el}>
        <div className="container">
          <a className="navbar-brand" href="#"><img src="/logo2.png" className="logo" alt="logo"/></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-right" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <LinkContainer className="nav-link" to="/" role="button">
                  <div>
                    <span>{this.context.t('home_page')}</span>
                    <span className="sr-only">(current)</span>
                  </div>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer className="nav-link" to="/teachers" role="button">
                  <span>{this.context.t('find_teachers')}</span>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer className="nav-link" to="/courses" role="button">
                  <span>{this.context.t('find_courses')}</span>
                </LinkContainer>
              </li>
              {
                SecurityUtils.isAuthenticated() ? (
                  <li className="nav-item">
                    <LinkContainer className="nav-link" to={dashboardUrl}>
                      <span className="nav-btn"> <i className="fa fa-user"></i> &nbsp; {this.context.t('dashboard')}</span>
                    </LinkContainer>
                  </li>
                ) : null
              }
              {
                SecurityUtils.isAuthenticated() ? (
                  <li className="nav-item">
                    <LinkContainer className="nav-link" onClick={() => this.props.signOut()} to="#">
                      <span className="nav-btn"> <i className="fa fa-sign-out"></i> &nbsp; {this.context.t('signout')}</span>
                    </LinkContainer>
                  </li>
                ) : (
                  <li className="nav-item">
                    <LinkContainer className="nav-link" to="/login">
                      <span className="nav-btn"> <i className="fa  fa-sign-in"></i> &nbsp; {this.context.t('login')}
                        <span className="hidden-navbtn"> | {this.context.t('register')} </span>
                      </span>
                    </LinkContainer>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Header.contextTypes = {
  t: React.PropTypes.func.isRequired
}

Header.propTypes = {
  session: PropTypes.object.isRequired,
};

export default cssModules(Header, styles);
