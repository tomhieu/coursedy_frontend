import React, {Component} from 'react';
import styles from './Course.module.scss';
import cssModules from 'react-css-modules';
import AdvanceFilterComponent from "./CourseFilter/AdvanceFilterComponent";
import BasicFilterComponent from "./CourseFilter/BasicFilterComponent";
import Select2 from "react-select2-wrapper";
import FlatButton from "../Core/FlatButton/FlatButton";


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
      onSelectFilter,
      closeSuggestion
    } = this.props;

    const {selectedWeekDays, selectedCategories, selectedLocations, selectedSpecializes} = filters;

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
      <form onSubmit={handleSubmit(this.props.onSubmit)} className='course-filter-form inline-form' multiple={true}>
        <div className="d-flex flex-vertical">
          <div className={"d-flex flex-auto " + styles.filterActionBlock}>
            <div className="d-flex flex-wrap flex-auto">
              <div className={"d-flex flex-nowrap " + styles.filterTextContainer}>
                <BasicFilterComponent selectedWeekDays={selectedWeekDays}
                                      selectedSpecializes={selectedSpecializes}
                                      selectedCategories={selectedCategories}
                                      selectedLocations={selectedLocations}
                                      loadSuggestions={loadSuggestions}
                                      loadingSuggestion={loadingSuggestion}
                                      showSuggestion={showSuggestion}
                                      formfieldValues={formfieldValues}
                                      onRemoveFilter={onRemoveFilter}
                                      onSelectSuggestion={onSelectSuggestion}
                                      suggestions={suggestions}
                                      closeSuggestion={closeSuggestion}>
                </BasicFilterComponent>
              </div>
              <div className="seperate-filter-line"></div>
              <div className="st-border-left advanced-filter-block">
                <div className="d-flex flex-auto flex-horizontal align-items-center flex-nowrap ml-15">
                  <AdvanceFilterComponent categories={categories}
                                          selectedWeekDays={selectedWeekDays}
                                          selectedCategories={selectedCategories}
                                          listSpecializes={listSpecializes}
                                          selectedSpecializes={selectedSpecializes}
                                          onSelectFilter={onSelectFilter}>
                  </AdvanceFilterComponent>
                </div>
              </div>
              <div className="st-border-left advanced-filter-btn">
                <a className="navbar-toggler" data-toggle="collapse"
                   data-target="#advanceFilterCollapse" aria-controls="advanceFilterCollapse"
                   aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon">{this.context.t('filter_more')}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="optimize-filters flex-auto align-items-center">
            <div className="collapse navbar-collapse justify-content-right" id="advanceFilterCollapse">
              <AdvanceFilterComponent categories={categories}
                                      selectedWeekDays={selectedWeekDays}
                                      selectedCategories={selectedCategories}
                                      listSpecializes={listSpecializes}
                                      selectedSpecializes={selectedSpecializes}
                                      onSelectFilter={onSelectFilter}>
              </AdvanceFilterComponent>
            </div>
          </div>

          {/* Result Block */}
          <div className={"d-flex flex-auto " + styles.filterResultBlock}>
            <div className="d-flex flex-horizontal justify-content-end">
              <div className={styles.orderDisplayResult + " d-flex flex-horizontal align-items-center justify-content-end"}>
                <div className={styles.totalCoursesBox}>
                    <span className={styles.textTotalResult + " d-flex justify-content-end"}>
                      {this.context.t("total_result", {total: totalResult !== undefined ? totalResult : 0})}
                    </span>
                </div>
                <div className={styles.orderBtn}>
                  <Select2 onSelect={(e) => reloadCourseList(e)} data={orderList}></Select2>
                </div>
                <div className={styles.displayModeBtn}>
                  <div className="d-flex flex-horizontal">
                    <FlatButton secondary={true}
                                 onClick={changeDisplayModeHdl.bind(this, "grid")} >
                      <svg viewBox="0 0 24 24" className="material-icon primary" width={24} height={24}>
                        <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path>
                      </svg>
                    </FlatButton>

                    <FlatButton secondary={true}
                                 onClick={changeDisplayModeHdl.bind(this, "list")}>
                      <svg viewBox="0 0 24 24" className="material-icon primary" width={24} height={24}>
                        <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path>
                      </svg>
                    </FlatButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
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
  closeSuggestion: React.PropTypes.func
};

export default cssModules(CourseFilter, styles);
