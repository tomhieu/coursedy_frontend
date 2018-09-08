import { Component } from 'react';
import * as React from 'react';

class ReadOnlyField extends Component {
  render() {
    const {
      displayStyle, showLabel = true, fieldLabel,
      activatedFields, showEditFormField, isRichTextField
    } = this.props;
    // display vertical for Rich Text field
    const inlineFieldClasses = isRichTextField ? `${displayStyle} inline-field d-flex flex-vertical`
      : `${displayStyle} inline-field d-flex flex-horizontal`;
    return (
      isRichTextField
        ? (
          <div className={inlineFieldClasses}>
            <div className="d-flex flex-horizontal">
              {showLabel && fieldLabel !== undefined && fieldLabel !== '' ? (
                <label className="control-label">
                  {fieldLabel}
:
                  {' '}
                </label>
              ) : ''}
              <span className="inline-edit" onClick={showEditFormField.bind(this, activatedFields)}>
                <i className="fa fa-pencil" />
              </span>
            </div>
            <label className="pre-wrap" dangerouslySetInnerHTML={{ __html: this.props.content }} />
          </div>
        )
        : (
          <div className={inlineFieldClasses}>
            {showLabel && fieldLabel !== undefined && fieldLabel !== '' ? (
              <label className="control-label">
                {fieldLabel}
:
                {' '}
              </label>
            ) : ''}
            <label className="pre-wrap" dangerouslySetInnerHTML={{ __html: this.props.content }} />
            <span className="inline-edit" onClick={showEditFormField.bind(this, activatedFields)}>
              <i className="fa fa-pencil" />
            </span>
          </div>
        )
    );
  }
}


ReadOnlyField.contextTypes = {
  t: React.PropTypes.func.isRequired
};

ReadOnlyField.propTypes = {
  displayStyle: React.PropTypes.string,
  content: React.PropTypes.string,
  showLabel: React.PropTypes.bool,
  fieldLabel: React.PropTypes.string,
  activatedFields: React.PropTypes.array,
  showEditFormField: React.PropTypes.func,
  isRichTextField: React.PropTypes.bool
};

export default ReadOnlyField;
