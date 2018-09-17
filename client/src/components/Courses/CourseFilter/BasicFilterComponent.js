import * as React from 'react';
import { Component } from 'react';
import cssModules from 'react-css-modules';
import * as ReactDOM from 'react-dom';
import AutoComplete from '../../AutoComplete/AutoComplete';
import styles from './CourseFilter.module.scss';
import Chip from '../../Core/Chip/Chip';

class BasicFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isCollapsed: true, isFocus: false };
    this.filters = [];
    this.hiddenFilters = [];
    this.hasUpdateFilter = false;
  }

  onBlurSuggestion() {
    this.setState({ isCollapsed: true, isFocus: false });
  }

  onFocusSuggestion() {
    this.setState({ isFocus: true, isCollapsed: false });
  }

  updateDimensions() {
    this.hiddenFilters = [];
    let chipListWidth = 0;
    const containerWidth = this.filterContainer !== null ? this.filterContainer.getBoundingClientRect().width : 0;

    Object.keys(this.refs).map((key) => {
      const filterDOM = ReactDOM.findDOMNode(this.refs[key]);
      if (filterDOM !== null) {
        chipListWidth += filterDOM.getBoundingClientRect().width;
      }
      if (chipListWidth > containerWidth) {
        this.hiddenFilters.push(key);
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    const hasChangeWeekDay = nextProps.selectedWeekDays
      ? nextProps.selectedWeekDays.length != this.props.selectedWeekDays.length : false;
    const hasChangeLocation = nextProps.selectedLocations
      ? nextProps.selectedLocations.length != this.props.selectedLocations.length : false;
    const hasChangeCategory = nextProps.selectedCategories
      ? nextProps.selectedCategories.length != this.props.selectedCategories.length : false;
    const hasChangeSpecialize = nextProps.selectedSpecializes
      ? nextProps.selectedSpecializes.length != this.props.selectedSpecializes.length : false;
    const hasChangeMinfee = nextProps.formfieldValues.selectedMinFee
      ? nextProps.formfieldValues.selectedMinFee != this.props.selectedSpecializes.length : false;
    const hasChangeMaxfee = nextProps.formfieldValues.selectedMaxFee
      ? nextProps.formfieldValues.selectedMaxFee != this.props.formfieldValues.selectedMaxFee : false;

    this.hasUpdateFilter = hasChangeWeekDay
                          || hasChangeLocation
                          || hasChangeCategory
                        || hasChangeSpecialize
                            || hasChangeMinfee
                            || hasChangeMaxfee;
  }

  componentDidUpdate() {
    if (this.hasUpdateFilter) {
      this.updateDimensions();
    }
  }

  render() {
    const {
      selectedWeekDays, selectedCategories, onRemoveFilter, selectedLocations, formfieldValues, selectedSpecializes,
      suggestions, onSelectSuggestion, loadSuggestions,
      showSuggestion, loadingSuggestion, closeSuggestion, term, placeholder
    } = this.props;
    const isOverFlow = this.hiddenFilters.length > 0;
    this.filters = [];
    let filterListClassNames = 'd-flex flex-horizontal basic-filter-container ';
    let containerClassNames = ' d-flex flex-horizontal justify-content-start align-items-center ';

    if (this.state.isFocus) {
      filterListClassNames += 'is-focused';
      containerClassNames += 'flex-wrap';
    } else {
      filterListClassNames += 'is-collapsed';
      containerClassNames += 'flex-nowrap full-height';
    }
    return (
      <div className={styles.filterInputBox + containerClassNames}>
        <div className="search-icon">
          <svg className="searchIcon" viewBox="0 0 25 25">
            <path d="M17.8724934,19.3481945 C17.4662,18.9419012 17.4643401,18.2850294 17.8746847,17.8746847 L17.8746847,17.8746847 C18.2821883,17.4671811 18.9468084,17.4711073 19.3481945,17.8724934 L23.7796805,22.3039794 C24.1859739,22.7102728 24.1878338,23.3671445 23.7774892,23.7774892 L23.7774892,23.7774892 C23.3699856,24.1849928 22.7053655,24.1810666 22.3039794,23.7796805 L17.8724934,19.3481945 L17.8724934,19.3481945 Z" />
            <path d="M19.7391304,9.86956522 C19.7391304,4.41875486 15.3203756,0 9.86956522,0 C4.41875486,0 0,4.41875486 0,9.86956522 C0,15.3203756 4.41875486,19.7391304 9.86956522,19.7391304 C15.3203756,19.7391304 19.7391304,15.3203756 19.7391304,9.86956522 Z M2,9.86956522 C2,5.52332436 5.52332436,2 9.86956522,2 C14.2158061,2 17.7391304,5.52332436 17.7391304,9.86956522 C17.7391304,14.2158061 14.2158061,17.7391304 9.86956522,17.7391304 C5.52332436,17.7391304 2,14.2158061 2,9.86956522 Z" />
          </svg>
        </div>
        <div ref={(el) => { this.filterContainer = el; }} id="chipContainer" className={filterListClassNames}>
          {
            selectedWeekDays
              ? selectedWeekDays.map(f => (
                <Chip
                  key={`filter_days_${f.id}`}
                  id={`filter_days_${f.id}`}
                  ref={`filter_days_${f.id}`}
                  onRequestDelete={() => onRemoveFilter(f.id, 'selectedWeekDays')}
                  show={this.hiddenFilters.indexOf(`filter_days_${f.id}`) < 0}
                  label={f.name}
                />
              )) : null
          }
          {
            selectedCategories.map(sc => (
              <Chip
                key={`filter_categories_${sc.id}`}
                ref={`filter_categories_${sc.id}`}
                onRequestDelete={() => onRemoveFilter(sc.id, 'selectedCategories')}
                show={this.hiddenFilters.indexOf(`filter_categories_${sc.id}`) < 0}
                label={sc.name}
              />
            ))
          }
          {
            selectedLocations
              ? selectedLocations.map(f => (
                <Chip
                  key={`filter_locs_${f.id}`}
                  ref={`filter_locs_${f.id}`}
                  onRequestDelete={() => onRemoveFilter(f.id, 'selectedLocations')}
                  show={this.hiddenFilters.indexOf(`filter_locs_${f.id}`) < 0}
                  label={f.name}
                />
              )) : null
          }
          {
            formfieldValues.selectedMinFee
              ? (
                <Chip
                  key="filter_max_fee"
                  ref="filter_max_fee"
                  onRequestDelete={() => onRemoveFilter(null, 'resetMinFee')}
                  show={this.hiddenFilters.indexOf('filter_max_fee') < 0}
                  label={this.context.t('min_fee_chip', { min_fee: formfieldValues.selectedMinFee })}
                />
              ) : null
          }
          {
            formfieldValues.selectedMaxFee
              ? (
                <Chip
                  key="filter_min_fee"
                  ref="filter_min_fee"
                  onRequestDelete={() => onRemoveFilter(null, 'resetMaxFee')}
                  show={this.hiddenFilters.indexOf('filter_min_fee') < 0}
                  label={this.context.t('max_fee_chip', { max_fee: formfieldValues.selectedMaxFee })}
                />
              ) : null
          }
          {
            selectedSpecializes.map(sl => (
              <Chip
                key={`filter_levels_${sl.id}`}
                ref={`filter_levels_${sl.id}`}
                show={this.hiddenFilters.indexOf(`filter_levels_${sl.id}`) < 0}
                onRequestDelete={() => onRemoveFilter(sl.id, 'selectedSpecializes')}
                label={sl.name}
              />
            ))
          }
          {
            term
              ? (
                <Chip
                  key={`filter_by_term_${term}`}
                  ref={`filter_by_term_${term}`}
                  show={this.hiddenFilters.indexOf(`filter_levels_${term}`) < 0}
                  onRequestDelete={() => onRemoveFilter(term, 'term')}
                  label={term}
                />
              ) : null
          }
          {
            this.state.isFocus
              ? (
                <AutoComplete
                  placeholder={placeholder}
                  fieldName="key_word"
                  fieldId="key_word_filter"
                  dataSource={suggestions}
                  handleAddCriteria={onSelectSuggestion}
                  loadSuggestions={loadSuggestions}
                  show={showSuggestion}
                  isLoading={loadingSuggestion}
                  onFocus={this.onFocusSuggestion.bind(this)}
                  onBlur={this.onBlurSuggestion.bind(this)}
                />
              ) : null
          }
        </div>
        <div className="filter-selection d-flex flex-auto">
          {
            isOverFlow && !this.state.isFocus ? <a onClick={this.onFocusSuggestion.bind(this)}>{`${this.hiddenFilters.length} filters`}</a> : !this.state.isFocus
              ? (
                <AutoComplete
                  placeholder={placeholder}
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
              ) : null
          }
        </div>
      </div>
    );
  }
}

BasicFilterComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
};


BasicFilterComponent.propTypes = {
  selectedWeekDays: React.PropTypes.array,
  selectedCategories: React.PropTypes.array,
  onRemoveFilter: React.PropTypes.func,
  selectedLocations: React.PropTypes.array,
  formfieldValues: React.PropTypes.object,
  selectedSpecializes: React.PropTypes.array,
  suggestions: React.PropTypes.array,
  onSelectSuggestion: React.PropTypes.func,
  loadSuggestions: React.PropTypes.func,
  showSuggestion: React.PropTypes.bool,
  loadingSuggestion: React.PropTypes.bool,
  closeSuggestion: React.PropTypes.func,
  term: React.PropTypes.string,
  search: React.PropTypes.func.isRequired
};

export default cssModules(BasicFilterComponent, styles);
