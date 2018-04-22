import React, { Component } from 'react'
import CourseDetailLeftSide from './CourseDetailLeftSide'
import CourseDetailRightSide from './CourseDetailRightSide'
import './CourseDetailMain.scss'


class CourseDetailMain extends Component {
  render() {
    return (
      <div className="course-detail-main">
        <div className="container">
          <div className="row">
            <CourseDetailLeftSide />
            <CourseDetailRightSide {...this.props}/>
          </div>
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