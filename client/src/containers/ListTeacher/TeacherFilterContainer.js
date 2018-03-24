import React  from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as TeacherActions from '../../actions/TeacherCreators';
import {
  fetchCourseCategories
} from 'actions/ReferenceActions/ReferenceDataActionCreator';
import cssModules from 'react-css-modules';
import styles from '../../../styles/components/CommonFilterObjects.module.scss';
import { getSelectedSpecializesFromCategory } from '../Courses/Filter/CourseFilterContainer';
import SuggestionBox from './SuggestionBox';
import SelectFilterTeachers from './SelectFilterTeachers';
import AbstractFilter from '../../components/Core/AbstractFilterComponent';
import * as asyncActions from 'actions/AsyncActionCreator';


class TeacherFilterContainer extends AbstractFilter {
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
    if (event.target.value.trim() === '') {
      this.props.dispatch({type: asyncActions.CLEAR_SUGGESTION});
      return;
    }

    this.props.dispatch(
      TeacherActions.loadSuggestionsTeacher(
        this.searchQuery(event.target.value.trim(), this.props.filters)
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
    this.props.dispatch({type: asyncActions.CLEAR_SUGGESTION});
    this.context.router.history.push('/teacher/' + id);
  }

  render() {
    const {
      handleSubmit, categories, suggestions, showSuggestion, loadingSuggestion, filters, listSpecializes
    } = this.props;
    const { selectedCategories, selectedSpecializes } = filters;

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className='inline-form' multiple={true}>
            <div className={styles.filterActionBlock + ' col-md-12 col-sm-12'}>
              <div className="row full-height">
                <SuggestionBox {...{
                  selectedCategories, selectedSpecializes, suggestions,
                  filters, showSuggestion, loadingSuggestion,
                  doRemoveFilter: this.doRemoveFilter.bind(this),
                  handleAddCriteria: this.handleAddCriteria.bind(this),
                  loadSuggestionsTeacher: this.loadSuggestionsTeacher.bind(this)
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


TeacherFilterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired, router: React.PropTypes.object
};

const mapStateToProps = (state) => {
  const { filters, showSuggestion, loadingSuggestion } = state.Teachers
  const categories = state.referenceData.courseCategories || []
  const suggestions = state.Teachers.suggestions.map((s) => {
    return {
      avatar: s.avatar || null,
      id: s.id,
      title: s.title || '',
      sub_title: s.user ? s.user.name : ''
    }
  })

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
})(cssModules(TeacherFilterContainer, styles)));
