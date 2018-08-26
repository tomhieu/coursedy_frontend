import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import cssModules from 'react-css-modules';
import styles from './SearchForm.module.scss';
import AutoComplete from '../AutoComplete/AutoComplete';
import PrimaryButton from '../Core/PrimaryButton/PrimaryButton';

class SearchForm extends Component {
  render() {
    const {
      suggestions, onSelectSuggestion, loadSuggestions, showSuggestion, loadingSuggestion, closeSuggestion, handleSubmit
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.props.onSubmit)} id="search_form" method="post">
        <div className={`${styles.searchCourseHomePage} d-flex align-items-center flex-row`}>
          <AutoComplete
            placeholder={this.context.t('search_course')}
            fieldName="key_word"
            fieldId="key_word_filter"
            dataSource={suggestions}
            handleAddCriteria={onSelectSuggestion}
            loadSuggestions={loadSuggestions}
            show={showSuggestion}
            isLoading={loadingSuggestion}
            closeSuggestion={closeSuggestion}
            {...this.props}
          />
          <div className={styles.searchButton}>
            <PrimaryButton
              type="submit"
              title={this.context.t('home_search')}
              round
              customClasses="full-width"
              line={false}
            />
          </div>
        </div>
      </Form>
    );
  }
}

SearchForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SearchForm.propTypes = {
  suggestions: React.PropTypes.array,
  onSelectSuggestion: React.PropTypes.func,
  loadSuggestions: React.PropTypes.func,
  showSuggestion: React.PropTypes.bool,
  loadingSuggestion: React.PropTypes.bool,
  closeSuggestion: React.PropTypes.func
};

export default cssModules(SearchForm, styles);
