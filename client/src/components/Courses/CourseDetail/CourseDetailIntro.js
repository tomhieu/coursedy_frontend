import React, { Component } from 'react'
import './CourseDetailIntro.scss'
import DateUtils from "../../../utils/DateUtils"
import { PUBLIC_COURSE_DETAIL_MENU_INTRO } from "../../../constants/WebConstants.js"

class CourseDetailIntro extends Component {
  constructor() {
    super();
    this.state = {
      isViewMore: false
    }
  }

  componentDidMount() {
    if (this.courseRefDes && this.courseRefDes.clientHeight > 200) {
      this.toggleViewMore();
    }
  }

  handleViewMore(e) {
    e.stopPropagation();
    this.toggleViewMore();
  }

  toggleViewMore() {
    this.setState({isViewMore: !this.state.isViewMore});
  }


  render() {
    const {course, course_sections, activeMenu} = this.props
    const active = activeMenu === PUBLIC_COURSE_DETAIL_MENU_INTRO
    return (
      <div id="course-detail-intro" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>{this.context.t('course_intro')}</h3>
        </div>
        <div className="course-intro">
          <div className="listing-box clearfix">
            <h5>{this.context.t('course_highlight')}</h5>
            <ul className="listing-box-list">
              <li>
                <div className="row gap-10">
                  <div className="col-xs-8 col-sm-8"><i className="fa fa-clock-o mr-5"></i> {this.context.t('period')}</div>
                  <div className="col-xs-4 col-sm-4 text-right font600">{course.period}</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-6 col-sm-6"><i className="fa fa-calendar mr-5"></i> {this.context.t('start_time')}</div>
                  <div className="col-xs-6 col-sm-6 text-right font600">{DateUtils.formatDate(course.start_date)}</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-8 col-sm-8"><i className="fa fa-pencil-square-o mr-5"></i> {this.context.t('course_lessons')}</div>
                  <div className="col-xs-4 col-sm-4 text-right font600"> {course_sections.length}</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-8 col-sm-8"><i className="fa fa-users mr-5"></i> {this.context.t('number_of_students')}</div>
                  <div className="col-xs-4 col-sm-4 text-right font600"> {course.number_of_students}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <h5 className="course-about-heading text-uppercase font700 mb-20">{this.context.t('course_about')}</h5>
        <div className="course-about-content">
          <div
            ref={ (ref) => { this.courseRefDes = ref } }
            className={`course-about-content ${this.state.isViewMore ? 'course-des-view-less' : 'course-des-view-more'}`}
            dangerouslySetInnerHTML={{__html: course.description}}
          />
          {this.state.isViewMore ?
            <div
              className="course-des-view-more-btn"
              onClick={this.handleViewMore.bind(this)}
            >
              {this.context.t('see_more')}
            </div>
            : null
          }
        </div>
        </div>
    )
  }
}

CourseDetailIntro.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailIntro.propTypes = {
};

export default CourseDetailIntro
