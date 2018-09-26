import React, {Component} from 'react';
import './CourseDetailIntro.scss';
import DateUtils from '../../../utils/DateUtils';
import { HOURS_IN_DAY } from 'actions/CourseFormActionCreator';

class CourseDetailIntro extends Component {
  constructor() {
    super();
    this.state = {
      isViewMore: false
    };
    this.startIsViewMore = false;
  }

  componentDidMount() {
    if (!this.startIsViewMore && this.courseRefDes && this.courseRefDes.clientHeight > 200) {
      this.startIsViewMore = true;
      this.toggleViewMore();
    }
  }

  componentDidUpdate() {
    if (!this.startIsViewMore && this.courseRefDes && this.courseRefDes.clientHeight > 200) {
      this.startIsViewMore = true;
      this.toggleViewMore();
    }
  }

  handleViewMore(e) {
    e.stopPropagation();
    this.toggleViewMore();
  }

  toggleViewMore() {
    this.setState({ isViewMore: !this.state.isViewMore });
  }

  getTeachingTime(time) {
    const [selectedHour] = HOURS_IN_DAY.filter((h) => h.id === time);
    return selectedHour.text;
  }

  render() {
    const { course, course_sections, activeMenu } = this.props;
    const teachingDays = course.week_day_schedules ? course.week_day_schedules : [];
    return (
      <div id="course-detail-intro" className="course-detail-section">
        <div className="section-title coursedy-headline text-left mb-20">
          <h3>{this.context.t('course_intro')}</h3>
        </div>
        <div className="course-intro">
          <div className="listing-box clearfix">
            <h5>{this.context.t('course_highlight')}</h5>
            <ul className="listing-box-list">
              <li>
                <div className="row gap-10">
                  <div className="col-xs-8 col-sm-8">
                    <i
                      className="fa fa-clock-o mr-5"
                    />
                    {' '}
                    {this.context.t('period')}
                  </div>
                  <div
                    className="col-xs-4 col-sm-4 text-right font600"
                  >
                    {course.period}
                  </div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-6 col-sm-6">
                    <i
                      className="fa fa-calendar mr-5"
                    />
                    {' '}
                    {this.context.t('start_time')}
                  </div>
                  <div
                    className="col-xs-6 col-sm-6 text-right font600"
                  >
                    {DateUtils.formatDate(course.start_date)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-8 col-sm-8">
                    <i
                      className="fa fa-pencil-square-o mr-5"
                    />
                    {' '}
                    {this.context.t('course_lessons')}
                  </div>
                  <div
                    className="col-xs-4 col-sm-4 text-right font600"
                  >
                    {' '}
                    {course_sections.length}
                  </div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-8 col-sm-8">
                    <i
                      className="fa fa-users mr-5"
                    />
                    {' '}
                    {this.context.t('number_of_students')}
                  </div>
                  <div
                    className="col-xs-4 col-sm-4 text-right font600"
                  >
                    {' '}
                    {course.number_of_students}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="course-about-content">
          <h5 className="coursedy-headline mb-20">
            {this.context.t('course_about')}
          </h5>
          <div
            ref={(ref) => { this.courseRefDes = ref; }}
            className={`${this.state.isViewMore ? 'course-des-view-less' : 'course-des-view-more'}`}
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
          {this.state.isViewMore ? (
            <div
              className="course-des-view-more-btn"
              onClick={this.handleViewMore.bind(this)}
            >
              {this.context.t('see_more')}
            </div>
          ) : null}
        </div>
        <div className="course-day-list">
          <div className="coursedy-headline">
            {this.context.t('course_day_in_week')}
          </div>
          <div className="mt-7">
            {
              teachingDays.map(day => {
                return (
                  <div className="d-flex flex-row">
                    <span className="box-date">{this.context.t(day.day)}</span>
                    <span className="box-time">{this.getTeachingTime(day.start_time)}</span>
                    <span className="seperate-line">{this.context.t('course_day_in_week_seperate')}</span>
                    <span className="box-time">{this.getTeachingTime(day.end_time)}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}


CourseDetailIntro.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseDetailIntro.propTypes = {};

export default CourseDetailIntro;
