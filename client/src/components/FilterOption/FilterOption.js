import {Component} from "react";
import styles from "./FilterOption.module.scss"
import * as React from "react";
import FontIcon from "material-ui/FontIcon";

export class FilterOption extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }
  filterOptions(e) {

  }

  onSelectOption(option, group) {
    this.setState({show: false});
    this.props.onSelectFilter(option, group)
  }

  renderOptions(options) {
    return (
      <div>
        {
          options.length > 0 ?
            <ul>
              {
                options.map(op =>
                  <li onClick={() => this.onSelectOption(op, null)} className="option-item">
                    {
                      this.props.selectedOptions.indexOf(op.id) >= 0 ?
                        <span className="selected">{op.text}</span> : <span>{op.text}</span>
                    }
                  </li>)
              }
            </ul> : null
        }
      </div>
    )
  }

  renderGroupOptions(groupOptions) {
    return (
      groupOptions.map(group =>
        <div key={group.id}>
          <span>{group.name}</span>
          {this.renderOptions(group.options)}
        </div>
      )
    )
  }

  renderFilterBox(type) {
    switch (type) {
      case 'single-select':
      case 'multi-select':
        return (this.renderOptions(this.props.options))
      case 'group-select':
        return (this.renderGroupOptions(this.props.options))
    }
  }

  render() {
    const {label, type} = this.props
    return (
      <div className="d-flex flex-vertical">
        <div className={styles.filterHeader}>
          <span className="mt-5">{label}</span>
          <FontIcon className="material-icons">home</FontIcon>
        </div>
        <div className={styles.filterContainer}>
          <div className="d-flex flex-vertical">
            <input onChange={(e) => this.filterOptions(e)}/>
            <div>
              {
                type == undefined ? this.props.children : this.renderFilterBox(type)
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FilterOption.contextTypes = {
  t: React.PropTypes.func.isRequired
}

FilterOption.propTypes = {
  label: React.PropTypes.string.isRequired,
  onSelectFilter: React.PropTypes.func.isRequired
};