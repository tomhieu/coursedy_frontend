import React, { Component } from 'react'
import {connect} from "react-redux";

class CourseListContainer extends Component {
  render() {
    return (
      <h1>Course List Container</h1>
    )
  }
}

CourseListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
}

export default connect(
    mapStateToProps
)(CourseListContainer)