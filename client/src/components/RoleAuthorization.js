import React, {Component} from 'react';
import * as Actions from '../actions/SessionActionCreator'
import { connect } from 'react-redux';

class RoleAuthorization extends Component {
  componentWillMount(){
    this.props.dispatch(Actions.checkRole(this.authorizedRoles, this.userRoles, this.unauthorizedPath))
  }
}

export default RoleAuthorization
