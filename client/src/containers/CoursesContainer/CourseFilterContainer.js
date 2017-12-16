import React, { Component } from 'react';
import { CourseFilter } from '../../components/index';
import * as Actions from '../../actions/CourseFilterActionCreator'
import { connect } from 'react-redux';
import {reduxForm} from "redux-form";

class CourseFilterContainer extends Component {
  componentWillMount(){
    this.props.dispatch(Actions.fetchCategories());
    this.props.dispatch(Actions.fetchLocations());
    this.props.dispatch(Actions.fetchWeekdays());
  }

  searchCourse({key_word, filter_category_ids, filter_location_ids, filter_course_levels, course_schedule_days, fees, start_time, end_time, sort_by, display_mode}){
    const query = {q: key_word, categories: filter_category_ids, locations: filter_location_ids, levels: filter_course_levels,
         week_day: course_schedule_days, fees, start_time, end_time, sort_by, display_mode};
    this.props.dispatch(Actions.searchCourse(query))
  }

  changeDisplayMode(mode) {
    this.props.dispatch(Actions.changeDisplayMode(mode))
  }

  changeCurrentPage(page) {
    this.props.dispatch(Actions.changeCurrentPage(page))
  }

  render(){
    return (
      <CourseFilter {...this.props} 
        onSubmit={this.searchCourse.bind(this)}
        changeDisplayModeHdl={this.changeDisplayMode}
        changeCurrentPageHdl={this.changeCurrentPage}
      />
    )
  }
}

CourseFilterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFilterContainer.propTypes = {

};

const getSelectedCategories = (categories, selectedCategoryIds) => {
    if (!selectedCategoryIds) {
        return [];
    }
    return categories.filter((category) => selectedCategoryIds.indexOf(category.id.toString()) >= 0);
}

const mapStateToProps = (state) => {
    const {CourseFilter, form = {}} = state;
    const {categories = [], locations = {}, weekdays = {}, totalResult = 0} = CourseFilter;
    const {courseFilterForm = {}} = form;
    if (!courseFilterForm.values) {
        return {categories, locations, weekdays, totalResult, selectedCategories : []};
    } else {
        const {filter_category_ids, filter_location_ids, course_schedule_day = []} = courseFilterForm.values;
        return {categories, locations, weekdays, totalResult, filter_category_ids, filter_location_ids, course_schedule_day,
            selectedCategories : getSelectedCategories(categories, filter_category_ids)
        };
    }
};


export default connect(
  mapStateToProps
)(reduxForm({
    form: 'courseFilterForm',
    fields: ['key_word', 'filter_category_ids', 'filter_location_ids', 'filter_course_levels', 'course_schedule_day', 'fees', 'start_time', 'end_time', 'sort_by', 'display_mode']
})(CourseFilterContainer))
