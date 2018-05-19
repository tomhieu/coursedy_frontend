import React, { Component } from 'react'
import {connect} from "react-redux";

class TeacherListContainer extends Component {
  render() {
    return (
      <h1>Teacher List Container</h1>
    )
  }
}

TeacherListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
}

export default connect(
    mapStateToProps
)(TeacherListContainer)