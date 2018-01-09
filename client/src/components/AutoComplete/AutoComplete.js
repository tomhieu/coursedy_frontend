import * as React from "react";
import {Component} from "react";
import cssModules from 'react-css-modules';
import styles from './AutoComplete.module.scss';
import {renderField} from "../Core/CustomComponents";
import Field from "redux-form/es/Field";

class AutoComplete extends Component {

  constructor() {
    super();
  }

  renderGroupSuggestion(group, handleAddCriteria) {
    const {name, suggestions} = group;
    return (
      <div className={styles.suggestionGroup + " flex flex-horizontal"} key={"suggestion_" + name}>
        <div className={styles.suggestionLine}>
          <span>{name}</span>
        </div>
        <div className="flex flex-horizontal ">
          {
            suggestions.map((s) => (
              <div className={styles.suggestionLine}>
                <a className="pl-10 pt-5" onClick={() => handleAddCriteria(s.group, s.id, s.text)}>{s.text}</a>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  onBlur() {
    console.log("on blur event");
    // this.setState({show: false});
  }

  onFocus() {
    console.log("on focus event");
  }

  render() {
    const {show, handleRequestDeleteChip, placeholder, fieldName, dataSource, handleAddCriteria, loadSuggestions, filters} = this.props;
    return (
      <div className={styles.filterBox + " d-flex flex-vertical"}>
        <div className="d-flex flex-horizontal">
          <div className="input-without-border">
            <Field name={fieldName} placeholder={placeholder} onBlur={this.onBlur.bind(this)} onFocus={this.onFocus.bind(this)} onChange={loadSuggestions} component={renderField}/>
          </div>
        </div>
        {
          dataSource.length > 0 && show ?
            <div className={styles.modalSuggestion + " flex flex-vertical"}>
              {
                dataSource.map((gs) => (
                  this.renderGroupSuggestion(gs, handleAddCriteria)
                ))
              }
            </div> : <div></div>
        }
      </div>
    )
  }
}


AutoComplete.contextTypes = {
  t: React.PropTypes.func.isRequired
}

AutoComplete.propTypes = {
  show: React.PropTypes.bool.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  handleAddCriteria: React.PropTypes.func.isRequired,
  fieldName: React.PropTypes.string.isRequired,
  fieldId: React.PropTypes.string.isRequired,
  dataSource: React.PropTypes.array.isRequired,
  loadSuggestions: React.PropTypes.func.isRequired,
};

export default cssModules(AutoComplete, styles);

