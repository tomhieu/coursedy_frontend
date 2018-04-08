import React, {Component} from 'react';
import styles from './Course.module.scss';
import FormField from "../Core/FormField";
import {DAYS_IN_WEEK} from "../../actions/CourseFormActionCreator"
import {FilterOption} from "../FilterOption/FilterOption"
import {EFlatButton} from "../Core/CustomComponents";
import {ActionViewList, ActionViewModule} from "material-ui/svg-icons/index";
import {mStyles} from "utils/CustomStylesUtil";
import AutoComplete from "../AutoComplete/AutoComplete";
import {PublicCourseListFollowModalContainer} from '../../containers/index'
import {Chip} from "material-ui";
import cssModules from 'react-css-modules';
import { FieldArray } from 'redux-form'


class CourseFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAdFilter: false
    }
  }

  render() {
    let {
      handleSubmit,
      categories,
      locations,
      totalResult,
      changeDisplayModeHdl,
      suggestions,
      loadSuggestions,
      onSelectSuggestion,
      onRemoveFilter,
      filters,
      showSuggestion,
      loadingSuggestion,
      formfieldValues,
      listSpecializes,
      reloadCourseList,
    } = this.props

    const {selectedWeekDays, selectedCategories, selectedLocations, selectedSpecializes} = filters

    const orderList = [{id: 1, text: this.context.t("order_by_time")}, {
      id: 2,
      text: this.context.t("order_by_view")
    }, {id: 3, text: this.context.t("order_by_register")}];

    const internalStyles = {
      checkbox: {
        marginRight: 0,
      },
      defaultColorStyle: {
        color: "#e27d7f"
      },
      defaultBackgroundColorStyle: {
        backgroundColor: "#e27d7f"
      }
    };
    return (
      <div className="d-flex flex-g1">
        <div className="d-flex flex-g1">
          <form onSubmit={handleSubmit(this.props.onSubmit)} className='flex-g1 course-filter-form inline-form flex-vertical' multiple={true}>
            <div className={styles.filterActionBlock}>
              <div className="d-flex flex-wrap full-height">
                <div className={"d-flex flex-nowrap full-height " + styles.filterTextContainer}>
                  <div className={styles.filterInputBox + " d-flex flex-nowrap flex-vertical justify-content-center full-height"}>
                    <div className="d-flex flex-horizontal">
                      {
                        selectedWeekDays.map((f) =>
                          <Chip key={"filter_days_" + f.id}
                                onRequestDelete={() => onRemoveFilter(f.id, 'selectedWeekDays')}
                                style={mStyles.chip}
                                labelStyle={mStyles.chipLabelStyle}
                                deleteIconStyle={mStyles.chipIconDelete}
                          >{f.name}</Chip>
                        )
                      }
                      {
                        selectedCategories.map((sc) =>
                          <Chip key={"filter_categories_" + sc.id}
                                onRequestDelete={() => onRemoveFilter(sc.id, 'selectedCategories')}
                                style={mStyles.chip}
                                labelStyle={mStyles.chipLabelStyle}
                                deleteIconStyle={mStyles.chipIconDelete}
                          >{sc.name}</Chip>
                        )
                      }
                      {
                        selectedLocations.map((f) =>
                          <Chip key={"filter_locs_" + f.id}
                                onRequestDelete={() => onRemoveFilter(f.id, 'selectedLocations')}
                                style={mStyles.chip}
                                labelStyle={mStyles.chipLabelStyle}
                                deleteIconStyle={mStyles.chipIconDelete}
                          >{f.name}</Chip>
                        )
                      }
                      {
                        formfieldValues.selectedMinFee ?
                        <Chip key="filter_max_fee"
                              onRequestDelete={() => onRemoveFilter(null, 'resetMinFee')}
                              style={mStyles.chip}
                              labelStyle={mStyles.chipLabelStyle}
                              deleteIconStyle={mStyles.chipIconDelete}
                        >{this.context.t('min_fee_chip', {min_fee: formfieldValues.selectedMinFee})}</Chip> : null
                      }
                      {
                        formfieldValues.selectedMaxFee ?
                        <Chip key="filter_min_fee"
                              onRequestDelete={() => onRemoveFilter(null, 'resetMaxFee')}
                              style={mStyles.chip}
                              labelStyle={mStyles.chipLabelStyle}
                              deleteIconStyle={mStyles.chipIconDelete}
                        >{this.context.t('max_fee_chip', {max_fee: formfieldValues.selectedMaxFee})}</Chip> : null
                      }
                      {
                        selectedSpecializes.map((sl) =>
                          <Chip key={"filter_levels_" + sl.id}
                                onRequestDelete={() => onRemoveFilter(sl.id, 'selectedSpecializes')}
                                style={mStyles.chip}
                                labelStyle={mStyles.chipLabelStyle}
                                deleteIconStyle={mStyles.chipIconDelete}
                          >{sl.name}</Chip>
                        )
                      }
                    </div>
                    <AutoComplete placeholder={this.context.t('search_course')}
                                  fieldName="key_word" fieldId="key_word_filter"
                                  dataSource={suggestions}
                                  handleAddCriteria={onSelectSuggestion}
                                  loadSuggestions={loadSuggestions}
                                  filters={filters}
                                  show={showSuggestion}
                                  isLoading={loadingSuggestion}
                    />
                  </div>
                </div>
                <div className={"full-height st-border-left " + styles.advancedFilter}>
                  <div className="d-flex flex-horizontal align-items-center flex-nowrap ml-15 mt-20">
                    <div className={styles.filterOptionContainer}>
                      <FilterOption label={this.context.t('day_of_week')}
                                    options={DAYS_IN_WEEK.map((e) => {
                                      return {id: e.id, name: e.text}
                                    })}
                                    selectedOptions={selectedWeekDays}
                                    onSelectFilter={this.props.onSelectFilter}
                                    type="single-select"
                                    name="selectedWeekDays">
                      </FilterOption>
                    </div>
                    <div className={styles.filterOptionContainer}>
                      <FilterOption label={this.context.t('course_category_title')}
                                    options={categories.map((x) => {
                                      return {name: x.name, id: x.id}
                                    })}
                                    selectedOptions={selectedCategories}
                                    onSelectFilter={this.props.onSelectFilter}
                                    type="multi-select"
                                    name="selectedCategories">
                      </FilterOption>
                    </div>
                    <div className={styles.filterOptionContainer}>
                      <FilterOption label={this.context.t('location')}
                                    options={locations.map((x) => {
                                      return {name: x.name, id: x.id}
                                    })}
                                    selectedOptions={selectedLocations}
                                    onSelectFilter={this.props.onSelectFilter}
                                    type="single-select"
                                    name="selectedLocations">
                      </FilterOption>
                    </div>
                    <div className={styles.filterOptionContainer}>
                      <FilterOption label={this.context.t('tuition_fee_filter')} onSelectFilter={this.props.onSelectFilter} name="tuition_fee">
                        <div className="d-flex flex-horizontal">
                          <div className="select-course-fee">
                            <div className="d-flex flex-horizontal">
                              <FormField className="md-number-field" fieldId="filter_min_fees" showLabel={false} placeholder={this.context.t('min_fee_placeholder')}
                                         onChange={(e) => this.props.onSelectFilter(e.target.value, 'resetMinFee')}
                                         formControlName="selectedMinFee" typeField="custom_input">
                              </FormField>
                              <span className="ml-10 mr-10 mt-5">{this.context.t('to')}</span>
                              <FormField className="md-number-field" fieldId="filter_max_fees" showLabel={false} placeholder={this.context.t('max_fee_placeholder')}
                                         onChange={(e) => this.props.onSelectFilter(e.target.value, 'resetMaxFee')} formControlName="selectedMaxFee" typeField="custom_input">
                              </FormField>
                            </div>
                          </div>
                        </div>
                      </FilterOption>
                    </div>
                    <div className={styles.filterOptionContainer}>
                      <FilterOption label={this.context.t('level')} onSelectFilter={this.props.onSelectFilter}
                                    options={listSpecializes} isGroupOption={true}
                                    selectedOptions={selectedSpecializes}
                                    type="group-select"
                                    name="selectedSpecializes">
                      </FilterOption>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Block */}
            <div className={styles.filterResultBlock}>
              <div className="d-flex flex-horizontal justify-content-end">
                <div className={styles.orderDisplayResult + " d-flex flex-horizontal align-items-center justify-content-end"}>
                  <div className={styles.totalCoursesBox}>
                    <span className={styles.textTotalResult + " d-flex justify-content-end"}>
                      {this.context.t("total_result", {total: totalResult !== undefined ? totalResult : 0})}
                    </span>
                  </div>
                  <div className={styles.orderBtn}>
                    <FormField fieldId="order_by_id" showLabel={false} fieldLabel={this.context.t("order_list")}
                               options={orderList} formControlName="order_by"
                               onChange={reloadCourseList}
                               typeField="custom_select">
                    </FormField>
                  </div>
                  <div className={styles.displayModeBtn}>
                    <div className="d-flex flex-horizontal">
                      <EFlatButton secondary={true}
                                   onClick={changeDisplayModeHdl.bind(this, "grid")}
                                   icon={<ActionViewModule style={internalStyles.defaultColorStyle}/>}/>
                      <EFlatButton secondary={true}
                                   onClick={changeDisplayModeHdl.bind(this, "list")}
                                   icon={<ActionViewList style={internalStyles.defaultColorStyle}/>}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

CourseFilter.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFilter.propTypes = {
  categories: React.PropTypes.array.isRequired,
  locations: React.PropTypes.array.isRequired,
  onSelectFilter: React.PropTypes.func.isRequired,
  suggestions: React.PropTypes.array.isRequired,
  loadSuggestions: React.PropTypes.func.isRequired,
  onRemoveFilter: React.PropTypes.func.isRequired,
  filters: React.PropTypes.object.isRequired,
  onSelectSuggestion: React.PropTypes.func.isRequired,
  showSuggestion: React.PropTypes.bool.isRequired,
  reloadCourseList: React.PropTypes.func,
};

export default cssModules(CourseFilter, styles);
