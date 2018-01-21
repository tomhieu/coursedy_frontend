import React, {Component} from 'react';
import {CourseFilter} from '../../components/index';
import * as Actions from '../../actions/CourseFilterActionCreator'
import {connect} from 'react-redux';
import {reduxForm, submit} from "redux-form";

class CourseFilterContainer extends Component {
  componentWillMount() {
    this.props.dispatch(Actions.fetchCategories());
    this.props.dispatch(Actions.fetchLocations());
  }

  searchCourse({selectedMinFee, selectedMaxFee, order_by, display_mode}) {
    const query = {
      q: this.props.filters.term,
      categories: this.props.filters.selectedCategories,
      locations: this.props.filters.selectedLocations,
      specializes: this.props.filters.selectedSpecializes,
      week_day: this.props.filters.selectedWeekDays,
      min_fee: selectedMinFee,
      max_fee: selectedMaxFee,
      order_by, display_mode
    };
    this.props.dispatch(Actions.searchCourse(query))
  }

  changeDisplayMode(mode) {
    this.props.dispatch(Actions.changeDisplayMode(mode))
  }

  changeCurrentPage(page) {
    this.props.dispatch(Actions.changeCurrentPage(page))
  }

  selectAllCourses(isTrue) {
    if (isTrue) {
      this.props.dispatch(Actions.removeAllCourses())
    } else {
      this.props.dispatch(Actions.selectAllCourses())
    }
  }

  loadSuggestions(event) {
    this.props.dispatch(Actions.loadSuggestions(this.props.filters, event.target.value))
  }

  doSelectFilter(filter, category) {
    this.props.dispatch(Actions.addFilterSuggestion(filter, category))
    this.searchCourse(this.props.formfieldValues)
  }

  doRemoveFilter(filterId, typeFilter) {
    this.props.dispatch(Actions.removeFilterSuggestion(filterId, typeFilter))
    this.searchCourse(this.props.formfieldValues)
  }

  render() {
    return (
      <CourseFilter {...this.props}
                    onSubmit={this.searchCourse.bind(this)}
                    changeDisplayModeHdl={this.changeDisplayMode}
                    changeCurrentPageHdl={this.changeCurrentPage}
                    selectAllCoursesHdl={this.selectAllCourses}
                    loadSuggestions={this.loadSuggestions.bind(this)}
                    onSelectFilter={this.doSelectFilter.bind(this)}
                    onRemoveFilter={this.doRemoveFilter.bind(this)}
      />
    )
  }
}

CourseFilterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const getSelectedSpecializesFromCategory = (categories, selectedCategories) => {
  if (!selectedCategories) {
    return [];
  }
  const selectedCategoryIds = selectedCategories.map(sc => {
    return sc.id
  })
  const selectCategoryList = categories.filter((category) => selectedCategoryIds.indexOf(category.id) >= 0);
  const selectSpecializes = [];
  selectCategoryList.map(sc => {
    selectSpecializes.push({name: sc.name, id: sc.id, options: sc.children})
  })
  return selectSpecializes
}

const mapStateToProps = (state) => {
  const {CourseFilter, form = {}} = state;
  const categories = state.Categories.data || []
  const {courses = [], selectedCourses = [], locations,
         totalResult = 0, groupSugestions, filters, showSuggestion, loadingSuggestion} = CourseFilter;
  const {courseFilterForm = {}} = form
  let initializeFields = courseFilterForm.values ? Object.assign({}, courseFilterForm.values) : {}

  if (courseFilterForm.values && filters.resetMinFee) {
    initializeFields = Object.assign({}, courseFilterForm.values, {selectedMinFee: ""})
  } else if (courseFilterForm.values && filters.resetMaxFee) {
    initializeFields = Object.assign({}, courseFilterForm.values, {selectedMaxFee: ""})
  }

  return {
    categories, courses, selectedCourses, locations,
    totalResult, filters, showSuggestion, groupSugestions, loadingSuggestion,
    formfieldValues: courseFilterForm.values ? courseFilterForm.values : {},
    listSpecializes: getSelectedSpecializesFromCategory(categories, filters.selectedCategories),
    initialValues: initializeFields
  };
};


export default connect(
  mapStateToProps
)(reduxForm({
  form: 'courseFilterForm',
  enableReinitialize: true,
  updateUnregisteredFields: true,
  fields: ['key_word', 'selectedMinFee', 'selectedMaxFee', 'sort_by', 'display_mode']
})(CourseFilterContainer))
