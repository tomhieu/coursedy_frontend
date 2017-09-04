import React, {PropTypes, Component} from 'react';
import {Navbar, NavbarToggler, NavDropdown, MenuItem, Nav, NavItem, NavLink} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './Header.module.scss';

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
            <NavItem eventKey={1} href="#"> {this.context.t('home_page')} </NavItem>
            <NavItem eventKey={2} href="#"> {this.context.t('find_tutors')} </NavItem>
            <NavItem eventKey={3} href="#"> {this.context.t('find_teachers')}</NavItem>
            <NavDropdown title={this.context.t('find_courses')} id="basic-nav-dropdown" className="vertical-megamenu">
              <MenuItem eventKey={3.1}>Computer Science</MenuItem>
              <MenuItem eventKey={3.2}>Maths</MenuItem>
              <MenuItem eventKey={3.3}>Science</MenuItem>
              {/*<MenuItem divider />*/}
              <MenuItem eventKey={3.4}>SSSSSS</MenuItem>
            </NavDropdown>
            <NavItem eventKey={4} href="#">{this.context.t('contact')}</NavItem>
            <NavItem eventKey={4} href="#"> {this.context.t('forum')}</NavItem>
            <NavItem eventKey={5} href="/login">
              <span className="nav-btn"> <i className="fa  fa-sign-in"></i> &nbsp; {this.context.t('login')} <span
                className="hidden-navbtn"> | {this.context.t('register')} </span></span>
            </NavItem>
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
  // content: PropTypes.string.isRequired,
  // onRemove: PropTypes.func.isRequired,
  // id: PropTypes.number.isRequired
};

export default cssModules(Header, styles);
