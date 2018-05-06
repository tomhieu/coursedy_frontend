import React, { Component } from 'react';
import { CourseList } from '../../../components/index';
import * as Actions from '../../../actions/CourseFilterActionCreator'
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import LoadingMask from "../../../components/LoadingMask/LoadingMask";
import * as CommonConstants from "utils/CommonConstant";
import {FETCH_COURSES} from "constants/Courses";
import { withRouter } from 'react-router'
import * as WebConstants from "constants/WebConstants";
import './PublicCourseList.scss'
import Network from "utils/network";

class PublicCourseListContainer extends Component {

  componentDidMount() {
    this.props.search(this.props);
    this.props.hideFooter();
    this.props.stretchFull();
  }

  componentWillUnmount() {
    this.props.showFooter();
    this.props.stretchAuto();
  }


  handlePageChange(currentPage) {
    this.props.search(Object.assign({}, this.props, {currentPage: currentPage}))
  }

  selectCourseHdl(courseId) {
    if (!this.props.selectedCourses.includes(courseId)) {
      this.props.selectCourse(courseId);
    } else {
      this.props.removeCourse(courseId);
    }
  }

  render() {
    const {courses, isFetching, displayMode} = this.props;
    return (
      <LoadingMask placeholderId="publicCourseListPlaceholder"
                   normalPlaceholder={displayMode === 'grid'}
                   facebookPlaceholder={displayMode !== 'grid'}
                   loaderType="COURSE_ITEM_PLACEHOLDER"
                   repeatTime={4}>
        <div className="public-course-list">
          <div className="container-fluid mt-15 mb-15">
            <CourseList
              {...this.props}
              itemClass='col-xs-12 col-sm-4 col-md-3 mb-15'
              selectCourseHdl={this.selectCourseHdl.bind(this)}
              isPublic={true}
            />
          </div>
          {
            !isFetching && courses.length > 0 ? (
              <div className="pagination-course_list ">
                <Pagination
                  activePage={this.props.currentPage}
                  itemsCountPerPage={this.props.perPage}
                  totalItemsCount={this.props.totalResult}
                  pageRangeDisplayed={5}
                  activeClass={'active'}
                  onChange={this.handlePageChange.bind(this)}
                />
              </div>
            ) : null
          }
        </div>
      </LoadingMask>
    )
  }
}

PublicCourseListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PublicCourseListContainer.propTypes = {
  courses: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  keyWord: state.CourseFilter.keyWord,
  startTime: state.CourseFilter.startTime,
  endTime: state.CourseFilter.endTime,
  selectedFees: state.CourseFilter.selectedFees,
  selectedCategoryIds: state.CourseFilter.selectedCategoryIds,
  selectedLocationIds: state.CourseFilter.selectedLocationIds,
  selectedSpecializes: state.CourseFilter.selectedSpecializes,
  selectedWeekdays: state.CourseFilter.selectedWeekdays,
  courses: state.CourseFilter.courses,
  isFetching: state.CourseFilter.isFetching,
  currentPage: state.CourseFilter.currentPage,
  perPage: state.CourseFilter.perPage,
  totalResult: state.CourseFilter.totalResult,
  displayMode: state.CourseFilter.displayMode,
  selectedCourses: state.CourseFilter.selectedCourses,
  sortBy: state.CourseFilter.sortBy,
  sortOrder: state.CourseFilter.sortOrder,


  followedCourses: state.PublicCourseList.followedCourses
});

const buildQuery = (props) => {
  return {
    q: props.keyWord,
    categories: props.selectedCategoryIds,
    locations: props.selectedLocationIds,
    levels: props.selectedSpecializes,
    week_day: props.selectedWeekdays,
    fees: props.selectedFees,
    start_time: props.startTime,
    end_time: props.endTime,
    page: props.currentPage,
    sort_by: props.sortBy,
    sort_order: props.sortOrder,
    per_page: props.perPage
  }
}

const mapDispatchToProps = (dispatch) => ({
  search: (props) => dispatch({
    type: FETCH_COURSES,
    payload: Network().get('courses/search', buildQuery(props)),
    meta: 'publicCourseListPlaceholder'
  }),
  selectCourse: (courseId) => dispatch(Actions.selectCourse(courseId)),
  removeCourse: (courseId) => dispatch(Actions.removeCourse(courseId)),
  showFooter: () => dispatch({ type: WebConstants.SHOW_FOOTER }),
  hideFooter: () => dispatch({ type: WebConstants.HIDE_FOOTER }),
  stretchFull: () => dispatch({ type: WebConstants.STETCH_FULL }),
  stretchAuto: () => dispatch({ type: WebConstants.STETCH_AUTO }),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(PublicCourseListContainer));
