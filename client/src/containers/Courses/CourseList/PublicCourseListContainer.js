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


class PublicCourseListContainer extends Component {

  componentDidMount() {
    let query = {}
    query['q'] = this.props.keyWord
    query['categories'] = this.props.selectedCategoryIds
    query['locations'] = this.props.selectedLocationIds
    query['levels'] = this.props.selectedSpecializes
    query['week_day'] = this.props.selectedWeekdays
    query['fees'] = this.props.selectedFees
    query['start_time'] = this.props.startTime
    query['end_time'] = this.props.endTime
    query['per_page'] = this.props.perPage
    query['page'] = this.props.currentPage
    query['sort_by'] = this.props.sortBy
    query['sort_order'] = this.props.sortOrder
    this.props.dispatch(Actions.searchCourse(query))
    this.props.dispatch({
      type: WebConstants.HIDE_FOOTER
    });
    this.props.dispatch({
      type: WebConstants.STETCH_FULL
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: WebConstants.SHOW_FOOTER
    });
    this.props.dispatch({
      type: WebConstants.STETCH_AUTO
    });
  }


  handlePageChange(currentPage) {
    let query = {}
    query['q'] = this.props.keyWord
    query['categories'] = this.props.selectedCategoryIds
    query['locations'] = this.props.selectedLocationIds
    query['levels'] = this.props.selectedSpecializes
    query['week_day'] = this.props.selectedWeekdays
    query['fees'] = this.props.selectedFees
    query['start_time'] = this.props.startTime
    query['end_time'] = this.props.endTime
    query['per_page'] = this.props.perPage
    query['page'] = currentPage
    query['sort_by'] = this.props.sortBy
    query['sort_order'] = this.props.sortOrder
    this.props.dispatch(Actions.searchCourse(query))
  }

  selectCourseHdl(courseId) {
    if (!this.props.selectedCourses.includes(courseId)) {
      this.props.dispatch(Actions.selectCourse(courseId))
    } else {
      this.props.dispatch(Actions.removeCourse(courseId))
    }
  }

  render() {
    const {courses, isFetching} = this.props;
    return (
      <LoadingMask belongingActions={[FETCH_COURSES]}>
        <div className="public-course-list">
          <CourseList
            {...this.props}
            selectCourseHdl={this.selectCourseHdl.bind(this)}
            isPublic={true}
            itemPerRowInGridMode={4}
            hasFilter={true}
          />
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

export default connect(
  mapStateToProps
)(withRouter(PublicCourseListContainer));
