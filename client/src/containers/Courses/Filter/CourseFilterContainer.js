import React from 'react';
import {CourseFilter} from '../../../components/index';
import * as RefrenceActions from '../../../actions/ReferenceActions/ReferenceDataActionCreator'
import * as CourseFilterActions from '../../../actions/CourseFilterActionCreator'
import * as asyncActions from '../../../actions/AsyncActionCreator'
import {connect} from 'react-redux';
import {reduxForm} from "redux-form";
import {MAX_FEE, MIN_FEE} from "utils/CommonConstant";
import {TT} from "utils/locale";
import {dispatch} from "redux";
import AbstractFilter from '../../../components/Core/AbstractFilterComponent';

class CourseFilterContainer extends AbstractFilter {

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
    if (event.target.value === '') {
      this.props.dispatch({type: asyncActions.CLEAR_SUGGESTION});
      return;
    }

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
    const currentFilters = JSON.parse(JSON.stringify(this.props.filters));
    let nextFilters = currentFilters;

    if (category === MIN_FEE) {
      selectedMinFee = filter;
    } else if (category === MAX_FEE) {
      selectedMaxFee = filter;
    } else {
      nextFilters = this.addFilterCriteria(currentFilters, filter, category);
    }

    this.props.dispatch(CourseFilterActions.updateFilter(nextFilters))
    this.searchCourse(nextFilters, selectedMinFee, selectedMaxFee, order_by, display_mode);
  }

  reloadCourseList() {
    let {selectedMinFee, selectedMaxFee, order_by, display_mode} = this.props.formfieldValues;
    this.searchCourse(this.props.filters, selectedMinFee, selectedMaxFee, order_by, display_mode);
  }

  doRemoveFilter(filterId, typeFilter) {
    const {selectedMinFee, selectedMaxFee, order_by, display_mode} = this.props.formfieldValues;
    const currentFilters = JSON.parse(JSON.stringify(this.props.filters));
    const removedFilters = this.removeFilterCriteria(currentFilters, filterId, typeFilter);
    this.props.dispatch(CourseFilterActions.updateFilter(removedFilters))
    this.searchCourse(removedFilters, selectedMinFee, selectedMaxFee, order_by, display_mode)
  }

  autoCompleteSearchCourse(id) {
    this.props.dispatch({type: asyncActions.CLEAR_SUGGESTION});
    this.context.router.history.push('/course/' + id);
  }

  render() {
    return (
      <CourseFilter {...this.props}
                    onSubmit={this.searchCourse.bind(this)}
                    reloadCourseList={this.reloadCourseList.bind(this)}
                    changeDisplayModeHdl={this.changeDisplayMode}
                    changeCurrentPageHdl={this.changeCurrentPage}
                    selectAllCoursesHdl={this.selectAllCourses}
                    loadSuggestions={this.loadSuggestions.bind(this)}
                    onSelectFilter={this.doSelectFilter.bind(this)}
                    onRemoveFilter={this.doRemoveFilter.bind(this)}
                    onSelectSuggestion={this.autoCompleteSearchCourse.bind(this)}
      />
    )
  }
}

CourseFilterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
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
