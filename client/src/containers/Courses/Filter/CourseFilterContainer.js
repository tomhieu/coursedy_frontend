import React, {Component} from 'react';
import {CourseFilter} from '../../../components/index';
import * as RefrenceActions from '../../../actions/ReferenceActions/ReferenceDataActionCreator'
import * as CourseFilterActions from '../../../actions/CourseFilterActionCreator'
import {connect} from 'react-redux';
import {reduxForm} from "redux-form";
import {MAX_FEE, MIN_FEE} from "utils/CommonConstant";
import {TT} from "utils/locale";

class CourseFilterContainer extends Component {

  componentWillMount() {
    this.props.dispatch(RefrenceActions.fetchCourseCategories());
    this.props.dispatch(RefrenceActions.fetchLocations());
  }

  searchCourse(filters, selectedMinFee, selectedMaxFee, order_by, display_mode) {
    const query = {
      q: filters.term,
      categories: filters.selectedCategories.map(category => category.id),
      locations: filters.selectedLocations.map(loc => loc.id),
      specializes: filters.selectedSpecializes.map(spec => spec.id),
      week_day: filters.selectedWeekDays.map(week => week.id),
      min_fee: selectedMinFee,
      max_fee: selectedMaxFee,
      order_by, display_mode
    };
    this.props.dispatch(CourseFilterActions.searchCourse(query))
  }

  changeDisplayMode(mode) {
    this.props.dispatch(CourseFilterActions.changeDisplayMode(mode))
  }

  changeCurrentPage(page) {
    this.props.dispatch(CourseFilterActions.changeCurrentPage(page))
  }

  selectAllCourses(isTrue) {
    if (isTrue) {
      this.props.dispatch(CourseFilterActions.removeAllCourses())
    } else {
      this.props.dispatch(CourseFilterActions.selectAllCourses())
    }
  }

  loadSuggestions(event) {
    const filters = this.props.filters;
    const query = {
      q: event.target.value,
      categories: filters.selectedCategories.map(category => category.id),
      locations: filters.selectedLocations.map(loc => loc.id),
      specializes: filters.selectedSpecializes.map(spec => spec.id),
      week_day: filters.selectedWeekDays.map(week => week.id),
    };
    this.props.dispatch(CourseFilterActions.loadSuggestions(query))
  }

  doSelectFilter(filter, category) {
    let {selectedMinFee, selectedMaxFee, order_by, display_mode} = this.props.formfieldValues;
    let nextFilters = this.props.filters;

    if (category === MIN_FEE) {
      selectedMinFee = filter;
    } else if (category === MAX_FEE) {
      selectedMaxFee = filter;
    } else {
      nextFilters = this.addFilterCriteria(this.props.filters, filter, category);
    }

    this.props.dispatch(CourseFilterActions.updateFilter(nextFilters))
    this.searchCourse(nextFilters, selectedMinFee, selectedMaxFee, order_by, display_mode);
  }

  doRemoveFilter(filterId, typeFilter) {
    const {selectedMinFee, selectedMaxFee, order_by, display_mode} = this.props.formfieldValues;
    const removedFilters = this.removeFilterCriteria(this.props.filters, filterId, typeFilter);
    this.props.dispatch(CourseFilterActions.updateFilter(removedFilters))
    this.searchCourse(removedFilters, selectedMinFee, selectedMaxFee, order_by, display_mode)
  }

  addFilterCriteria(currentFilters, filterValue, filterType) {
    // handle for multiple select filter options
    if (Array.isArray(currentFilters[filterType])) {
      let selectedFilters = JSON.parse(JSON.stringify(currentFilters[filterType]));
      selectedFilters.push(filterValue)
      currentFilters[filterType] = selectedFilters
    } else {
      currentFilters.term = filterValue
    }

    return currentFilters;
  }

  removeFilterCriteria(currentFilters, filterValue, filterType) {
    if (Array.isArray(currentFilters[filterType])) {
      const clonedFilters = JSON.parse(JSON.stringify(currentFilters[filterType]))
      const updatedSelectedFilters = clonedFilters.filter(f => f.id != Number(filterValue))
      currentFilters[filterType] = updatedSelectedFilters
    } else {
      currentFilters[filterType] = true;
    }
    return currentFilters;
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

export const getSelectedSpecializesFromCategory = (categories, selectedCategories) => {
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
  const {CourseFilter, form = {}, referenceData} = state;
  const categories = referenceData.courseCategories || []
  const locations = referenceData.locations || []

  const {courses = [], selectedCourses = [],
         totalResult = 0, sugestions, filters, showSuggestion, loadingSuggestion} = CourseFilter;
  const {courseFilterForm = {}} = form;
  const filterSuggestions = [];
  sugestions.map(sug =>
    filterSuggestions.push({id: sug.id, avatar: sug.cover_image, title: sug.title,
                      sub_title: TT.t('teacher_info_suggestion', {teacher: sug.user.name})}));

  let initializeFields = courseFilterForm.values ? Object.assign({}, courseFilterForm.values) : {}

  if (courseFilterForm.values && filters.resetMinFee) {
    initializeFields = Object.assign({}, courseFilterForm.values, {selectedMinFee: ""})
  } else if (courseFilterForm.values && filters.resetMaxFee) {
    initializeFields = Object.assign({}, courseFilterForm.values, {selectedMaxFee: ""})
  }

  return {
    categories, courses, selectedCourses, locations,
    totalResult, filters, showSuggestion, suggestions: filterSuggestions, loadingSuggestion,
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
