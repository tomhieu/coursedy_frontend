import React, { Component } from 'react';

export default class AbstractFilter extends Component {
  /*
 * Description: ReWrite this method at inherit component if needed
 * */
  removeFilterCriteria(currentFilters, filterValue, filterType) {
    if (Array.isArray(currentFilters[filterType])) {
      const clonedFilters = JSON.parse(JSON.stringify(currentFilters[filterType]));
      currentFilters[filterType] = clonedFilters.filter(f => f.id !== Number(filterValue));
    } else if (filterType === 'term') {
      currentFilters.term = undefined;
    } else {
      currentFilters[filterType] = true;
    }
    return currentFilters;
  }

  /*
  * Description: ReWrite this method at inherit component if needed
  * */
  addFilterCriteria(currentFilters, filterValue, filterType) {
    // handle for multiple select filter options
    if (Array.isArray(currentFilters[filterType])) {
      const selectedFilters = JSON.parse(JSON.stringify(currentFilters[filterType]));
      selectedFilters.push(filterValue);
      currentFilters[filterType] = selectedFilters;
    } else {
      currentFilters.term = filterValue;
    }
    return currentFilters;
  }
}
