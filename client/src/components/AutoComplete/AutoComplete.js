import * as React from "react";
import {Component} from "react";
import cssModules from 'react-css-modules';
import styles from './AutoComplete.module.scss';
import {renderField} from "../Core/CustomComponents";
import Field from "redux-form/es/Field";
import {SvgIcon} from "material-ui";
import {SERVER_NAME} from "utils/CommonConstant";

class AutoComplete extends Component {

  constructor() {
    super();
  }

  renderSuggestion(suggestion, handleAddCriteria) {
    return (
      <div className="d-flex flex-horizontal pt-10 pl-10" key={"suggestion_" + suggestion.id}>
        <div>
          <img src={suggestion.avatar ? SERVER_NAME + suggestion.avatar : 'http://placehold.it/75x75'} alt="" className={styles.itemAvatar + ' img-responsive img-circle'} />
        </div>
        <div className={styles.suggestionLine}>
          <a className="pl-10 d-flex flex-vertical suggestion-line" onClick={() => handleAddCriteria(suggestion.id, suggestion.title)}>
            <span className="header">{suggestion.title}</span>
            <span className="sub-header">{suggestion.sub_title}</span>
          </a>
        </div>
      </div>
    );
  }

  onBlur() {
  }

  onFocus() {
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.handleAddCriteria("", "", e.target.value)
    }
  }

  render() {
    const {show, isLoading, handleRequestDeleteChip, placeholder, fieldName, dataSource, handleAddCriteria, loadSuggestions, filters} = this.props;
    return (
      <div className={styles.filterBox + " d-flex flex-vertical"}>
        <div className="d-flex flex-horizontal">
          <SvgIcon>
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </SvgIcon>
          <div className="input-without-border">
            <Field name={fieldName} placeholder={placeholder}
                   onBlur={this.onBlur.bind(this)}
                   onFocus={this.onFocus.bind(this)}
                   onChange={loadSuggestions}
                   component={renderField}
                   onKeyPress={this.onKeyPress.bind(this)}/>
          </div>
        </div>
        {
          isLoading ? <div>Loading...</div> :
            show ? dataSource.length > 0 ?
              <div className={styles.modalSuggestion + " flex flex-vertical"}>
                {
                  dataSource.map((gs) => (
                    this.renderSuggestion(gs, handleAddCriteria)
                  ))
                }
              </div> :
              <div className={styles.modalSuggestion + " flex flex-vertical"}>
                <div className={styles.suggestionLine}>
                  <a className="pl-10 d-flex flex-vertical justify-content-center suggestion-line not-found">
                    <span className="sub-header">{this.context.t('not_found_suggestion')}</span>
                  </a>
                </div>
              </div>
              : null
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
  isLoading: React.PropTypes.bool.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  handleAddCriteria: React.PropTypes.func.isRequired,
  fieldName: React.PropTypes.string.isRequired,
  fieldId: React.PropTypes.string.isRequired,
  dataSource: React.PropTypes.array.isRequired,
  loadSuggestions: React.PropTypes.func.isRequired,
};

export default cssModules(AutoComplete, styles);
