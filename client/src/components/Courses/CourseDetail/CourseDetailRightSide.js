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

  componentWillReceiveProps(nextProps, nextState) {
    const delta = Math.abs(nextProps.currentScrollPosition - this.props.currentScrollPosition)
    if(delta >= TRIGGER_CHANGE_MENU_EVENT_OFFSET ) {
      this.props.changeActiveMenu({
        'course-detail-intro': ReactDOM.findDOMNode(this.courseDetailIntroRef).getBoundingClientRect().top,
        'course-detail-lessons': this.props.course_sections.length > 0 ? 
          ReactDOM.findDOMNode(this.courseDetailLessonsRef).getBoundingClientRect().top : Number.MAX_SAFE_INTEGER,
        'course-detail-tutor': ReactDOM.findDOMNode(this.courseDetailTutorRef).getBoundingClientRect().top,
        'course-detail-comments': ReactDOM.findDOMNode(this.courseDetailCommentsRef).getBoundingClientRect().top,
        'course-detail-related': this.props.relatedCourses.length > 0 ?
          ReactDOM.findDOMNode(this.courseDetailRelatedRef).getBoundingClientRect().top : Number.MAX_SAFE_INTEGER
      })
    }
  }

  render() {
    const { 
      activeMenu, course_sections, relatedCourses
    } = this.props
    return (
      <div 
        className="right-content"
      >
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