import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DateUtils from '../../../utils/DateUtils';

class TeacherCourseManagement extends Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  static contextTypes = {
    t: React.PropTypes.func.isRequired
  };

  render() {
    const { t: translation } = this.context;
    return (
      <div className="article-wrapper">
        <div className="container sub-header">
          <h1>
            {translation('teacher_course_management_title')}
          </h1>
        </div>
        <div className="container-divider" />
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-3 hide-sidebar">
              <div className="article-sidebar">
                <div className="left-gray-box">
                  <div className="sidebar-section">
                    <section className="related-article">
                      <h3>
                        {translation('teacher_course_management_related_topic_name')}
                      </h3>
                      <ul>
                        <li>
                          <Link to="/how-coursedy-works/teacher-course-building">
                            { translation('teacher_course_building_short_title')}
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-9">
              <div className="article">
                <div className="article-content">
                  <div className="article-body">
                    <p>
                      <br />
                      <span className="text-title">
                        <strong>{translation('teacher_course_management_pending_courses_title')}</strong>
                      </span>
                    </p>
                    <p>
                      { translation('teacher_course_management_pending_courses_description') }
                    </p>
                  </div>
                </div>
                <footer className="article-footer">
                  <div className="article-updated">
                    { DateUtils.dateTimeFromNow(translation('teacher_course_management_updated_date')) }
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherCourseManagement;
