import React, { Component } from 'react'
import './TeacherDetail.scss'
import { connect } from 'react-redux'
import CourseListInGridMode from 'components/Courses/CourseList/CourseListInGridMode'
import Pagination from 'react-js-pagination'
import TeacherBackground from './Content/TeacherBackground'
import TeacherReviewList from './Content/TeacherReviewList'
import TeacherProfileHeader from './Header/TeacherProfileHeader'
import {
  fetchTeacherDetail,
  fetchTeacherEducations,
  fetchTeacherWorkExperiences,
  fetchTeacherCourses,
  fetchTeacherReviews
} from 'actions/TeacherActionCreators'
import LoadingMask from 'components/LoadingMask/LoadingMask'
import * as WebConstants from 'constants/WebConstants'
import ReviewTeacherForm from './Content/ReviewTeacherForm'
import FixedSideBar from 'components/Common/FixedSideBar'
import RightContent from 'components/Common/RightContent'
import { TT } from 'utils/locale'
import { LinkContainer } from 'react-router-bootstrap'
import PrimaryAnchor from 'components/Core/PrimaryAnchor/PrimaryAnchor'
import RatingItem from 'components/Rating/index'
import ObjectUtils from 'utils/ObjectUtils'
import cssModules from 'react-css-modules'
import styles from './TeacherDetail.module.scss'


class TeacherDetail extends Component {
  componentDidMount() {
    this.props.hideFooter()
    this.props.fetchTeacherDetail({
      teacherId: parseInt(this.props.match.params.id),
      meta: 'teacherDetailProfilePlaceholder'
    })
    this.props.fetchTeacherEducations({
      teacherId: parseInt(this.props.match.params.id),
      meta: 'userAccountPlaceholder'
    })
    this.props.fetchTeacherWorkExperiences({
      teacherId: parseInt(this.props.match.params.id),
      meta: 'userAccountPlaceholder'
    })
    this.props.fetchTeacherReviews({
      teacherId: parseInt(this.props.match.params.id),
      meta: 'userAccountPlaceholder'
    })
    this.props.fetchTeacherCourses({
      teacherId: parseInt(this.props.match.params.id),
      meta: 'teacherCoursesPlaceholder'
    })
  }

  fetchTeacherCoursesWithPageNumber(page, per_page) {
    this.props.fetchTeacherCourses({
      teacherId: parseInt(this.props.match.params.id), query: { page, per_page }
    })
  }

  fetchTeacherReviewsWithPageNumber(page, per_page) {
    this.props.fetchTeacherReviews({
      teacherId: parseInt(this.props.match.params.id), query: { page, per_page }
    })
  }

  componentWillUnmount() {
    this.props.showFooter()
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="teacher-detail">
            <section className="teacher-detail__content">
              <FixedSideBar onScrollTopMargin={0}>
                <div className="teacher-profile-sidebar">
                  <LoadingMask
                    placeholderId="teacherDetailProfilePlaceholder"
                    normalPlaceholder={false}
                    facebookPlaceholder={true}
                    loaderType={WebConstants.TEACHER_DETAIL_PROFILE_PLACEHOLDER}
                  >
                    <div className="full-width">
                      <TeacherProfileHeader {...this.props} />
                    </div>
                  </LoadingMask>
                </div>
              </FixedSideBar>

              <RightContent>
                <div className={`${styles.mainContent || ''} d-flex flex-row`}>
                  <div className={styles.mainSide}>
                    <TeacherBackground
                      context={this.context}
                      teacher={this.props.teacher}
                    />
                    <div className="teacher-detail__content__review">
                      <div
                        className="teacher-detail__content__review__header mb-30">
                        <h4>{this.context.t('teacher_review')}</h4>
                      </div>
                      <ReviewHeader {...this.props} context={this.context}/>
                      <TeacherReviewList
                        {...this.props}
                        handlePageChange={this.fetchTeacherReviewsWithPageNumber.bind(this)}
                        context={this.context}
                      />
                      <ReviewTeacherForm/>
                    </div>

                    <TeacherTaughtCourses
                      {...this.props}
                      handlePageChange={this.fetchTeacherCoursesWithPageNumber.bind(this)}
                      context={this.context}
                    />
                  </div>
                  {this.props.teacher.courses && this.props.teacher.courses.data.length ?
                    <div className={styles.rightSide}>
                      <TeacherBriefCourses {...this.props} />
                    </div> : null}
                </div>
              </RightContent>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

const TeacherBriefCourses = props => {
  const { teacher } = props
  if (!teacher.courses || !teacher.courses.data.length) {
    return null
  }

  return (
    <LoadingMask
      placeholderId="teacherCoursesPlaceholder"
      normalPlaceholder={false}
      facebookPlaceholder={true}
      loaderType={WebConstants.TEACHER_DETAIL_SHORT_COURSES_PLACEHOLDER}
    >
      <div className="full-width">
        <div className="teacher-detail__content__courses__header">
          <h3>{TT.t('teacher_taught_courses')}</h3>
        </div>
        {teacher.courses.data.slice(0, 3).map(course => {
          return (
            <div key={course.id} className="related-course-item">
              <LinkContainer to={`/course/${course.id}`}
                             className="link-tag">
                <div className="pb-5 pt-5 clearfix">
                  <div className="image">
                    <img className="full-width" src={course.cover_image}/>
                  </div>
                  <div className="content">
                    <h6>{course.title}</h6>
                    <div>
                      <RatingItem
                        num_stars={course.rating_count === 0 ? 0 : parseFloat(course.rating_points) / course.rating_count}
                        num_reviews={course.rating_count}
                      />
                    </div>
                    <span className="price">
                    {course.is_free ? TT.t('free') : ObjectUtils.currencyFormat(course.tuition_fee || 0, course.currency || 'VND')}
                  </span>
                  </div>
                </div>
              </LinkContainer>
            </div>
          )
        })}
        <div className="link-tag mt-15">
          <PrimaryAnchor
            href="#more-his-courses"
            title={TT.t('view_more')}
            customClasses="full-width"
          />
        </div>
      </div>
    </LoadingMask>
  )
}

const ReviewHeader = props => {
  const { teacher } = props
  if (!teacher.user) {
    return null
  }
  return (
    <div className="teacher-detail-review-header">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6">
          <div className="review-overall">
            <h5>{props.context.t('teacher_rating')}</h5>
            <p className="review-overall-point">
              <span>
                {teacher.user && teacher.user.rating_count ? parseFloat(teacher.user.rating_points / teacher.user.rating_count).toFixed(1) : 0}
              </span>
            </p>
            <div className="rating-wrapper">
              <RatingItem
                num_stars={teacher.user.rating_points / teacher.user.rating_count}
                num_reviews={teacher.user.rating_count}
              />
            </div>
          </div>
        </div>
        <div className="border-left col-xs-12 col-sm-6 col-md-6">
          <div className="text-left mb-20">
            <h3>{props.context.t('teacher_comments')}</h3>
            <span> ({props.teacher.reviews.data.length} {props.context.t('teacher_comments')})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const TeacherTaughtCourses = props => {
  const { teacher } = props
  if (!teacher.courses || !teacher.courses.data.length) {
    return null
  }

  const headers = {
    currentPage: parseInt(teacher.courses.headers.xPage) || 0,
    perPage: parseInt(teacher.courses.headers.xPerPage) || 0,
    total: parseInt(teacher.courses.headers.xTotal) || 0
  }

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="teacher-detail__content__courses" id="more-his-courses">
          <div className="teacher-detail__content__courses__header">
            <h4>{props.context.t('teacher_taught_courses')}</h4>
          </div>
          <CourseListInGridMode
            {...{
              courses: teacher.courses.data,
              itemClass: 'col-12 col-sm-12 col-md-6 col-lg-4 mb-15 mt-15'
            }}
          />

          {teacher.courses.data.length ? (
            <div className="pager-wrappper">
              <Pagination
                innerClass="pagination mt-8"
                activePage={headers.currentPage}
                itemsCountPerPage={headers.perPage}
                totalItemsCount={headers.total}
                pageRangeDisplayed={5}
                onChange={pageNumber => {
                  props.handlePageChange(pageNumber, headers.perPage)
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

TeacherDetail.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  fetchTeacherDetail: query => dispatch(fetchTeacherDetail(query)),
  fetchTeacherEducations: query => dispatch(fetchTeacherEducations(query)),
  fetchTeacherWorkExperiences: query => dispatch(fetchTeacherWorkExperiences(query)),
  fetchTeacherReviews: query => dispatch(fetchTeacherReviews(query)),
  fetchTeacherCourses: query => dispatch(fetchTeacherCourses(query)),
  showFooter: () => dispatch({ type: WebConstants.SHOW_FOOTER }),
  hideFooter: () => dispatch({ type: WebConstants.HIDE_FOOTER })
})

const mapStateToProps = state => {
  return {
    teacher: state.TeacherDetail
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(TeacherDetail, styles))
