import React, { Component } from 'react';
import { CourseFilter } from '../../components/index';
import * as Actions from '../../actions/CourseFilterActionCreator'
import { connect } from 'react-redux';

class CourseFilterContainer extends Component {
  componentWillMount(){
    this.props.dispatch(Actions.fetchCategories());
    this.props.dispatch(Actions.fetchLocations());
    this.props.dispatch(Actions.fetchWeekdays());
  }

  getSelect2Value(e){
    let options = e.target.options
    let optionArray = []

    for(var i = 0; i < options.length; i++){
      optionArray[i] = options[i]
    }

    let selectedValues = optionArray.filter((option) => {
      return option.selected
    }).map((option) => {
      return parseInt(option.value)
    })

    return selectedValues
  }

  onCategoryChange(e){
    this.props.dispatch(Actions.reloadCourseLevels(this.getSelect2Value(e)))
  }

  onSelectCourseLevel(e){
    this.props.dispatch(Actions.selectCourseLevel(e.target.value, e.target.checked))
  }

  onSelectWeekDay(e){
    this.props.dispatch(Actions.selectWeekday(e.target.value, e.target.checked))
  }

  onFeeChange(e){
    this.props.dispatch(Actions.selectFee(e.target.value, e.target.checked))
  }

  onKeyWordChange(e){
    this.props.dispatch(Actions.changeKeyWord(e.target.value))
  }

  onStartTimeChange(e){
    let time = e.target.value
    if (!time) return false
    time = parseFloat(time)
    let endTime = this.props.endTime
    if(endTime && time > endTime) {
      this.props.dispatch(Actions.setStartTimeError(true))
      return false
    }
    this.props.dispatch(Actions.setStartTimeError(false))
    this.props.dispatch(Actions.selectStartTime(time))
  }

  onEndTimeChange(e){
    let time = e.target.value
    if (!time) return false
    time = parseFloat(time)
    let startTime = this.props.startTime
    if(startTime && time < startTime ) {
      this.props.dispatch(Actions.setEndTimeError(true))
      return false
    }
    this.props.dispatch(Actions.setEndTimeError(false))
    this.props.dispatch(Actions.selectEndTime(time))
  }

  onLocationChange(e){
    this.props.dispatch(Actions.selectCourseLocations(this.getSelect2Value(e)))
  }

  searchCourse(e){
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

  render(){
    return (
      <CourseFilter {...this.props}
                    onCategoryChange={this.onCategoryChange.bind(this)}
                    onLocationChange={this.onLocationChange.bind(this)}
                    onSelectCourseLevel={this.onSelectCourseLevel.bind(this)}
                    onSelectWeekDay={this.onSelectWeekDay.bind(this)}
                    onFeeChange={this.onFeeChange.bind(this)}
                    onStartTimeChange={this.onStartTimeChange.bind(this)}
                    onEndTimeChange={this.onEndTimeChange.bind(this)}
                    onKeyWordChange={this.onKeyWordChange.bind(this)}
                    searchCourse={this.searchCourse.bind(this)}
      />
    )
  }
}

CourseFilterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFilterContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  categories: state.CourseFilter.categories,
  locations: state.CourseFilter.locations,
  weekdays: state.CourseFilter.weekdays,
  startTime: state.CourseFilter.startTime,
  endTime: state.CourseFilter.endTime,
  selectedFees: state.CourseFilter.selectedFees,
  selectedCategoryIds: state.CourseFilter.selectedCategoryIds,
  selectedLocationIds: state.CourseFilter.selectedLocationIds,
  selectedLevels: state.CourseFilter.selectedLevels,
  selectedWeekdays: state.CourseFilter.selectedWeekdays,
  startTimeError: state.CourseFilter.startTimeError,
  endTimeError: state.CourseFilter.endTimeError
});


export default connect(
  mapStateToProps
)(CourseFilterContainer)
