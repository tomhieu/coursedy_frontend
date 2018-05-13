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
} from '../../../actions/TeacherActionCreators'
import LoadingMask from '../../../components/LoadingMask/LoadingMask'
import * as WebConstants from '../../../constants/WebConstants'
import { FETCH_CATEGORIES } from '../../../actions/AsyncActionCreator'
import Network from 'utils/network'
import ReviewTeacherForm from './Content/ReviewTeacherForm'


class TeacherDetail extends Component {
  componentDidMount() {
    this.props.fetchCategories()
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

  fetchTeacherReviewsWithPageNumber(page, per_page) {
    this.props.fetchTeacherReviews({
      teacherId: parseInt(this.props.match.params.id),
      query: {page, per_page}
    });
  }

  render() {
    return (
      <section className="full-width-in-container teacher-detail">
        <section className="teacher-detail__header fixed-top-profile-teacher">
          <TeacherProfileSection {...this.props} />
        </section>

        <section className="teacher-detail__content">
          <section className="container">
            <TeacherBackgroundSection
              {...this.props}
              context={this.context}
            />

            <TeacherReviewSection
              {...this.props}
              context={this.context}
              fetchTeacherReviewsWithPageNumber={this.fetchTeacherReviewsWithPageNumber.bind(this)}
            />

            <TeacherTaughtCoursesSection
              {...this.props}
              handlePageChange={this.fetchTeacherCoursesWithPageNumber.bind(this)}
              context={this.context}
            />
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
                     loaderType={WebConstants.TEACHER_DETAIL_PROFILE_PLACEHOLDER}>
          <TeacherProfileHeader {...props} />
        </LoadingMask>
      </div>
  )
}

const TeacherBackgroundSection = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <TeacherBackground teacher={props.teacher}/>
      </div>
    </div>
  )
}

const TeacherReviewSection = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="teacher-detail__content__review">
          <div className="teacher-detail__content__review__header mb-30">
            <h3>{props.context.t('teacher_review')}</h3>
          </div>
          <TeacherReviewList teacher={props.teacher} handlePageChange={props.fetchTeacherReviewsWithPageNumber}/>
          <ReviewTeacherForm />
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

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch({
    type: FETCH_CATEGORIES,
    payload: Network().get('categories'),
    meta: 'publicCourseListPlaceholder'
  }),
  fetchTeacherDetail: (query) => dispatch(fetchTeacherDetail(query)),
  fetchTeacherEducations: (query) => dispatch(fetchTeacherEducations(query)),
  fetchTeacherWorkExperiences: (query) => dispatch(fetchTeacherWorkExperiences(query)),
  fetchTeacherReviews: (query) => dispatch(fetchTeacherReviews(query)),
  fetchTeacherCourses: (query) => dispatch(fetchTeacherCourses(query)),
})

const getSpecializesFromCategories = (courseCategories, teacherCategories) => {
  if (!teacherCategories || !courseCategories) {
    return []
  }
  const specializes = []
  teacherCategories.map((category) => {
    courseCategories.map((courseCategory) => {
      if (courseCategory.name === category.name) {
        specializes.push(...courseCategory.children)
      }
    })
  })
  return specializes
}

const mapStateToProps = (state) => {
  const teacherCategories = state.TeacherDetail.categories || []
  const courseCategories = state.referenceData.courseCategories || []
  const specializes = getSpecializesFromCategories(courseCategories, teacherCategories)
  return {
    teacher: state.TeacherDetail,
    specializes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDetail)
