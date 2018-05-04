import React, { Component } from 'react'
import './CourseDetailRightSide.scss'
import CourseDetailIntro from './CourseDetailIntro'
import CourseDetailLessons from './CourseDetailLessons'
import CourseDetailTutor from './CourseDetailTutor'
import CourseDetailComments from './CourseDetailComments'
import CourseDetailRelated from './CourseDetailRelated'

class CourseDetailRightSide extends Component {
  render() {
    const { activeMenu } = this.props
    return (
      <div className="col-xs-12 col-sm-12 col-md-9 offset-md-3 right-content">
        <div className="content-wrapper">
          <div className="detail-content-wrapper">
            <CourseDetailIntro {...this.props} />
            <CourseDetailLessons {...this.props} />
            <CourseDetailTutor {...this.props} />
            <CourseDetailComments {...this.props} />
            <CourseDetailRelated {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

CourseDetailRightSide.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailRightSide.propTypes = {
};

export default CourseDetailRightSide