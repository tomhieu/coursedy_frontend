import React, {Component} from "react";
import * as Actions from "../actions/SessionActionCreator";
import {globalHistory} from "../utils/globalHistory";

class RoleAuthorization extends Component {
  componentWillMount(){
    if (this.props.currentUser != null) {
        // const authorized = this.authorizedRoles.map((role) => this.props.currentUser.roles.indexOf(role) >= 0).reduce((x, y) => x || y);
        // if (!authorized) globalHistory.replace(this.unauthorizedPath);
    } else {
        this.props.dispatch(Actions.checkRole(this.authorizedRoles, this.unauthorizedPath));
    }
  }
}

export default RoleAuthorization
