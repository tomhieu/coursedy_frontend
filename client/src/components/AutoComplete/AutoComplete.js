import {Component} from "react";
import * as React from "react";
import FormField from "../Core/FormField";
import cssModules from 'react-css-modules';
import styles from './AutoComplete.module.scss';
import {renderField} from "../Core/CustomComponents";
import Field from "redux-form/es/Field";

class AutoComplete extends Component {

  constructor() {
    super();
    this.state = {show: true}
  }

  renderGroupSuggestion(group, searchHandler) {
    const {name, suggestions} = group;
    return (
      <div className={styles.suggestionGroup + " flex flex-horizontal"}>
        <div className={styles.suggestionLine}>
          <span>{name}</span>
        </div>
        <div className="flex flex-horizontal ">
          {
            suggestions.map((s) => (
              <div className={styles.suggestionLine}>
                <a className="pl-10 pt-5" onClick={searchHandler(s.type, s.id, s.title)}>{s.title}</a>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  onBlur() {
    console.log("on blur event");
    this.setState({show: false});
  }

  onFocus() {
    console.log("on focus event");
    this.setState({show: true});
  }

  render() {
    const {placeholder, fieldName, fieldId, groupSugestions, searchHandler, loadSuggestions} = this.props;
    return (
      <div>
        <Field name={fieldName} placeholder={placeholder} onBlur={this.onBlur.bind(this)} onFocus={this.onFocus.bind(this)} onChange={loadSuggestions} component={renderField}/>
        {
          groupSugestions.length > 0 && this.state.show ?
            <div className={styles.modalSuggestion + " flex flex-vertical"}>
              {
                groupSugestions.map((gs) => (
                  this.renderGroupSuggestion(gs, searchHandler)
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
  placeholder: React.PropTypes.string.isRequired,
  searchHandler: React.PropTypes.func.isRequired,
  fieldName: React.PropTypes.string.isRequired,
  fieldId: React.PropTypes.string.isRequired,
  groupSugestions: React.PropTypes.array.isRequired,
  loadSuggestions: React.PropTypes.func.isRequired
};

export default cssModules(AutoComplete, styles);

