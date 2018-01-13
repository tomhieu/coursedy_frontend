import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import FormField from "../Core/FormField";
import {DAYS_IN_WEEK} from "../../actions/CourseFormActionCreator"
import {FilterOption} from "../FilterOption/FilterOption"
import {EFlatButton, RaiseButton} from "../Core/CustomComponents";
import {
  ActionFavorite,
  ActionViewList,
  ActionViewModule,
  NavigationExpandLess,
  NavigationExpandMore
} from "material-ui/svg-icons/index";
import {red900} from "material-ui/styles/colors";
import {mStyles} from "utils/CustomStylesUtil";
import AutoComplete from "../AutoComplete/AutoComplete";
import {Chip} from "material-ui";

class CourseFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openAdFilter: false
    }
  }

  toggleFilter() {
    this.setState(
      {openAdFilter: !this.state.openAdFilter}
    )
  }

  renderCourseLevels(selectedCategories) {
    return (
      <div className="checkbox-group">
      </div>
    )
  }

  autoCompleteSearchCourse(group, id, text) {
    const filter = {group, id, text};
    this.props.onSelectFilter(filter);
  }

  render() {
    let {
      handleSubmit,
      categories,
      locations,
      totalResult,
      changeDisplayModeHdl,
      groupSugestions,
      loadSuggestions,
      onRemoveFilter,
      filters,
      showSuggestion,
      loadingSuggestion
    } = this.props

    const {selectedWeekDays, selectedCategories, selectedLocations, tuition_fee, selectedLevels} = filters

    const orderList = [{id: 1, text: this.context.t("order_by_time")}, {
      id: 2,
      text: this.context.t("order_by_view")
    }, {id: 3, text: this.context.t("order_by_register")}];
    const displayModes = [{id: 1, text: this.context.t("display_mode_full")}, {
      id: 2,
      text: this.context.t("display_mode_compress")
    }];
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
      <div className="row">
        <div className="col-xs-12 col-sm-12">
          <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
            <div className={styles.filterActionBlock + " col-md-12 col-sm-12"}>
              <div className="row">
                <div className={"col-md-9 col-sm-9"}>
                  <div className="d-flex flex-horizontal">
                    {
                      selectedWeekDays.map((f) =>
                        <Chip key={"filter_days_" + f.id}
                              onRequestDelete={() => onRemoveFilter(f.id)}
                              style={mStyles.chip}
                              labelStyle={mStyles.chipLabelStyle}
                              deleteIconStyle={mStyles.chipIconDelete}
                        >{f.text}</Chip>
                      )
                    }
                    {
                      selectedLocations.map((f) =>
                        <Chip key={"filter_locs_" + f.id}
                              onRequestDelete={() => onRemoveFilter(f.id)}
                              style={mStyles.chip}
                              labelStyle={mStyles.chipLabelStyle}
                              deleteIconStyle={mStyles.chipIconDelete}
                        >{f.text}</Chip>
                      )
                    }
                    {
                      selectedLevels.map((f) =>
                        <Chip key={"filter_levels_" + f.id}
                              onRequestDelete={() => onRemoveFilter(f.id)}
                              style={mStyles.chip}
                              labelStyle={mStyles.chipLabelStyle}
                              deleteIconStyle={mStyles.chipIconDelete}
                        >{f.text}</Chip>
                      )
                    }
                  </div>
                  <AutoComplete placeholder={this.context.t('search_course')}
                                fieldName="key_word" fieldId="key_word_filter"
                                dataSource={groupSugestions}
                                handleAddCriteria={this.autoCompleteSearchCourse.bind(this)}
                                loadSuggestions={loadSuggestions}
                                filters={filters}
                                show={showSuggestion}
                                isLoading={loadingSuggestion}
                  />
                </div>

                {/* Area*/}
                <div className="col-md-2 col-sm-2">
                  <div className="d-flex flex-horizontal">
                    <RaiseButton label={this.context.t('filter')}/>
                    <EFlatButton label={this.context.t("filter_more")}
                                 onClick={this.toggleFilter.bind(this)}
                                 icon={this.state.openAdFilter ? <NavigationExpandLess style={mStyles.iconFlatBtn}/> :
                                   <NavigationExpandMore style={mStyles.iconFlatBtn}/>}/>
                  </div>
                </div>
              </div>
            </div>
            {/* Basic Filter Block */}
            <br/>

            <div className="col-md-12 col-sm-12">
              <div className="row ml-15">
                <div className="col-md-2 col-sm-2">
                  <FilterOption label={this.context.t('day_of_week')}
                                options={DAYS_IN_WEEK.map((e) => {
                                  return {id: e.id, text: e.text}
                                })}
                                selectedOptions={selectedWeekDays}
                                onSelectFilter={this.props.onSelectFilter}
                                type="single-select"
                                name="selectedWeekDays">
                  </FilterOption>
                </div>
                <div className="col-md-2 col-sm-2">
                  <FilterOption label={this.context.t('course_category_title')}
                                options={categories.map((x) => {
                                          return {text: x.name, id: x.id}
                                        })}
                                selectedOptions={selectedCategories}
                                onSelectFilter={this.props.onSelectFilter}
                                type="multi-select"
                                name="selectedCategories">
                  </FilterOption>
                </div>
                <div className="col-md-2 col-sm-2">
                  <FilterOption label={this.context.t('location')}
                                options={Object.keys(locations).map((x) => {
                                  return {text: locations[x], id: x}
                                })}
                                selectedOptions={selectedLocations}
                                onSelectFilter={this.props.onSelectFilter}
                                type="single-select"
                                name="selectedLocations">
                  </FilterOption>
                </div>
                <div className="col-md-2 col-sm-2">
                  <FilterOption label={this.context.t('tuition_fee_filter')} onSelectFilter={this.props.onSelectFilter} name="tuition_fee">
                    <div className="d-flex flex-horizontal pl-20">
                      <div className="select-course-fee">
                        <div className="d-flex flex-horizontal">
                          <FormField formGroupId="filter_min_fees" showLabel={false} placeholder={this.context.t('min_fee_placeholder')}
                                     formControlName={"min_fees"} typeField="custom_input">
                          </FormField>
                          <span className="ml-10 mr-10 mt-5">{this.context.t('to')}</span>
                          <FormField formGroupId="filter_max_fees" showLabel={false} placeholder={this.context.t('max_fee_placeholder')}
                                     formControlName={"max_fees"} typeField="custom_input">
                          </FormField>
                        </div>
                      </div>
                    </div>
                  </FilterOption>
                </div>
                <div className="col-md-2 col-sm-2">
                  <FilterOption label={this.context.t('level')} onSelectFilter={this.props.onSelectFilter}
                                options={selectedCategories} isGroupOption={true}
                                selectedOptions={selectedLevels}
                                type="group-select"
                                name="selectedLevels">
                  </FilterOption>
                </div>
              </div>
            </div>
            {/* Result Block */}
            <div className={'col-md-12 ' + styles.filterResultBlock}>
              <div className="d-flex flex-horizontal align-items-center">
                <div className={styles.listResultInfo + " d-flex flex-horizontal justify-content-left"}>
                  <div className={styles.checkAllBtn + " d-flex align-items-center"}>
                    <FormField formGroupId="select_all_id" showLabel={false} formControlName="select_all"
                               typeField="checkbox" iconStyle={mStyles.iconCheckBox}>
                    </FormField>
                  </div>
                  <EFlatButton label={this.context.t("save_favorite")} icon={<ActionFavorite color={red900}/>}/>
                  <span className={styles.textTotalResult}>
                                        {this.context.t("total_result", {total: totalResult != undefined ? totalResult : 0})}
                                    </span>
                </div>
                <div className={styles.orderDisplayResult + " d-flex flex-horizontal justify-content-end"}>
                  <div className={styles.orderBtn}>
                    <FormField formGroupId="order_by_id" showLabel={false} formLabel={this.context.t("order_list")}
                               options={orderList} formControlName="order_by"
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
  locations: React.PropTypes.object.isRequired,
  onSelectFilter: React.PropTypes.func.isRequired,
  groupSugestions: React.PropTypes.array.isRequired,
  loadSuggestions: React.PropTypes.func.isRequired,
  onRemoveFilter: React.PropTypes.func.isRequired,
  filters: React.PropTypes.object.isRequired
};

export default cssModules(CourseFilter, styles);
