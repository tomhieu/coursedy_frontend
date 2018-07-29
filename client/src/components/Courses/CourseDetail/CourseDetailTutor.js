import React, { Component } from 'react'
import './CourseDetailTutor.scss'
import { Link } from 'react-router-dom'
import { PUBLIC_COURSE_DETAIL_MENU_TEACHER } from "../../../constants/WebConstants.js"

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
              <div className="col-xs-12 col-sm-3 col-md-2">
                <div className="image">
                  <Link to={course.user ? `/teachers/${course.user.id}` : '#'}>
                    <img src={ course.user && course.user.avatar ? course.user.avatar : "http://placehold.it/100x100"} alt="Image" />
                  </Link>
                </div>
                <div className="clear"></div>
                
                <ul className="user-action">
                  <li><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest"><i className="fa fa-pinterest"></i></a></li>
                  <li><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Google Plus"><i className="fa fa-google-plus"></i></a></li>
                </ul>
                    
              </div>
              
              <div className="col-xs-12 col-sm-9 col-md-10">
                <div className="content">
                  <h3>
                    <span>{course.user ? course.user.name : this.context.t('unknown')}</span>
                  </h3>
                  <p className="labeling">
                    { course_tutor ? this.buildTeacherTitle(course_tutor) : this.context.t('unknown') }
                  </p>
                  <p className="short-info">
                    {
                      course_tutor && course_tutor.description 
                        ? course_tutor.description : this.context.t('unknown')
                    }
                  </p>
                  <Link to={course.user ? `/teachers/${course.user.id}` : '#'} className="btn btn-primary btn-inverse btn-sm">
                    {this.context.t('read_more')}
                  </Link>
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

