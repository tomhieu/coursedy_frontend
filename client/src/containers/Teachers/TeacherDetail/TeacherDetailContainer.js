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
} from '../../../actions/TeacherCreators'
import LoadingMask from '../../../components/LoadingMask/LoadingMask'


class TeacherDetail extends Component {
  componentDidMount() {
    this.props.fetchTeacherDetail({ teacherId: parseInt(this.props.match.params.id), meta: 'teacherDetailProfilePlaceholder' })
    this.props.fetchTeacherEducations({ teacherId: parseInt(this.props.match.params.id), meta: 'userAccountPlaceholder' })
    this.props.fetchTeacherWorkExperiences({ teacherId: parseInt(this.props.match.params.id), meta: 'userAccountPlaceholder' })
    this.props.fetchTeacherReviews({ teacherId: parseInt(this.props.match.params.id), meta: 'userAccountPlaceholder' })
    this.props.fetchTeacherCourses({ teacherId: parseInt(this.props.match.params.id), meta: 'teacherCoursesPlaceholder' })
  }

  fetchTeacherCoursesWithPageNumber(page, per_page) {
    this.props.fetchTeacherCourses({
      teacherId: parseInt(this.props.match.params.id),
      query: {page, per_page}
    });
  }

  render() {
    return (
      <section className="full-width-in-container teacher-detail">
        <section className="teacher-detail__header">
          <TeacherProfileSection {...this.props} />
        </section>

        <section className="teacher-detail__content">
          <section className="container">
            <TeacherBackgroundSection {...this.props}
                                      context={this.context} />

            <TeacherReviewSection {...this.props} context={this.context} />

            <TeacherTaughtCoursesSection {...this.props}
                                         handlePageChange={this.fetchTeacherCoursesWithPageNumber.bind(this)}
                                         context={this.context} />
          </section>
        </section>
      </section>
    )
  }
}

const TeacherProfileSection = (props) => {
  return(
      <div className="container">
        <LoadingMask placeholderId="teacherDetailProfilePlaceholder"
                     normalPlaceholder={false}
                     facebookPlaceholder={true}
                     loaderType="TEACHER_DETAIL_PROFILE_PLACEHOLDER">
          <TeacherProfileHeader teacher={props.teacher}/>
        </LoadingMask>
      </div>
  )
}

const TeacherBackgroundSection = (props) => {
  return (
    <div className="row">
      <div className="col-sm-11">
        <TeacherBackground teacher={props.teacher}/>
      </div>
    </div>
  )
}

const TeacherReviewSection = (props) => {
  if (props.teacher.reviews || props.teacher.reviews.data.length) { return null }
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="teacher-detail__content__review">
          <div className="teacher-detail__content__review__header mb-30">
            <h3>{props.context.t('teacher_review')}</h3>
          </div>
          <TeacherReviewList teacher={props.teacher}/>
        </div>
      </div>
    </div>
  )
}

const TeacherTaughtCoursesSection = (props) => {
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
        <div className="teacher-detail__content__courses mt-50 mb-20">
          <div className="teacher-detail__content__courses__header">
            <h3>
              {props.context.t('teacher_taught_courses')}
            </h3>
          </div>
          <CourseListInGridMode {...{
            courses: teacher.courses.data,
            itemClass: 'col-12 col-sm-12 col-md-6 col-lg-4 mb-15 mt-15'
          }}/>

          {
            teacher.courses.data.length ?
              <div className="pager-wrappper">
                <Pagination
                  activePage={headers.currentPage}
                  itemsCountPerPage={headers.perPage}
                  totalItemsCount={headers.total}
                  pageRangeDisplayed={5}
                  onChange={(pageNumber) => {
                    props.handlePageChange(pageNumber, headers.perPage)
                  }} />
              </div>
              :null
          }
        </div>
      </div>
    </div>
  )
}

TeacherDetail.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    teacher: state.TeacherDetail
  }
}

export default connect(mapStateToProps, {
  fetchTeacherDetail,
  fetchTeacherEducations,
  fetchTeacherWorkExperiences,
  fetchTeacherReviews,
  fetchTeacherCourses,
})(TeacherDetail)
