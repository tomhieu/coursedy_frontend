import * as React from "react";
import {Component} from "react";
import {Chip} from "material-ui";
import {mStyles} from "utils/CustomStylesUtil";
import AutoComplete from "../../AutoComplete/AutoComplete";
import cssModules from 'react-css-modules';
import styles from './CourseFilter.module.scss';

class BasicFilterComponent extends Component {
  render() {
    const {selectedWeekDays, selectedCategories, onRemoveFilter, selectedLocations, formfieldValues, selectedSpecializes,
      suggestions, onSelectSuggestion, loadSuggestions, showSuggestion, loadingSuggestion} = this.props;
    return (
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
                      show={showSuggestion}
                      isLoading={loadingSuggestion}
        />
      </div>
    )
  }
}

BasicFilterComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
}


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
};

export default cssModules(BasicFilterComponent, styles);