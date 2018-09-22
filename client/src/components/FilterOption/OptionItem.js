import {Component} from 'react';
import * as React from 'react';

class OptionItem extends Component {
  render() {
    const {input, itemLabel, disabled, customClassName, onSelectionOption, isSelected = false} = this.props;
    return (
      <div className="full-width-input-wrapper">
        <label className="custom-control custom-checkbox">
          {
            isSelected ? <input
              {...input}
              type="checkbox"
              disabled={disabled}
              checked
              onChange={onSelectionOption.bind(this)}
              className={`${customClassName} custom-control-input`}
            /> : <input
              {...input}
              type="checkbox"
              disabled={disabled}
              onChange={onSelectionOption.bind(this)}
              className={`${customClassName} custom-control-input`}
            />
          }
          <span className="custom-control-indicator" />
          <span className="custom-control-description">{itemLabel}</span>
        </label>
      </div>
    )
  }

}

OptionItem.propTypes = {
  itemLabel: React.PropTypes.string.isRequired,
  customClassName: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  onSelectionOption: React.PropTypes.func,
  isSelected: React.PropTypes.bool
};

export default OptionItem;

