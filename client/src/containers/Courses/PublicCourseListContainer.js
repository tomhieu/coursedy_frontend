import React, { Component } from 'react';
import { CourseList } from '../../components/index';
import * as Actions from '../../actions/CourseFilterActionCreator'
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';



class PublicCourseListContainer extends Component {

  componentDidMount() {
    let query = {}
    query['q'] = this.props.keyWord
    query['categories'] = this.props.selectedCategoryIds
    query['locations'] = this.props.selectedLocationIds
    query['levels'] = this.props.selectedLevels
    query['week_day'] = this.props.selectedWeekdays
    query['fees'] = this.props.selectedFees
    query['start_time'] = this.props.startTime
    query['end_time'] = this.props.endTime
    query['per_page'] = this.props.pageSize
    query['current_page'] = this.props.currentPage
    this.props.dispatch(Actions.searchCourse(query))
  }

  handlePageChange(currentPage) {
    console.log('DEBUG')
    console.log(currentPage)
    let query = {}
    query['q'] = this.props.keyWord
    query['categories'] = this.props.selectedCategoryIds
    query['locations'] = this.props.selectedLocationIds
    query['levels'] = this.props.selectedLevels
    query['week_day'] = this.props.selectedWeekdays
    query['fees'] = this.props.selectedFees
    query['start_time'] = this.props.startTime
    query['end_time'] = this.props.endTime
    query['per_page'] = this.props.pageSize
    query['current_page'] = currentPage
    this.props.dispatch(Actions.searchCourse(query))
  }

  selectCourse(courseId) {
    console.log("DEBUG selectCourse")
    console.log(courseId)
  }

  render() {
    return (
      <div className="public-course-list">
        <CourseList {...this.props} selectCourse={this.selectCourse}/>
        <div className="clear-fix"></div>
        <Pagination
          activePage={this.props.currentPage}
          itemsCountPerPage={this.props.pageSize}
          totalItemsCount={this.props.totalResult}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    )
  }
}

PublicCourseListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PublicCourseListContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  keyWord: state.CourseFilter.keyWord,
  startTime: state.CourseFilter.startTime,
  endTime: state.CourseFilter.endTime,
  selectedFees: state.CourseFilter.selectedFees,
  selectedCategoryIds: state.CourseFilter.selectedCategoryIds,
  selectedLocationIds: state.CourseFilter.selectedLocationIds,
  selectedLevels: state.CourseFilter.selectedLevels,
  selectedWeekdays: state.CourseFilter.selectedWeekdays,
  courses: state.CourseFilter.courses,
  currentPage: state.CourseFilter.currentPage,
  pageSize: state.CourseFilter.pageSize,
  totalResult: state.CourseFilter.totalResult,
});

export default connect(
  mapStateToProps
)(PublicCourseListContainer);