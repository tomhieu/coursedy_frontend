import * as React from "react";
import {Component} from "react";
import styles from "./FilterOption.module.scss"

export class FilterOption extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    this.setState({
      options: this.props.options,
      dataSource: this.props.options
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options,
      dataSource: nextProps.options
    })
  }

  filterOptions(e) {
    const term = e.target.value
    const filteredOptions = this.state.dataSource.filter(op => op.name.toLowerCase().includes(term.toLowerCase()))
    this.setState({options: filteredOptions})
  }

  onSelectOption(option) {
    this.setState({show: false});
    this.props.onSelectFilter(option, this.props.name)
  }

  isSelected(option) {
    return this.props.selectedOptions.filter(op => op.id === option.id).length > 0
  }

  renderOptions(options) {
    return (
      <div>
        {
          options.length > 0 ?
            <ul>
              {
                options.map(op =>
                  <li className={this.isSelected(op) ? "option-item selected" : "option-item"}
                      key={"options_" + op.id}>
                    {
                      this.isSelected(op) ?
                        <span className="selected" disabled={true}>{op.name}</span> : <a className="full-width" onClick={() => this.onSelectOption(op, null)}>{op.name}</a>
                    }
                  </li>)
              }
            </ul> : null
        }
      </div>
    )
  }

  renderGroupOptions(options) {
    return (
      options.map(group =>
        <div key={group.id} className="full-width">
          <div className="group-header full-width">
            <span>{group.name}</span>
          </div>
          {this.renderOptions(group.options)}
        </div>
      )
    )
  }

  renderFilterBox(type) {
    switch (type) {
      case 'single-select':
      case 'multi-select':
        return (this.renderOptions(this.state.options))
      case 'group-select':
        return (this.renderGroupOptions(this.state.options))
    }
  }

  onMouseLeaveHandler() {
    this.setState({show: false});
  }

  onMouseEnterHandler() {
    this.setState({show: true});
  }

  render() {
    const {label, isFirst = false, type} = this.props
    return (
      <div className={styles.filterOptionContainer + " d-flex flex-vertical"} onMouseEnter={() => this.onMouseEnterHandler()} onMouseLeave={() => this.onMouseLeaveHandler()}>
        <div className={styles.filterHeader + " d-flex flex-horizontal justify-content-center align-items-center"}>
          <span>{label}</span>
          {
            this.state.show ?
              <svg class="ml-10 mt-5" viewBox="0 0 24 24" className="expand-icon ml-5 mt-5">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
              </svg>:
              <svg class="ml-10 mt-5" viewBox="0 0 24 24" className="expand-icon ml-5 mt-5">
                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
              </svg>
          }
        </div>
        {
          this.state.show ?
            <div className={isFirst ? styles.firstFilterContainer : styles.filterContainer} >
              <div className="d-flex flex-vertical">
                {
                  type !== undefined ?
                    <div className={styles.filterInput}>
                      <input onChange={(e) => this.filterOptions(e)}/>
                    </div> : null
                }
                <div className={styles.optionContainer}>
                  {
                    type === undefined ? this.props.children : this.renderFilterBox(type)
                  }
                </div>
              </div>
            </div> : null
        }
      </div>
    )
  }
}

FilterOption.contextTypes = {
  t: React.PropTypes.func.isRequired
}

FilterOption.propTypes = {
  isFirst: React.PropTypes.bool,
  label: React.PropTypes.string.isRequired,
  onSelectFilter: React.PropTypes.func.isRequired
};
