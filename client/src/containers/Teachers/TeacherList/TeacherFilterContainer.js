import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as TeacherActions from 'actions/TeacherActionCreators';
import { fetchCourseCategories } from 'actions/ReferenceActions/ReferenceDataActionCreator';
import cssModules from 'react-css-modules';
import AbstractFilter from 'components/Core/AbstractFilterComponent';
import * as asyncActions from 'actions/AsyncActionCreator';
import Network from 'utils/network';
import styles from '../../../../styles/components/CommonFilterObjects.module.scss';
import { getSelectedSpecializesFromCategory } from '../../Courses/Filter/CourseFilterContainer';
import { FETCH_CATEGORIES, FETCH_LOCATIONS } from '../../../actions/AsyncActionCreator';
import BaseFilter from '../../../components/Courses/BaseFilter';


class TeacherFilterContainer extends AbstractFilter {
  componentDidMount() {
    this.props.dispatch(fetchCourseCategories());
  }

  loadSuggestionsTeacher(event) {
    if (event.target.value.trim() === '') {
      this.props.dispatch({ type: asyncActions.CLEAR_SUGGESTION });
      return;
    }

    this.props.dispatch(
      TeacherActions.loadSuggestionsTeacher(
        this.props.searchQuery(Object.assign({}, this.props.filters, { term: event.target.value.trim() }))
      )
    );
  }

  onSubmit(data) {
    this.props.dispatch(
      TeacherActions.searchTeachers(
        this.props.searchQuery(this.props.filters, data.key_word)
      )
    );
  }

  search(e) {
    let { key_word } = e;
    key_word = key_word ? key_word.trim() : '';
    if (key_word) {
      this.props.updateFilter({ term: key_word });
      this.props.searchTeachers(this.props.searchQuery(this.props.filters, key_word)).finally(() => {
        this.props.reset();
        this.props.clearSuggestion();
      });
    }
  }

  doRemoveFilter(filterId, typeFilter) {
    const removedFilters = this.removeFilterCriteria(this.props.filters, filterId, typeFilter);
    this.props.updateFilter(removedFilters);
    this.props.searchTeachers(this.props.searchQuery(removedFilters));
  }

  doSelectFilter(filter, category) {
    const nextFilters = this.addFilterCriteria(this.props.filters, filter, category);
    this.props.updateFilter(nextFilters);
    this.props.searchTeachers(this.props.searchQuery(nextFilters));
  }

  onSelectTeacher(id) {
    this.props.clearSuggestion();
    this.context.router.history.push(`/teachers/${id}`);
  }

  render() {
    return (
      <div className="d-flex flex-auto course-filter-container">
        <BaseFilter
          {...this.props}
          onSubmit={this.search.bind(this)}
          search={this.search.bind(this)}
          selectAllCoursesHdl={this.selectAllCourses}
          loadSuggestions={this.loadSuggestionsTeacher.bind(this)}
          onSelectFilter={this.doSelectFilter.bind(this)}
          onRemoveFilter={this.doRemoveFilter.bind(this)}
          onSelectSuggestion={this.onSelectTeacher.bind(this)}
          closeSuggestion={this.props.closeSuggestion}
          courseFilterMode={false}
          placeholder={this.context.t('search_teacher')}
        />
      </div>
    );
  }
}


TeacherFilterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired, router: React.PropTypes.object
};

const mapStateToProps = (state) => {
  const { form = {}, Teachers } = state;
  const { lang } = state.i18nState;
  const {
    filters, showSuggestion, loadingSuggestion, headers
  } = Teachers;
  const { teacherFilterForm = {} } = form;
  const categories = state.referenceData.courseCategories || [];
  const suggestions = state.Teachers.suggestions.map((s) => {
    return {
      avatar: s.user.avatar || null,
      id: s.id,
      title: s.title || '',
      sub_title: s.user ? s.user.name : ''
    };
  });

  return {
    categories,
    suggestions,
    filters,
    showSuggestion,
    loadingSuggestion,
    totalResult: headers !== null ? headers.xTotal : 0,
    formfieldValues: teacherFilterForm.values ? teacherFilterForm.values : {},
    listSpecializes: getSelectedSpecializesFromCategory(categories, filters.selectedCategories),
    lang
  };
};

const mapDispatchToProps = dispatch => ({
  searchTeachers: filters => dispatch(TeacherActions.searchTeachers(filters)),
  clearSuggestion: () => dispatch({ type: asyncActions.CLEAR_SUGGESTION_TEACHERS }),
  loadSuggestions: query => dispatch({
    type: asyncActions.LOAD_SUGGESTION_TEACHERS,
    payload: Network().get('courses/search', query),
    meta: 'courseSuggestionPlaceholder'
  }),
  updateFilter: filters => dispatch(TeacherActions.updateFilterTeacher(filters)),
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
  closeSuggestion: () => dispatch({ type: asyncActions.CLEAR_SUGGESTION_TEACHERS })
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'teacherFilterForm', fields: ['key_word', 'category_ids']
})(cssModules(TeacherFilterContainer, styles)));
