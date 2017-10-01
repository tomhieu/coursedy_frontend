import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './LoadingMask.module.scss';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {Field} from 'redux-form';
import {Auth} from 'j-toker'
import * as Actions from '../../actions/LoginActionCreator'

class LoadingMask extends Component {
  render() {
    return (
      <div/>
    )
  }
}

export default cssModules(LoadingMask, styles);
