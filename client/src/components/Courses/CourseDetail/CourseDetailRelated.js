import React, {Component} from 'react'
import './CourseDetailRelated.scss'
import { CourseList } from '../../../components/index'

class CourseDetailRelated extends Component {
  render() {
    return (
      <div id="course-detail-related" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>Related Courses</h3>
        </div>
        <CourseList
          courses={this.props.relatedCourses}
          isPublic={true}
          itemPerRowInGridMode={4}
          hasFilter={false}
          displayMode={'grid'}
          isFetching={false}
        />
      </div>
    )
  }
}

export default CourseDetailRelated