import React from 'react';
import styles from '../../../styles/components/CommonFilterObjects.module.scss';
import { FilterOption } from '../../components/FilterOption/FilterOption';

const SelectFilterTeachers = (
  {
    categories, selectedCategories, selectedSpecializes,
    listSpecializes, doSelectFilter,
  }, context) => {
  return (
    <div className="col-md-3 col-sm-3 full-height st-border-left">
      <div
        className="d-flex flex-horizontal align-items-center flex-nowrap ml-15 mt-20">
        <div className={styles.filterOptionContainer}>
          <FilterOption
            label={context.t('course_category_title')}
            options={categories.map((x) => {
              return { name: x.name, id: x.id };
            })}
            selectedOptions={selectedCategories}
            onSelectFilter={doSelectFilter}
            type="multi-select"
            name="selectedCategories">
          </FilterOption>
        </div>
        <div className={styles.filterOptionContainer}>
          <FilterOption label={context.t('level')}
                        onSelectFilter={doSelectFilter}
                        options={listSpecializes}
                        isGroupOption={true}
                        selectedOptions={selectedSpecializes}
                        type="group-select"
                        name="selectedSpecializes">
          </FilterOption>
        </div>
      </div>
    </div>
  )
}

SelectFilterTeachers.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default SelectFilterTeachers;
