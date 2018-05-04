import React, { Component } from 'react'
import './CourseDetailLeftSide.scss'
import {
  PUBLIC_COURSE_DETAIL_MENU_INTRO,
  PUBLIC_COURSE_DETAIL_MENU_LESSONS,
  PUBLIC_COURSE_DETAIL_MENU_TEACHER,
  PUBLIC_COURSE_DETAIL_MENU_COMMENTS,
  PUBLIC_COURSE_DETAIL_MENU_RELATED
} from "../../../constants/WebConstants.js"
import AnchorLink from 'react-anchor-link-smooth-scroll'

class CourseDetailLeftSide extends Component {
  render() {
    const { activeMenu, updateActiveMenu } = this.props
    return (
      <div className="col-md-3 d-none d-md-block sidebar-fixed">
        <aside className="sidebar-wrapper">
          <div className="scrollspy-sidebar alt-style-01 affix-top">
            <ul className="scrollspy-sidenav">
              <li className="sidebar-heading"><h5>{this.context.t('course_menu')}</h5></li>
              <li className="">
                <ul className="course-detail-left-nav">
                  <li>
                    <AnchorLink href='#course-detail-intro' className="anchor">{this.context.t('course_intro')}</AnchorLink>
                  </li>
                  <li>
                    <AnchorLink href='#course-detail-lessons' className="anchor">{this.context.t('course_lessons')}</AnchorLink>
                  </li>
                  <li>
                    <AnchorLink href='#course-detail-tutor' className="anchor">{this.context.t('course_teacher')}</AnchorLink>
                  </li>
                  <li>
                    <AnchorLink href='#courses-detail-comments' className="anchor">{this.context.t('course_comments')}</AnchorLink>
                  </li>
                  <li>
                    <AnchorLink href='#course-detail-related' className="anchor">{this.context.t('course_related')}</AnchorLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="clearfix mb-20 mt-30">
            <a href="#" className="btn btn-primary btn-block btn-md">{this.context.t('course_enroll')}</a>
          </div>
          
          <div className="call-featiured">
            <div className="icon">
              <i className="fa fa-phone"></i>
            </div>
            <div className="content">
              <h5>{this.context.t('contact')}</h5>
              <p className="phone-number">
                +66-85-658-8754
              </p>
            </div>
          </div>
          <div className="favor-link-wrapper mb-30">
            <a href="#" className="favor-link"><i className="fa fa-heart"></i> {this.context.t('course_follow')}</a>
          </div>
        </aside>
      </div>
    )
  }
}

CourseDetailLeftSide.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailLeftSide.propTypes = {
};

export default CourseDetailLeftSide;