import React, {Component, PropTypes} from 'react';
import {NavbarToggler, NavLink} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './Header.module.scss';
import {LinkContainer} from 'react-router-bootstrap'
import {dashboardUrls} from '../../actions/ReferenceActions/ReferenceData'
import {SecurityUtils} from "utils/SecurityUtils";
import {TRIGGER_STICKY_HEADER_AT} from "constants/Layout";
import PrimaryButton from "../Core/PrimaryButton/PrimaryButton";
import {globalHistory} from '../../utils/globalHistory'
import Notification from "./Notification";
import UserNavigation from "./UserNavigation";
import LangNavigation from "./LangNavigation";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      normalNotification: !props.main.darkHeader
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({normalNotification: !nextProps.main.darkHeader});
  }

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
      this.setState({normalNotification: true})
    } else {
      this.header.classList.remove('navbar-sticky', 'fixed-top')
      this.setState({normalNotification: !this.props.main.darkHeader})
    }
  }

  login() {
    globalHistory.push('/login');
  }

  openDashboard(dashboardUrl) {
    globalHistory.push(dashboardUrl);
  }

  render() {
    const showDarkHeader = this.props.main.darkHeader;
    return (
      <nav className={"header-nav navbar navbar-expand-lg navbar-light navbar-default " + (showDarkHeader ? "dark-header" : "bg-light")} ref={el => this.header = el}>
        <div className="container">
          <a className="navbar-brand" href="#"><img src="/coursedy-logo-2.png" className="logo" alt="logo"/></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-right" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <LinkContainer className="nav-link" to="/home" role="button">
                  <span>{this.context.t('home_page')}</span>
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
              <li className="nav-item">
                <LangNavigation {...this.props}></LangNavigation>
              </li>
              {
                SecurityUtils.isAuthenticated() ? (
                  <li className="nav-item">
                    <Notification whiteIcon={!this.state.normalNotification} {...this.props}></Notification>
                  </li>
                ) : null
              }
              {
                SecurityUtils.isAuthenticated() ? (
                  <li className="nav-item">
                    <UserNavigation {...this.props}></UserNavigation>
                  </li>
                ) : (
                  <li className="nav-item">
                    <PrimaryButton callback={this.login.bind(this)}
                                   round={true}
                                   title={this.context.t('login')}>
                      <span className="nav-btn"> <i className="fa  fa-sign-in"></i> &nbsp;
                        <span className="hidden-navbtn"> | {this.context.t('register')} </span>
                      </span>
                    </PrimaryButton>
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
