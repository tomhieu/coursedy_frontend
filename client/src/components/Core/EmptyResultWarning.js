import React from 'react';
import { TT } from 'utils/locale';
import { Component } from 'react';


class EmptyResultWarning extends Component {
  resetFilter() {
    this.props.resetFilter();
    this.props.search({ currentPage: 1, sortOrder: 'desc' });
  }

  render() {
    const { styles, searchType } = this.props;
    return (
      <div className={`${styles} row justify-content-center`}>
        <div className="d-flex flex-auto">
          <div className="d-flex flex-vertical flex-auto">
            <div
              className="empty-result-message"
            >
              {this.context.t('search_empty_result', {
                type: <strong>{this.context.t(searchType)}</strong>
              })}
            </div>
            <div
              className="empty-result-message"
            >
              {this.context.t('search_empty_result_header')}{' '}<a
              className="clear-filter"
              tabIndex={1}
              onClick={this.resetFilter.bind(this)}
            >
              {this.context.t('search_empty_result_reset')}
            </a>
              {'.'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


EmptyResultWarning.contextTypes = {
  t: React.PropTypes.func.isRequired
};

EmptyResultWarning.defaultProps = {
  styles: ''
};

EmptyResultWarning.propTypes = {
  styles: React.PropTypes.string, searchType: React.PropTypes.string
};

export default EmptyResultWarning;
