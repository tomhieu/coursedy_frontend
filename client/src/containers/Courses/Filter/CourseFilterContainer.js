import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, change, untouch } from 'redux-form';
import { MAX_FEE, MIN_FEE } from 'utils/CommonConstant';
import { TT } from 'utils/locale';
import Network from 'utils/network';
import { validate } from 'validations/CourseFilterValidator';
import * as WebConstants from 'constants/WebConstants';
import * as CourseFilterActions from '../../../actions/CourseFilterActionCreator';
import * as asyncActions from '../../../actions/AsyncActionCreator';
import AbstractFilter from '../../../components/Core/AbstractFilterComponent';
import { FETCH_COURSES } from '../../../constants/Courses';
import BaseFilter from '../../../components/Courses/BaseFilter';

class CourseFilterContainer extends AbstractFilter {
  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchLocations();
    this.props.noShadowHeader();
  }

  componentWillUnmount() {
    this.props.shadowHeader();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      this.props.fetchCategories();
      this.search();
    }
  }

  changeDisplayMode(mode) {
    this.props.changeDisplayMode(mode);
  }

  loadSuggestions(event) {
    if (event.target.value === '') {
      this.props.clearSuggestion();
      return;
    }

    const { filters } = this.props;
    const query = {
      q: event.target.value,
      categories: filters.selectedCategories.map(category => category.id),
      locations: filters.selectedLocations.map(loc => loc.id),
      specializes: filters.selectedSpecializes.map(spec => spec.id),
      week_day: filters.selectedWeekDays.map(week => week.id),
    };
    this.props.loadSuggestions(query);
  }

  doSelectFilter(filter, category) {
    let {
      selectedMinFee, selectedMaxFee, order_by, display_mode
    } = this.props.formfieldValues;
    const currentFilters = JSON.parse(JSON.stringify(this.props.filters));
    const nextFilters = this.addFilterCriteria(currentFilters, filter, category);
    this.props.updateFilter(nextFilters);

    if (category === MIN_FEE) {
      selectedMinFee = filter;
    } else if (category === MAX_FEE) {
      selectedMaxFee = filter;
    }
    this.props.searchCourse(this.buildQuery(nextFilters, selectedMinFee, selectedMaxFee, order_by, display_mode));
  }

  search(e = {}) {
    let orderBy, keyWord;
    if (e.key_word) {
      keyWord = e.key_word.trim();
      this.props.updateFilter({ term: keyWord });
    }

    if (e.target && e.target.value) {
      orderBy = e.target.value;
      this.props.updateFilter({ orderBy });
    }

    const { selectedMinFee, selectedMaxFee, display_mode } = this.props.formfieldValues;
    this.props.searchCourse(this.buildQuery(
      this.props.filters,
      selectedMinFee,
      selectedMaxFee,
      orderBy,
      display_mode,
      keyWord
    )).finally(() => {
      this.props.reset();
      this.props.closeSuggestion();
    });
  }

  buildQuery(filters, selectedMinFee, selectedMaxFee, order_by, display_mode, key_word) {
    return {
      q: (typeof key_word !== 'undefined' && key_word) ? key_word : filters.term,
      categories: filters.selectedCategories.map(category => category.id),
      locations: filters.selectedLocations.map(loc => loc.id),
      specializes: filters.selectedSpecializes.map(spec => spec.id),
      week_day: filters.selectedWeekDays.map(week => week.id),
      min_fee: selectedMinFee,
      max_fee: selectedMaxFee,
      order_by,
      display_mode,
      per_page: this.props.perPage,
      page: this.props.currentPage
    };
  }

  doRemoveFilter(filterId, typeFilter) {
    const currentFilters = JSON.parse(JSON.stringify(this.props.filters));
    const removedFilters = this.removeFilterCriteria(currentFilters, filterId, typeFilter);
    this.props.updateFilter(removedFilters);
    let {
      selectedMinFee, selectedMaxFee, order_by, display_mode
    } = this.props.formfieldValues;

    if (typeFilter === MIN_FEE) {
      selectedMinFee = '';
      this.props.resetFields({
        selectedMinFee: ''
      });
    }

    if (typeFilter === MAX_FEE) {
      selectedMaxFee = '';
      this.props.resetFields({
        selectedMaxFee: ''
      });
    }
    this.props.searchCourse(this.buildQuery(removedFilters, selectedMinFee, selectedMaxFee, order_by, display_mode));
  }

  autoCompleteSearchCourse(id) {
    this.props.closeSuggestion();
    this.context.router.history.push(`/courses/${id}`);
  }

  render() {
    return (
      <BaseFilter
        {...this.props}
        onSubmit={this.search.bind(this)}
        search={this.search.bind(this)}
        changeDisplayModeHdl={this.changeDisplayMode}
        loadSuggestions={this.loadSuggestions.bind(this)}
        onSelectFilter={this.doSelectFilter.bind(this)}
        onRemoveFilter={this.doRemoveFilter.bind(this)}
        onSelectSuggestion={this.autoCompleteSearchCourse.bind(this)}
        closeSuggestion={this.props.closeSuggestion}
        courseFilterMode
        placeholder={this.context.t('search_course')}
      />
    );
  }
}

CourseFilterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

export const getSelectedSpecializesFromCategory = (categories, selectedCategories) => {
  if (!selectedCategories) {
    return [];
  }
  const selectedCategoryIds = selectedCategories.map((sc) => {
    return sc.id;
  });
  const selectCategoryList = categories.filter(category => selectedCategoryIds.indexOf(category.id) >= 0);
  return selectCategoryList.map((sc) => {
    return ({ name: sc.name, id: sc.id, options: sc.children });
  });
};

const mapStateToProps = (state) => {
  const { CourseFilter, form = {}, referenceData } = state;
  const categories = referenceData.courseCategories || [];
  const locations = referenceData.locations || [];
  const { lang } = state.i18nState;
  const {
    courses = [], selectedCourses = [], displayMode,
    totalResult = 0, currentPage, perPage, orderBy,
    sugestions, filters, showSuggestion, loadingSuggestion
  } = CourseFilter;
  const { courseFilterForm = {} } = form;
  const filterSuggestions = [];
  sugestions.map(sug => filterSuggestions.push({
    id: sug.id,
    avatar: sug.cover_image,
    title: sug.title,
    sub_title: TT.changeLocale(lang).t('teacher_info_suggestion', { teacher: sug.user.name })
  }));

  let initializeFields = courseFilterForm.values ? Object.assign({}, courseFilterForm.values) : {};
  if (courseFilterForm.values && filters.resetMinFee) {
    initializeFields = { ...initializeFields, selectedMinFee: '' };
  }
  if (courseFilterForm.values && filters.resetMaxFee) {
    initializeFields = { ...initializeFields, selectedMaxFee: '' };
  }

  return {
    categories,
    courses,
    selectedCourses,
    locations,
    lang,
    displayMode,
    totalResult,
    currentPage,
    perPage,
    orderBy,
    filters,
    showSuggestion,
    suggestions: filterSuggestions,
    loadingSuggestion,
    formfieldValues: initializeFields,
    listSpecializes: getSelectedSpecializesFromCategory(categories, filters.selectedCategories),
    initialValues: initializeFields
  };
};

const mapDispatchToProps = dispatch => ({
  searchCourse: query => dispatch({
    type: FETCH_COURSES,
    payload: Network().get('courses/search', query),
    meta: 'publicCourseListPlaceholder'
  }),
  changeDisplayMode: mode => dispatch(CourseFilterActions.changeDisplayMode(mode)),
  clearSuggestion: () => dispatch({ type: asyncActions.CLEAR_SUGGESTION }),
  loadSuggestions: query => dispatch({
    type: asyncActions.LOAD_SUGGESTION,
    payload: Network().get('courses/search', query),
    meta: 'courseSuggestionPlaceholder'
  }),
  updateFilter: filters => dispatch(CourseFilterActions.updateFilter(filters)),
  fetchCategories: () => dispatch({
    type: asyncActions.FETCH_CATEGORIES,
    payload: Network().get('categories'),
    meta: 'publicCourseListPlaceholder'
  }),
  fetchLocations: () => dispatch({
    type: asyncActions.FETCH_LOCATIONS,
    payload: Network().get('locations'),
    meta: 'publicCourseListPlaceholder'
  }),
  noShadowHeader: () => dispatch({ type: WebConstants.ADD_HEADER_CLASS, payload: 'no-shadow' }),
  shadowHeader: () => dispatch({ type: WebConstants.REMOVE_HEADER_CLASS }),
  closeSuggestion: () => dispatch({ type: asyncActions.CLOSE_COURSE_FILTER_SUGGESTION }),
  resetFields: (fieldsObj) => {
    Object.keys(fieldsObj).forEach((fieldKey) => {
      // reset the field's value
      dispatch(change('courseFilterForm', fieldKey, fieldsObj[fieldKey]));
      // reset the field's error
      dispatch(untouch('courseFilterForm', fieldKey));
    });
  }
});


export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'courseFilterForm',
  updateUnregisteredFields: true,
  fields: ['key_word', 'selectedMinFee', 'selectedMaxFee', 'sort_by', 'display_mode'],
  validate
})(CourseFilterContainer));
