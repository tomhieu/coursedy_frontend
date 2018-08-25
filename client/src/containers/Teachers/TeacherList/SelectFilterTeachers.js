import React from 'react';
import { FilterOption } from '../../../components/FilterOption/FilterOption';

const SelectFilterTeachers = (
  {
    categories, selectedCategories, selectedSpecializes,
    listSpecializes, doSelectFilter,
  }, context
) => {
  return (
    <div className="col-md-3 col-sm-3">
      <div
        className="d-flex flex-horizontal align-items-center flex-nowrap full-height"
      >
        <FilterOption
          label={context.t('course_category_title')}
          options={categories.map((x) => {
            return { name: x.name, id: x.id };
          })}
          selectedOptions={selectedCategories}
          onSelectFilter={doSelectFilter}
          type="multi-select"
          name="selectedCategories"
        />
        <FilterOption
          label={context.t('level')}
          onSelectFilter={doSelectFilter}
          options={listSpecializes}
          isGroupOption
          selectedOptions={selectedSpecializes}
          type="group-select"
          name="selectedSpecializes"
        />
      </div>
    </div>
  );
};

SelectFilterTeachers.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default SelectFilterTeachers;
