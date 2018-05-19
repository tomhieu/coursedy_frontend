import React, { Component } from 'react'
import {connect} from "react-redux";

class StudentListContainer extends Component {
  render() {
    return (
      <h1>Student List Container</h1>
    )
  }
}

StudentListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
}

export default connect(
    mapStateToProps
)(StudentListContainer)