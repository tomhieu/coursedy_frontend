import React, { Component } from 'react';
import { CourseList } from '../../components/index';
import * as Actions from '../../actions/CourseFilterActionCreator'
import { connect } from 'react-redux';

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
    this.props.dispatch(Actions.searchCourse(query))
  }

  render() {
    return (
      <CourseList {...this.props} />
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
  courses: state.CourseFilter.courses
});

export default connect(
  mapStateToProps
)(PublicCourseListContainer);
