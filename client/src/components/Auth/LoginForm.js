// var React              = require('react'),
//   BS                 = require('react-bootstrap'),
//   Input              = BS.Input,
//   Button             = BS.Button,
//   Modal              = BS.Modal,
//   Panel              = BS.Panel,
//   Auth               = require('../../../../src/j-toker.js'),
//   ResponseModalMixin = require('../mixins/response-modal.jsx'),
//   Highlight          = require('react-highlight'),
//   _                  = require('lodash');
import React, { PropTypes, Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginForm.module.scss';
import {Input, Button, Modal, Panel, Panel} from 'reactstrap';
import {Auth} from 'j-toker'

const successModalTitle = 'Email Sign In Success'
const errorModalTitle = 'Email Sign In Error'

class LoginForm extends Component {
  // getDefaultProps() {
  //   return {
  //     signedIn: false,
  //     config: 'default'
  //   }
  // }
  //
  // getInitialState() {
  //   return {
  //     email: '',
  //     password: '',
  //     isModalOpen: false,
  //     errors: null
  //   }
  // }
  //
  // handleInputChange(ev) {
  //   var nextState = _.cloneDeep(this.state);
  //   nextState[ev.target.name] = ev.target.value;
  //   this.setState(nextState);
  // }
  //
  // handleSignInClick(ev) {
  //   Auth.emailSignIn({
  //     email:    this.state.email,
  //     password: this.state.password,
  //     config:   this.props.config
  //   }).then(function(resp) {
  //     this.setState({
  //       email: '',
  //       password: '',
  //       errors: null,
  //       isModalOpen: true
  //     });
  //   }.bind(this))
  //   .fail(function(resp) {
  //     this.setState({
  //       errors: resp.data.errors,
  //       isModalOpen: true
  //     });
  //   }.bind(this))
  // }

  // renderSuccessMessage() {
  //   return (
  //     <p>Welcome {Auth.user.email}!</p>
  //   )
  // }
  //
  // renderErrorMessage() {
  //   return (
  //     <p>There was an error: {this.state.errors.join(', ')}</p>
  //   )
  // }


  render() {
    return (
      <Panel header='Email Sign In' bsStyle='info'>
        <form>
          <Input type='email'
                 name='email'
                 label='Email'
                 placeholder='Enter email...'
                 onChange={this.handleInputChange} />

          <Input type='password'
                 name='password'
                 label='Password'
                 placeholder='Enter password...'
                 onChange={this.handleInputChange} />

          <Button className='btn btn-primary'
                  onClick={this.handleSignInClick}>
            Sign In
          </Button>
        </form>
      </Panel>
    )
  }
}

LoginForm.propTypes = {
}

export default cssModules(LoginForm, styles);