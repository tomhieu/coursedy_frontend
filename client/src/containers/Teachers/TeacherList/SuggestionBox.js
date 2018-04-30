import React from 'react';
import AutoComplete from '../../../components/AutoComplete/AutoComplete';
import { mStyles } from 'utils/CustomStylesUtil';
import styles from '../../../../styles/components/CommonFilterObjects.module.scss';
import Chip from "../../../components/Core/Chip/Chip";

const SuggestionBox = (
  {
    selectedCategories, selectedSpecializes, suggestions,
    filters, showSuggestion, loadingSuggestion,
    doRemoveFilter, handleAddCriteria, loadSuggestionsTeacher, renderSuggestion,
  }, context) => {
  return (
    <div className="col-md-9 col-sm-9">
      <div className={styles.filterInputBox + ' d-flex flex-vertical justify-content-center full-height'}>
        <div className="d-flex flex-horizontal">
          {
            selectedCategories.map((sc) =>
              <Chip
                key={'filter_categories_' + sc.id}
                onRequestDelete={() => doRemoveFilter(sc.id, 'selectedCategories')}
                style={mStyles.chip}
                labelStyle={mStyles.chipLabelStyle}
                deleteIconStyle={mStyles.chipIconDelete}>
                {sc.name}
              </Chip>)
          }
          {
            selectedSpecializes.map((sl) =>
              <Chip
                key={'filter_levels_' + sl.id}
                onRequestDelete={() => doRemoveFilter(sl.id, 'selectedSpecializes')}
                style={mStyles.chip}
                labelStyle={mStyles.chipLabelStyle}
                deleteIconStyle={mStyles.chipIconDelete}>
                {sl.name}
              </Chip>)
          }
        </div>
        <AutoComplete
          placeholder={context.t('search_teachers_keyword')}
          fieldName="key_word" fieldId="key_word_filter"
          dataSource={suggestions}
          handleAddCriteria={handleAddCriteria}
          loadSuggestions={loadSuggestionsTeacher}
          filters={filters}
          show={showSuggestion}
          isLoading={loadingSuggestion}
        />
      </div>
    </div>
  )
}

SuggestionBox.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default SuggestionBox;
