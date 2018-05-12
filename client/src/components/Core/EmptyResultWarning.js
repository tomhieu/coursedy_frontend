import React from 'react'
import {TT} from "utils/locale";
import {Component} from "react";

class EmptyResultWarning extends Component {
  resetFilter() {
    this.props.resetFilter();
    this.props.search({currentPage: 1, sortOrder: 'desc'});
  }
  render() {
    const {styles, searchType} = this.props;
    return (
      <div className={`${styles} row justify-content-center`}>
        <div className="d-flex flex-auto align-items-center">
          <div className="d-flex flex-vertical flex-auto">
            <div className="empty-result-message">{TT.t("search_empty_result", {type: TT.t(searchType)})}</div>
            <div className="list-option">
              <ul className="empty-result-option">
                <li>{TT.t("search_empty_result_header")}</li>
                <li><a className="clear-filter" tabIndex={1} onClick={this.resetFilter.bind(this)}>{TT.t("search_empty_result_reset")}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EmptyResultWarning.contextTypes = {
  t: React.PropTypes.func.isRequired
}

EmptyResultWarning.defaultProps = {
  styles: ''
}

EmptyResultWarning.propTypes = {
  styles: React.PropTypes.string,
  searchType: React.PropTypes.string,
}

export default EmptyResultWarning
