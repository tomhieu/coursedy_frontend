import {Component} from "react";
import * as React from "react";

class ReadOnlyField extends Component {
  render() {
    const {displayStyle = "default-field", showLabel = true, fieldLabel, activatedFields, showEditFormField} = this.props;
    return (
      <div className={displayStyle + ' inline-field d-flex flex-horizontal'}>
        {showLabel && fieldLabel !== undefined && fieldLabel !== '' ? (<label className="control-label">{fieldLabel}: </label>) : ''}
        <label className='pre-wrap' dangerouslySetInnerHTML={{__html: this.props.content}}/>
        <span className='inline-edit' onClick={showEditFormField.bind(this, activatedFields)}>
              <i className="fa fa-pencil"></i>
            </span>
      </div>
    )
  }
}


ReadOnlyField.contextTypes = {
  t: React.PropTypes.func.isRequired
}

ReadOnlyField.propTypes = {
  displayStyle: React.PropTypes.string,
  content: React.PropTypes.string,
  showLabel: React.PropTypes.bool,
  fieldLabel: React.PropTypes.string,
  activatedFields: React.PropTypes.array,
  showEditFormField: React.PropTypes.func
}

export default ReadOnlyField;
