import * as React from 'react';
import { Component } from 'react';
import styles from './FilterOption.module.scss';
import OptionItem from './OptionItem';
import onClickOutside from "react-onclickoutside";

class FilterOption extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    this.setState({
      options: this.props.options,
      dataSource: this.props.options
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options,
      dataSource: nextProps.options
    });
  }

  handleClickOutside = evt => {
    this.setState({
      show: false
    });
  };

  filterOptions(e) {
    const term = e.target.value;
    const filteredOptions = this.state.dataSource.filter(op => op.name.toLowerCase().includes(term.toLowerCase()));
    this.setState({ options: filteredOptions });
  }

  onSelectOption(option) {
    this.props.onSelectFilter(option, this.props.name);
  }

  isSelected(option) {
    return this.props.selectedOptions.filter(op => op.id === option.id).length > 0;
  }

  renderOptions(options) {
    if (options.length === 0) {
      return null;
    }
    return (
      <div>
        <div className="d-flex flex-row flex-wrap">
          {
            options.map(op => (
              <div className={styles.optionItem} key={'option-item-' + op.name}>
                <OptionItem itemLabel={op.name}
                            customClassName={this.isSelected(op) ? 'option-item selected' : 'option-item'}
                            disabled={false}
                            isSelected={this.isSelected(op)}
                            onSelectionOption={this.onSelectOption.bind(this, op, null)}/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  renderGroupOptions(options) {
    if (options.length === 0) {
      return (
        <span>{this.context.t('')}</span>
      )
    }
    const {groupLabel} = this.props;
    return (
      <div className={styles.groupOptionContainer}>
        {
          groupLabel ? <div className={styles.groupTitle}>{groupLabel}</div> : null
        }
        {
          options.map(group => (
            <div key={group.id} className="full-width">
              <div className={styles.groupOptionHeader}>
                <span>{group.name}</span>
              </div>
              <div className={styles.groupOptionList}>
                {this.renderOptions(group.options)}
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  renderFilterBox(type) {
    switch (type) {
      case 'single-select':
      case 'multi-select':
        return (this.renderOptions(this.state.options));
      case 'group-select':
        return (this.renderGroupOptions(this.state.options));
    }
  }

  openFilterBox() {
    this.setState({ show: true });
  }

  render() {
    const { label, isFirst = false, type } = this.props;
    return (
      <div className={`${styles.filterOptionContainer} d-flex flex-vertical`} onClick={this.openFilterBox.bind(this)}>
        <div className={`${styles.filterHeader} d-flex flex-horizontal justify-content-center align-items-center`}>
          <span>{label}</span>
          {
            this.state.show
              ? (
                <svg viewBox="0 0 24 24" className="expand-icon ml-5 mt-5">
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="expand-icon ml-5 mt-5">
                  <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                </svg>
              )}
        </div>
        {
          this.state.show
            ? (
              <div className={isFirst ? styles.firstFilterContainer : styles.filterContainer}>
                <div className="d-flex flex-vertical">
                  <div className={styles.optionContainer}>
                    {
                      type === undefined ? this.props.children : this.renderFilterBox(type)
                    }
                  </div>
                </div>
              </div>
            ) : null
        }
      </div>
    );
  }
}

FilterOption.contextTypes = {
  t: React.PropTypes.func.isRequired
};

FilterOption.propTypes = {
  isFirst: React.PropTypes.bool,
  label: React.PropTypes.string.isRequired,
  onSelectFilter: React.PropTypes.func.isRequired,
  maxWidth: React.PropTypes.number
};

export default onClickOutside(FilterOption);
