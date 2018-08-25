import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './CourseDetailRightSide.scss'
import CourseDetailIntro from './CourseDetailIntro'
import CourseDetailLessons from './CourseDetailLessons'
import CourseDetailTutor from './CourseDetailTutor'
import CourseDetailComments from './CourseDetailComments'
import CourseDetailRelated from './CourseDetailRelated'
import {
  TRIGGER_CHANGE_MENU_EVENT_OFFSET
} from "../../../constants/WebConstants.js"

class CourseDetailRightSide extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { course_sections, relatedCourses } = this.props;
    return (
      <div className="course-summary">
        <div className="detail-content-wrapper">
          <CourseDetailIntro {...this.props}/>
          {
            course_sections.length ?
              <CourseDetailLessons {...this.props}/> : null
          }
          <CourseDetailTutor {...this.props}/>
          <CourseDetailComments {...this.props}/>
          {
            relatedCourses.length ?
              <CourseDetailRelated {...this.props} /> : null
          }
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