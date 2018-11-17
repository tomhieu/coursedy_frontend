import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DateUtils from '../../../utils/DateUtils';

class TeacherCourseManagement extends Component {
  static contextTypes = {
    t: React.PropTypes.func.isRequired
  };

  render() {
    const { t: translation } = this.context;
    return (
      <div className="article-wrapper">
        <div className="container sub-header pt-20">
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
                        {translation('related_articles')}
                      </h3>
                      <ul>
                        <li>
                          <Link to={translation('how_coursedy_works_teacher_create_course_link')}>
                            { translation('how_coursedy_works_teacher_create_course_title')}
                          </Link>
                        </li>
                        <li>
                          <Link to={translation('how_coursedy_works_teacher_use_bbb_link')}>
                            { translation('how_coursedy_works_teacher_use_bbb_title') }
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
                        <strong>{translation('teacher_course_building_topic_title_one')}</strong>
                      </span>
                    </p>
                    <p>
                      { translation('teacher_course_building_topic_description_one') }{' '}<a href="/login" target="_blank">{translation('at_here')}</a>
                      {'.'}
                    </p>
                    <p>
                      <br />
                      <span className="text-title">
                        <strong>{translation('teacher_course_building_topic_title_two')}</strong>
                      </span>
                    </p>
                    <p>
                      { translation('teacher_course_building_topic_description_two') }{' '}<a href="/dashboard/profile" target="_blank">{translation('at_here')}</a>
                      {'.'}
                    </p>
                    <p>
                      <br />
                      <span className="text-title">
                        <strong>{ translation('teacher_course_management_topic_title_three')}</strong>
                      </span>
                    </p>
                    <p>
                      <br />
                      <span className="text-title">
                        <strong>{translation('teacher_course_management_pending_courses_title')}</strong>
                      </span>
                    </p>
                    <p>
                      { translation('teacher_course_management_pending_courses_description') }
                    </p>
                    <p>
                      <br />
                      <span className="text-title">
                        <strong>{translation('teacher_course_management_active_courses_title')}</strong>
                      </span>
                    </p>
                    <p>
                      { translation('teacher_course_management_active_courses_description') }
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
