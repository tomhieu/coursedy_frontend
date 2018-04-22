import React, { Component} from 'react';
import './CourseDetailLessons.scss';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailLessons extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      /*
      <div className="course-detail-lessons">
        <div className="col-md-12">
          <h3 className="heading-line">{this.context.t('course_detail')}</h3>
          <div className="course-content">
          {
            this.props.course_sections.map((course_section, index) => (
            <table className="table table-responsive" key={course_section.title + index}>
              <thead>
                <tr className={styles.rowPrimary}>
                  <th className="text-left" colSpan="2">{course_section.title}</th>
                </tr>
              </thead>
              <tbody>
              {
                course_section.lessons.map((lesson, index) => (
                <tr key={lesson.title + index}>
                  <td className="text-left">{lesson.title}</td>
                  <td className="text-right">{lesson.period} phút</td>
                </tr>
                ))
              }
              </tbody>
            </table>
            ))
          }
          </div>
        </div>
      </div>*/
      <div id="course-detail-lessons" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>Course Lession</h3>
        </div>
        <div className="course-lession-wrapper-2">
          <a href="#" className="course-lession-item-2">
            <div className="content-top">
              <div className="row">
                <div className="col-xs-12 col-sm-6 mb-15">
                  <span className="lebal-lesson">Lesson 01</span> 
                  <span className="badge badge-primary">Preview</span>
                </div>
                <div className="col-xs-12 col-sm-6 mb-15">
                  <div className="meta text-right text-left-xs">
                    <i className="fa fa-video-camera"></i> video <span className="mh-5">|</span> <i className="fa fa-clock-o"></i> 8:56 minutes
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <h5>Introduction to Photoshop CS6 Extremely</h5>
              <p>Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.</p>
            </div>
          </a>
          <a href="#" className="course-lession-item-2">
            <div className="content-top">
              <div className="row">
                <div className="col-xs-12 col-sm-6 mb-15">
                  <span className="lebal-lesson">Lesson 02</span> 
                  <span className="badge badge-success">Free</span>
                </div>
                <div className="col-xs-12 col-sm-6 mb-15">
                  <div className="meta text-right text-left-xs">
                    <i className="fa fa-video-camera"></i> video <span className="mh-5">|</span> <i className="fa fa-clock-o"></i> 10:07 minutes
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <h5>Photoshop CS6 workspace and features</h5>
              <p>Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.</p>
            </div>
          </a>
          <a href="#" className="course-lession-item-2">
            <div className="content-top">
              <div className="row">
                <div className="col-xs-12 col-sm-6 mb-15">
                  <span className="lebal-lesson">Lesson 03</span> 
                  <span className="badge badge-danger">Locked</span>
                </div>
                <div className="col-xs-12 col-sm-6 mb-15">
                  <div className="meta text-right text-left-xs">
                    <i className="fa fa-video-camera"></i> video <span className="mh-5">|</span> <i className="fa fa-clock-o"></i> 8:56 minutes
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <h5>Adobe Bridge For Photo Management</h5>
              <p>Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.</p>
            </div>
          </a>
          <a href="#" className="course-lession-item-2">
            <div className="content-top">
              <div className="row">
                <div className="col-xs-12 col-sm-6 mb-15">
                  <span className="lebal-lesson">Lesson 04</span> 
                  <span className="badge badge-danger">Locked</span>
                </div>
                <div className="col-xs-12 col-sm-6 mb-15">
                  <div className="meta text-right text-left-xs">
                    <i className="fa fa-video-camera"></i> video <span className="mh-5">|</span> <i className="fa fa-clock-o"></i> 8:56 minutes
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <h5>Image adjustments</h5>
              <p>Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.</p>
            </div>
          </a>
          <a href="#" className="course-lession-item-2">
            <div className="content-top">
              <div className="row">
                <div className="col-xs-12 col-sm-6 mb-15">
                  <span className="lebal-lesson">Lesson 05</span> 
                  <span className="badge badge-danger">Locked</span>
                </div>
                <div className="col-xs-12 col-sm-6 mb-15">
                  <div className="meta text-right text-left-xs">
                    <i className="fa fa-video-camera"></i> video <span className="mh-5">|</span> <i className="fa fa-clock"></i> 8:56 minutes
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <h5>Introduction to Photoshop CS6 Extremely</h5>
              <p>Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.</p>
            </div>
          </a>
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
