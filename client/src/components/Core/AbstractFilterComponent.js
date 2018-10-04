import React, { Component } from 'react';
import { MAX_FEE, MIN_FEE } from '../../utils/CommonConstant';

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
      const selectFilterIndex = selectedFilters.findIndex(filter => filter.id === filterValue.id);
      if (selectFilterIndex < 0) {
        selectedFilters.push(filterValue);
      } else {
        selectedFilters.splice(selectFilterIndex, 1);
      }
      currentFilters[filterType] = selectedFilters;
    } else if (filterType === 'term') {
      currentFilters.term = filterValue;
    } else if (filterType === MIN_FEE) {
      currentFilters[filterType] = false;
    } else if (filterType === MAX_FEE) {
      currentFilters[filterType] = false;
    }
    return currentFilters;
  }
}
