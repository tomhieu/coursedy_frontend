import React, { Component } from 'react'
import './CourseDetailTutor.scss'
import { Link } from 'react-router-dom'
import { PUBLIC_COURSE_DETAIL_MENU_TEACHER } from "../../../constants/WebConstants.js"
import PrimaryButton from "../../Core/PrimaryButton/PrimaryButton";
import {globalHistory} from "../../../utils/globalHistory";

class CourseDetailTutor extends Component {
  buildTeacherTitle(teacher) {
    const titles = [teacher.title];
    const teacherSpecializes = teacher.categories.map(category => category.name);
    titles.push(...teacherSpecializes);
    return titles.join(', ');
  }
  render() {
    const { course, course_tutor, activeMenu } = this.props
    const active = activeMenu === PUBLIC_COURSE_DETAIL_MENU_TEACHER
    return (
      <div id="course-detail-tutor" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>{this.context.t('course_teacher')}</h3>
        </div>
        <div className="teacher-item-list-02-wrapper">
          <div className="teacher-item-list-02 clearfix">
            <div className="row gap-20">
              <div className="col-xs-12 col-md-6 col-lg-4 col-xl-3">
                <div className="image">
                  <Link to={course.user ? `/teachers/${course.user.id}` : '#'}>
                    <img src={ course.user && course.user.avatar ? course.user.avatar : "http://placehold.it/100x100"} alt="Image" />
                  </Link>
                </div>
                <div className="clear"></div>

                {course_tutor && (course_tutor.twitter || course_tutor.linkedIn) ?
                  <div className="social mt-10">
                  {course_tutor.twitter ?
                    <a href={course_tutor.twitter}
                       className="twitter"
                       data-toggle="tooltip" data-placement="top"
                       title="" data-original-title="Twitter"
                    >
                      <i className="fa fa-twitter"></i>
                    </a> : null}
                  {course_tutor.linkedIn ?
                    <a href={course_tutor.linkedIn}
                       className="linked"
                       data-toggle="tooltip" data-placement="top"
                       title=""
                       data-original-title="LinkedIn"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a> : null}
                </div> : null}
              </div>
              
              <div className="col-xs-12 col-md-6 col-lg-8 col-xl-9">
                <div className="content">
                  <h3>
                    <span>{course.user ? course.user.name : this.context.t('unknown')}</span>
                  </h3>
                  <p className="labeling">
                    { course_tutor ? this.buildTeacherTitle(course_tutor) : this.context.t('unknown') }
                  </p>
                  {
                    course_tutor && course_tutor.description ?
                      <p className="short-info" dangerouslySetInnerHTML={{__html: course_tutor.description}} /> : <p>{this.context.t('unknown')}</p>
                  }
                  <PrimaryButton callback={() => {globalHistory.push(`/teachers/${course.user.id}`)}}
                                 title={this.context.t('read_more')} isSmallButton={true} isPrimary={true} >
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clear mb-10"></div>
      </div>
      )
  }
}

CourseDetailTutor.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailTutor.propTypes = {
};

export default CourseDetailTutor

