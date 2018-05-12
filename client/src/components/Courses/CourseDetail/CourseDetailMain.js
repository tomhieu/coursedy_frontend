import React, { Component } from 'react'
import CourseDetailLeftSide from './CourseDetailLeftSide'
import CourseDetailRightSide from './CourseDetailRightSide'
import './CourseDetailMain.scss'

class CourseDetailMain extends Component {
  render() {
    const { displayFixedSidebar } = this.props
    return (
      <div className="course-detail-main">
        <div className="container no-pad">
          <CourseDetailLeftSide 
            {...this.props}
            displayFixedSidebar={displayFixedSidebar}
          />
          <CourseDetailRightSide 
            {...this.props}
            displayFixedSidebar={displayFixedSidebar}
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