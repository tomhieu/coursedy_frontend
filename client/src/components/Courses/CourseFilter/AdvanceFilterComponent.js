import { Component } from 'react';
import * as React from 'react';
import cssModules from 'react-css-modules';
import { FilterOption } from '../../FilterOption/FilterOption';
import FormField from '../../Core/FormField';
import styles from './CourseFilter.module.scss';
import { DAYS_IN_WEEK } from '../../../actions/CourseFormActionCreator';

class AdvanceFilterComponent extends Component {
  render() {
    const {
      selectedWeekDays, categories, selectedCategories, listSpecializes,
      selectedSpecializes, onSelectFilter, courseFilterMode
    } = this.props;
    return (
      <div className="d-flex flex-g1">
        {
          selectedWeekDays
            ? (
              <div className="flex-col-3">
                <FilterOption
                  label={this.context.t('day_of_week')}
                  options={DAYS_IN_WEEK(this.props.lang).map((e) => {
                    return { id: e.id, name: e.text };
                  })}
                  selectedOptions={selectedWeekDays}
                  onSelectFilter={onSelectFilter}
                  isFirst
                  type="single-select"
                  name="selectedWeekDays"
                />
              </div>
            ) : null
        }
        {
          selectedCategories
            ? (
              <div className="flex-col-3">
                <FilterOption
                  label={this.context.t('course_category_title')}
                  options={categories.map((x) => {
                    return { name: x.name, id: x.id };
                  })}
                  selectedOptions={selectedCategories}
                  onSelectFilter={onSelectFilter}
                  type="multi-select"
                  name="selectedCategories"
                />
              </div>
            ) : null
        }
        {
          courseFilterMode
            ? (
              <div className="flex-col-3">
                <FilterOption label={this.context.t('tuition_fee_filter')} onSelectFilter={onSelectFilter} name="tuition_fee">
                  <div className="d-flex flex-horizontal">
                    <div className="select-course-fee">
                      <div className="d-flex flex-horizontal">
                        <FormField
                          className="md-number-field price-field"
                          fieldId="filter_min_fees"
                          showLabel={false}
                          placeholder={this.context.t('min_fee_placeholder')}
                          onChange={e => onSelectFilter(e.target.value, 'resetMinFee')}
                          formControlName="selectedMinFee"
                          type="number"
                          typeField="custom_input"
                        />
                        <span className="ml-10 mr-10 mt-5">{this.context.t('to')}</span>
                        <FormField
                          className="md-number-field price-field"
                          fieldId="filter_max_fees"
                          showLabel={false}
                          placeholder={this.context.t('max_fee_placeholder')}
                          onChange={e => onSelectFilter(e.target.value, 'resetMaxFee')}
                          formControlName="selectedMaxFee"
                          type="number"
                          typeField="custom_input"
                        />
                      </div>
                    </div>
                  </div>
                </FilterOption>
              </div>
            ) : null
        }
        <div className="flex-col-3">
          <FilterOption
            label={this.context.t('level')}
            onSelectFilter={onSelectFilter}
            options={listSpecializes}
            isGroupOption
            selectedOptions={selectedSpecializes}
            type="group-select"
            name="selectedSpecializes"
          />
        </div>
      </div>
    );
  }
}


AdvanceFilterComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
};


AdvanceFilterComponent.propTypes = {
  selectedWeekDays: React.PropTypes.array,
  categories: React.PropTypes.array,
  selectedCategories: React.PropTypes.array,
  listSpecializes: React.PropTypes.array,
  selectedSpecializes: React.PropTypes.array,
  onSelectFilter: React.PropTypes.func,
  courseFilterMode: React.PropTypes.bool
};

export default cssModules(AdvanceFilterComponent, styles);
