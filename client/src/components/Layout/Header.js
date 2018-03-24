import React, {PropTypes, Component} from 'react';
import {Navbar, NavbarToggler, NavDropdown, MenuItem, Nav, NavItem, NavLink} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './Header.module.scss';
import { LinkContainer } from 'react-router-bootstrap'

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light navbar-default bg-light">
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
              <li className="nav-item">
                <LinkContainer className="nav-link disabled" to="/" role="button">
                  <span>{this.context.t('forum')}</span>
                </LinkContainer>
              </li>
              {
                this.props.session.currentUser ? (
                  <li className="nav-item">
                    <LinkContainer className="nav-link" to="/dashboard/courses/list">
                      <span className="nav-btn"> <i className="fa fa-user"></i> &nbsp; {this.context.t('dashboard')}</span>
                    </LinkContainer>
                  </li>
                ) : null
              }
              {
                this.props.session.currentUser ? (
                  <li className="nav-item">
                    <LinkContainer className="nav-link" onClick={this.props.signOut} to="#">
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
