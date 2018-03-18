import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as TeacherActions from '../../actions/TeacherCreators';
import {
  fetchCourseCategories
} from 'actions/ReferenceActions/ReferenceDataActionCreator';
import cssModules from 'react-css-modules';
import styles from './ListTeacher.module.scss';
import autoCompleteStyles from 'components/AutoComplete/AutoComplete.module.scss';
import { SERVER_NAME } from 'utils/CommonConstant';
import { getSelectedSpecializesFromCategory } from '../Courses/Filter/CourseFilterContainer';
import AutoCompleteSearchTeachers from './AutoCompleSearchTeachers';
import SelectFilterTeachers from './SelectFilterTeachers';


class SearchSectionContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCourseCategories());
  }

  searchQuery(q, filters) {
    return {
      q,
      categories: filters.selectedCategories.map(category => category.id),
      specializes: filters.selectedSpecializes.map(spec => spec.id)
    };
  }

  searchTeachers(filters) {
    this.props.dispatch(
      TeacherActions.searchTeachers(
        this.searchQuery(filters.term, filters)
      )
    );
  }

  loadSuggestionsTeacher(event) {
    this.props.dispatch(
      TeacherActions.loadSuggestionsTeacher(
        this.searchQuery(event.target.value, this.props.filters)
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

  renderSuggestion(suggestion, handleAddCriteria) {
    if (!suggestion.user) {
      return null
    }
    return (
      <div className="d-flex flex-horizontal pt-10 pl-10"
           key={'suggestion_' + suggestion.id}>
        <div>
          <img
            src={suggestion.avatar ? SERVER_NAME + suggestion.avatar : 'http://placehold.it/75x75'}
            alt=""
            className={autoCompleteStyles.itemAvatar + ' img-responsive img-circle'}/>
        </div>
        <div className={autoCompleteStyles.suggestionLine}>
          <a className="pl-10 d-flex flex-vertical suggestion-line"
             onClick={() => handleAddCriteria(suggestion.id, suggestion.title)}>
            <span className="header">{suggestion.title}</span>
            <span className="sub-header">{suggestion.user.name}</span>
          </a>
        </div>
      </div>
    );
  }

  removeFilterCriteria(currentFilters, filterValue, filterType) {
    if (Array.isArray(currentFilters[filterType])) {
      const clonedFilters = JSON.parse(JSON.stringify(currentFilters[filterType]));
      currentFilters[filterType] = clonedFilters.filter(f => f.id !== Number(filterValue));
    } else {
      currentFilters[filterType] = true;
    }
    return currentFilters;
  }

  addFilterCriteria(currentFilters, filterValue, filterType) {
    // handle for multiple select filter options
    if (Array.isArray(currentFilters[filterType])) {
      let selectedFilters = JSON.parse(JSON.stringify(currentFilters[filterType]));
      selectedFilters.push(filterValue);
      currentFilters[filterType] = selectedFilters;
    } else {
      currentFilters.term = filterValue;
    }

    return currentFilters;
  }

  doRemoveFilter(filterId, typeFilter) {
    const removedFilters = this.removeFilterCriteria(this.props.filters, filterId, typeFilter);
    this.props.dispatch(TeacherActions.updateFilterTeacher(removedFilters));
    this.searchTeachers(removedFilters);
  }

  doSelectFilter(filter, category) {
    let nextFilters = this.addFilterCriteria(this.props.filters, filter, category);
    this.props.dispatch(TeacherActions.updateFilterTeacher(nextFilters));
    this.searchTeachers(nextFilters);
  }

  handleAddCriteria(id, title) {
    this.context.router.history.push('/teacher/' + id);
  }

  render() {
    let {
      handleSubmit, categories, suggestions, showSuggestion, loadingSuggestion, filters, listSpecializes
    } = this.props;
    const { selectedCategories, selectedSpecializes } = filters;

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className='inline-form' multiple={true}>
            <div className={styles.filterActionBlock + ' col-md-12 col-sm-12'}>
              <div className="row full-height">
                <AutoCompleteSearchTeachers {...{
                  selectedCategories, selectedSpecializes, suggestions,
                  filters, showSuggestion, loadingSuggestion,
                  doRemoveFilter: this.doRemoveFilter.bind(this),
                  handleAddCriteria: this.handleAddCriteria.bind(this),
                  loadSuggestionsTeacher: this.loadSuggestionsTeacher.bind(this),
                  renderSuggestion: this.renderSuggestion.bind(this),
                }}/>

                <SelectFilterTeachers {...{
                  categories, selectedCategories, selectedSpecializes,
                  listSpecializes, doSelectFilter: this.doSelectFilter.bind(this),
                }} />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


SearchSectionContainer.contextTypes = {
  t: React.PropTypes.func.isRequired, router: React.PropTypes.object
};

const mapStateToProps = (state) => {
  const { suggestions, filters, showSuggestion, loadingSuggestion } = state.Teachers
  const categories = state.referenceData.courseCategories || []
  return {
    categories,
    suggestions,
    filters,
    showSuggestion,
    loadingSuggestion,
    listSpecializes: getSelectedSpecializesFromCategory(categories, filters.selectedCategories),
  }
};

export default connect(mapStateToProps)(reduxForm({
  form: 'teacherFilterForm', fields: ['key_word', 'category_ids']
})(cssModules(SearchSectionContainer, styles)));
