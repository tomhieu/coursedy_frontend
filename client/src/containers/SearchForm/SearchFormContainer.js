import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { TT } from 'utils/locale';
import { reduxForm } from 'redux-form';
import Network from 'utils/network';
import { SearchForm } from '../../components/index';
import styles from './SearchFormContainer.module.scss';
import * as WebConstants from '../../constants/WebConstants';
import { FETCH_COURSES } from '../../constants/Courses';
import { CLOSE_COURSE_FILTER_SUGGESTION, LOAD_SUGGESTION } from '../../actions/AsyncActionCreator';
import * as CourseFilterActions from '../../actions/CourseFilterActionCreator';

class SearchFormContainer extends Component {
  componentWillMount() {
    this.props.showDarkHeader();
  }

  componentWillUnmount() {
    this.props.showWhiteHeader();
  }

  fetchSearchSuggestion(event) {
    if (event.target.value === '') {
      this.props.closeSuggestion();
      return;
    }

    this.props.loadAutoSuggestions(event.target.value);
  }

  onSelectSuggestion(id) {
    this.props.closeSuggestion();
    this.context.router.history.push(`/courses/${id}`);
  }

  onSearchMoreCourse(searchForm) {
    this.props.closeSuggestion();
    this.props.updateFilter({ term: searchForm.key_word });
    setTimeout(() => {
      this.context.router.history.push(`/courses?q=${searchForm.key_word}`);
    }, 200);
  }

  render() {
    const {
      suggestions, showSuggestion, loadingSuggestion, searchCourseSuggestion, loadSuggestions
    } = this.props;
    return (
      <section className="header-homepage d-flex align-items-center">
        <div className="container">
          <div className="row header-margin">
            <div className="col-sm-12">
              <h1 className="hero-title">{this.context.t('product_title')}</h1>
              <p className="hero-tag">{this.context.t('product_tag')}</p>
            </div>
            <div className="col-sm-12">
              <SearchForm
                suggestions={suggestions}
                onSelectSuggestion={this.onSelectSuggestion.bind(this)}
                showSuggestion={showSuggestion}
                loadingSuggestion={loadingSuggestion}
                loadSuggestions={this.fetchSearchSuggestion.bind(this)}
                onSubmit={this.onSearchMoreCourse.bind(this)}
                {...this.props}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

SearchFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

SearchFormContainer.propTypes = {};

const mapStateToProps = (state) => {
  const { CourseFilter } = state;
  const { lang } = state.i18nState;
  const {
    sugestions, showSuggestion, loadingSuggestion, filters
  } = CourseFilter;
  return {
    showSuggestion,
    suggestions: sugestions.map(sug => ({
      id: sug.id,
      avatar: sug.cover_image,
      title: sug.title,
      sub_title: TT.changeLocale(lang).t('teacher_info_suggestion', { teacher: sug.user.name })
    })),
    loadingSuggestion
  };
};

const mapDispatchToProps = dispatch => ({
  showDarkHeader: () => dispatch({ type: WebConstants.SHOW_DARK_HEADER }),
  showWhiteHeader: () => dispatch({ type: WebConstants.SHOW_WHITE_HEADER }),
  updateFilter: filters => dispatch(CourseFilterActions.updateFilter(filters)),
  loadAutoSuggestions: query => dispatch({
    type: LOAD_SUGGESTION,
    payload: Network().get('courses/search', query),
    meta: 'courseSuggestionPlaceholder'
  }),
  closeSuggestion: () => dispatch({ type: CLOSE_COURSE_FILTER_SUGGESTION })
});


const StyledComponent = cssModules(SearchFormContainer, styles);

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'generalSearchForm',
  fields: ['key_word']
})(StyledComponent));
