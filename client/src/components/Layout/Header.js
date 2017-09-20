import React, {PropTypes, Component} from 'react';
import {Navbar, NavbarToggler, NavDropdown, MenuItem, Nav, NavItem, NavLink} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './Header.module.scss';
import { LinkContainer } from 'react-router-bootstrap'
import * as Actions from '../../actions/SessionActionCreator'

class Header extends Component {
  render() {
    return (
      <Navbar className="navbar navbar-default yamm">
        <Navbar.Header>
          <a href="/"><img
            src="http://dev.mindsworthy.com/tutorsci/demo/assets/uploads/settings/setting_35.png" className="logo"
            alt="logo"/></a>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse id="responsive-menu">
          <Nav pullRight>
            <LinkContainer to="/" role="button">
              <NavItem eventKey={1}> {this.context.t('home_page')} </NavItem>
            </LinkContainer>
            <LinkContainer to="/tutor" role="button">
              <NavItem eventKey={2}> {this.context.t('find_tutors')} </NavItem>
            </LinkContainer>
            <LinkContainer to="/" role="button">
              <NavItem eventKey={3}> {this.context.t('find_teachers')} </NavItem>
            </LinkContainer>

            <NavDropdown title={this.context.t('find_courses')} id="basic-nav-dropdown" className="vertical-megamenu">
              <LinkContainer to="/" role="button">
                <MenuItem eventKey={3.1}>Computer Science</MenuItem>
              </LinkContainer>
              <LinkContainer to="/ss" role="button">
                <MenuItem eventKey={3.2}>Maths</MenuItem>
              </LinkContainer>
              <LinkContainer to="/" role="button">
                <MenuItem eventKey={3.3}>Science</MenuItem>
              </LinkContainer>
              {/*<MenuItem divider />*/}
              <LinkContainer to="/" role="button">
                <MenuItem eventKey={3.4}>SSSSSS</MenuItem>
              </LinkContainer>
            </NavDropdown>

            <LinkContainer to="/" role="button">
              <NavItem eventKey={4}>{this.context.t('contact')}</NavItem>
            </LinkContainer>
            <LinkContainer to="/" role="button">
              <NavItem eventKey={5}> {this.context.t('forum')}</NavItem>
            </LinkContainer>


            <LinkContainer to="/login" className={this.props.session.currentUser ? 'hidden' : ''}>
              <NavItem eventKey={6}>
                <span className="nav-btn"> <i className="fa  fa-sign-in"></i> &nbsp; {this.context.t('login')} <span
                  className="hidden-navbtn"> | {this.context.t('register')} </span></span>
              </NavItem>
            </LinkContainer>

            <LinkContainer onClick={this.props.signOut} to="#" className={this.props.session.currentUser ? '' : 'hidden'}>
              <NavItem eventKey={7}>
                <span className="nav-btn"> <i className="fa fa-sign-out"></i> &nbsp; {this.context.t('signout')}</span>
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
