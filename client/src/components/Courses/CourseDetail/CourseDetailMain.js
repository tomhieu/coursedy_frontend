import React, { Component } from 'react'
import CourseDetailRightSide from './CourseDetailRightSide'
import './CourseDetailMain.scss'

class CourseDetailMain extends Component {
  render() {
    return (
      <div className="course-content-wrapper">
        <div className="d-flex flex-auto no-pad">
          <CourseDetailRightSide 
            {...this.props}
          />
        </div>
      </div>
    )
  }
}

CourseDetailMain.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailMain.propTypes = {
};

export default CourseDetailMain
