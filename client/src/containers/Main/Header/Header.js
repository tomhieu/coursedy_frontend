import React, {Component, PropTypes} from 'react';
import {NavbarToggler, NavLink} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './Header.module.scss';
import {LinkContainer} from 'react-router-bootstrap'
import Notification from "./Notification";
import UserNavigation from "./UserNavigation";
import LangNavigation from "./LangNavigation";
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import PrimaryButton from "../../../components/Core/PrimaryButton/PrimaryButton";
import {globalHistory} from "utils/globalHistory";
import * as sessionActions from "../../../actions/SessionActionCreator";
import {TRIGGER_STICKY_HEADER_AT} from "../../../constants/Layout";
import {SecurityUtils} from "../../../utils/SecurityUtils";
import DetailsIcon from "../../../components/Core/Icons/DetailsIcon";
import {COLLAPSE_DARKBOARD} from "../../../constants/WebConstants";
import MoreVertIcon from "../../../components/Core/Icons/MoreVertIcon";
import CoursedyLogo from "../../../components/Core/Icons/CoursedyLogo";
import CoursedyShortIcon from "../../../components/Core/Icons/CoursedyShortIcon";

class Header extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    if (SecurityUtils.isAuthenticated()) {
      this.props.fetchUser();
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
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

  login() {
    globalHistory.push('/login');
  }

  isAuthenticated() {
    return this.props.session.currentUser !== null
  }

  render() {
    const {customHeaderClass, darkHeader, dashboardHeader} = this.props.main;
    const {isCollapseDashboard} = this.props;
    return (
      <nav
        className={`header-nav navbar navbar-expand-lg navbar-light navbar-default ${customHeaderClass} ` + (darkHeader ? "dark-header" : "bg-light")}
        ref={el => this.header = el}>
        <div className="container">
          {
            dashboardHeader ?
              <div className={isCollapseDashboard ? "dashboard-logo collapsed" : "dashboard-logo"}>
                <div className="d-flex flex-row align-items-center full-height">
                  {
                    isCollapseDashboard ? <Link className="logo-image" to="/"><CoursedyShortIcon width={30} height={30} fillColor="#FFFFFF"/></Link>
                      : <Link className="logo-image" to="/"><CoursedyLogo width={150} height={30} fillColor="#FFFFFF"/></Link>
                  }
                  <a className="collapse-dashboard-icon" onClick={this.props.collapseDashboard.bind(this)}>
                    <DetailsIcon fillColor="#444444"/>
                  </a>
                </div>
              </div> :
              <Link className="navbar-brand" to="/"><CoursedyLogo width={150} height={30} fillColor={darkHeader ? "#FFFFFF" : "#1CABA0"}/></Link>
          }

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <MoreVertIcon/>
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
              <li className="nav-item border-left">
                <LangNavigation {...this.props}></LangNavigation>
              </li>
              {
                this.isAuthenticated() ? (
                  <li className="nav-item">
                    <Notification main={this.props.main}
                                  session={this.props.session}></Notification>
                  </li>
                ) : null
              }
              {
                this.isAuthenticated() ? (
                  <li className="nav-item">
                    <UserNavigation session={this.props.session} lang={this.props.lang} signOut={this.props.signOut}></UserNavigation>
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

const mapStateToProps = (state) => {
  const {main, session, DashboardMenu} = state;
  const {isCollapseDashboard} = DashboardMenu;
  return {main, session, lang: state.i18nState.lang, isCollapseDashboard };
}

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(sessionActions.fetchCurrentUser()).then((user) => {
    dispatch(sessionActions.fetchActiveCourses(user.value));
    if (SecurityUtils.isTeacher(user.value)) {
      dispatch(sessionActions.fetchCurrentTutor());
    }
  }),
  signOut: () => dispatch(sessionActions.signOutUser()),
  collapseDashboard: () => dispatch({
    type: COLLAPSE_DARKBOARD
  })
})
export default connect(
  mapStateToProps, mapDispatchToProps
)(cssModules(Header, styles));
