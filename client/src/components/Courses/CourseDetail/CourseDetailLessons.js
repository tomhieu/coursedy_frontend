import React, { Component} from 'react';
import './CourseDetailLessons.scss';
import { PUBLIC_COURSE_DETAIL_MENU_LESSONS } from "../../../constants/WebConstants.js"
/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailLessons extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { course_sections, activeMenu } = this.props
    const active = activeMenu === PUBLIC_COURSE_DETAIL_MENU_LESSONS
    return (
      <div id="course-detail-lessons" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>{this.context.t('course_lessons')}</h3>
        </div>
        <div className="course-lession-wrapper-2">
          {
            course_sections.map((course_section, index) => (
              <a href="#" className="course-lession-item-2" key={"sections-"+course_section.title+index}>
                <div className="content-top">
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 mb-15">
                      <span className="lebal-lesson">{course_section.title}</span> 
                    </div>
                  </div>
                </div>
                <div className="content">
                  {
                    course_section.lessons.map((lesson, index) => (
                      <div key={"lessons-" + lesson.title + index}>
                        <h5>{lesson.title}</h5>
                        <p>{lesson.description}</p>
                        <ul>
                          {lesson.documents.map((doc, index) => (
                            <li><a href={doc.url} key={"document-"+doc.name+index}>{doc.name}</a></li>
                          ))}
                        </ul>
                      </div>
                    ))
                  }
                </div>
              </a>
            ))
          }
        </div>
      </div>
    )
  }
}

CourseDetailLessons.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailLessons.propTypes = {
};

export default CourseDetailLessons;
