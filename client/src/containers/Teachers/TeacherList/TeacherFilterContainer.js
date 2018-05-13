import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as TeacherActions from 'actions/TeacherActionCreators';
import {fetchCourseCategories} from 'actions/ReferenceActions/ReferenceDataActionCreator';
import cssModules from 'react-css-modules';
import styles from '../../../../styles/components/CommonFilterObjects.module.scss';
import {getSelectedSpecializesFromCategory} from '../../Courses/Filter/CourseFilterContainer';
import AbstractFilter from 'components/Core/AbstractFilterComponent';
import * as asyncActions from 'actions/AsyncActionCreator';
import {FETCH_CATEGORIES, FETCH_LOCATIONS} from "../../../actions/AsyncActionCreator";
import Network from "utils/network";
import BaseFilter from "../../../components/Courses/BaseFilter";


class TeacherFilterContainer extends AbstractFilter {
  componentDidMount() {
    this.props.dispatch(fetchCourseCategories());
  }

  loadSuggestionsTeacher(event) {
    if (event.target.value.trim() === '') {
      this.props.dispatch({type: asyncActions.CLEAR_SUGGESTION});
      return;
    }

    this.props.dispatch(
      TeacherActions.loadSuggestionsTeacher(
        this.searchQuery(Object.assign({}, this.props.filters, {term: event.target.value.trim()}))
      )
    );
  }

  onSubmit(data) {
    this.props.dispatch(
      TeacherActions.searchTeachers(
        this.searchQuery(data.key_word, this.props.filters)
      )
    );
  }

  search(e) {
    this.props.searchTeachers(this.searchQuery(this.props.filters));
  }

  doRemoveFilter(filterId, typeFilter) {
    const removedFilters = this.removeFilterCriteria(this.props.filters, filterId, typeFilter);
    this.props.dispatch(TeacherActions.updateFilterTeacher(removedFilters));
    this.props.searchTeachers(this.searchQuery(removedFilters));
  }

  doSelectFilter(filter, category) {
    let nextFilters = this.addFilterCriteria(this.props.filters, filter, category);
    this.props.dispatch(TeacherActions.updateFilterTeacher(nextFilters));
    this.props.searchTeachers(this.searchQuery(nextFilters));
  }

  searchQuery(filters) {
    return {
      q: filters.term,
      categories: filters.selectedCategories.map(category => category.id),
      specializes: filters.selectedSpecializes.map(spec => spec.id)
    };
  }

  onSelectTeacher(id) {
    this.props.clearSuggestion();
    this.context.router.history.push('/teachers/' + id);
  }

  render() {

    return (
      <BaseFilter {...this.props}
                    onSubmit={this.search.bind(this)}
                    search={this.search.bind(this)}
                    selectAllCoursesHdl={this.selectAllCourses}
                    loadSuggestions={this.loadSuggestionsTeacher.bind(this)}
                    onSelectFilter={this.doSelectFilter.bind(this)}
                    onRemoveFilter={this.doRemoveFilter.bind(this)}
                    onSelectSuggestion={this.onSelectTeacher.bind(this) }
                    closeSuggestion={this.props.closeSuggestion}
                    courseFilterMode={false}
      />
    );
  }
}


TeacherFilterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired, router: React.PropTypes.object
};

const mapStateToProps = (state) => {
  const {form = {}, Teachers} = state;
  const { filters, showSuggestion, loadingSuggestion, headers } = Teachers;
  const {teacherFilterForm = {}} = form;
  const categories = state.referenceData.courseCategories || [];
  const suggestions = state.Teachers.suggestions.map((s) => {
    return {
      avatar: s.user.avatar || null,
      id: s.id,
      title: s.title || '',
      sub_title: s.user ? s.user.name : ''
    }
  });

  return {
    categories,
    suggestions,
    filters,
    showSuggestion,
    loadingSuggestion,
    totalResult: headers != null ? headers.xTotal : 0,
    formfieldValues: teacherFilterForm.values ? teacherFilterForm.values : {},
    listSpecializes: getSelectedSpecializesFromCategory(categories, filters.selectedCategories),
  }
};

const mapDispatchToProps = (dispatch) => ({
  searchTeachers: (filters) => dispatch(TeacherActions.searchTeachers(filters)),
  clearSuggestion: () => dispatch({type: asyncActions.CLEAR_SUGGESTION}),
  loadSuggestions: (query) => dispatch({
    type: asyncActions.LOAD_SUGGESTION_TEACHERS,
    payload: Network().get('courses/search', query),
    meta: 'courseSuggestionPlaceholder'
  }),
  updateFilter: (filters) => dispatch(TeacherActions.updateFilterTeacher(filters)),
  fetchCategories: () => dispatch({
    type: FETCH_CATEGORIES,
    payload: Network().get('categories'),
    meta: 'publicTeacherListPlaceholder'
  }),
  fetchLocations: () => dispatch({
    type: FETCH_LOCATIONS,
    payload: Network().get('locations'),
    meta: 'publicTeacherListPlaceholder'
  }),
  closeSuggestion: () => dispatch({type: asyncActions.CLEAR_SUGGESTION})
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'teacherFilterForm', fields: ['key_word', 'category_ids']
})(cssModules(TeacherFilterContainer, styles)));
