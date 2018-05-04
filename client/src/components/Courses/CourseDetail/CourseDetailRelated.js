import React, {Component} from 'react'
import './CourseDetailRelated.scss'
import { CourseList } from '../../../components/index'
import { PUBLIC_COURSE_DETAIL_MENU_RELATED } from "../../../constants/WebConstants.js"

class CourseDetailRelated extends Component {
  render() {
    const { relatedCourses, activeMenu } = this.props
    const active = activeMenu === PUBLIC_COURSE_DETAIL_MENU_RELATED
    return (
      <div id="course-detail-related" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>{this.context.t('course_related')}</h3>
        </div>
        <CourseList
          courses={relatedCourses}
          isPublic={true}
          itemClass='col-xs-12 col-sm-6 col-md-4 mb-15'
          itemPerRowInGridMode={3}
          displayMode={'grid'}
          isFetching={false}
        />
      </div>
    )
  }
}

CourseDetailRelated.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailRelated.propTypes = {
};

export default CourseDetailRelated