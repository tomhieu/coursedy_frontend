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
      <div className="right-content">
        <div className="content-wrapper">
          <div className="detail-content-wrapper">
            <CourseDetailIntro {...this.props} ref={e => {this.courseDetailIntroRef = e}}/>
            {
              course_sections.length ?
                <CourseDetailLessons {...this.props} ref={e => {this.courseDetailLessonsRef = e}}/> : null
            }
            <CourseDetailTutor {...this.props} ref={e => {this.courseDetailTutorRef = e}}/>
            <CourseDetailComments {...this.props} ref={e => {this.courseDetailCommentsRef = e}}/>
            {
              relatedCourses.length ?
              <CourseDetailRelated {...this.props} ref={e => {this.courseDetailRelatedRef = e}}/> : null
            }
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