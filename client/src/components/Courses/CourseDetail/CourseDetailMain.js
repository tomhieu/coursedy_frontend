import React, { Component } from 'react'
import CourseDetailLeftSide from './CourseDetailLeftSide'
import CourseDetailRightSide from './CourseDetailRightSide'
import './CourseDetailMain.scss'


class CourseDetailMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="course-detail-main">
        <CourseDetailLeftSide {...this.props}/>
        <CourseDetailRightSide {...this.props}/>
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