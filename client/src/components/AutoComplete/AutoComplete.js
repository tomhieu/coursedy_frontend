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
    const {show, isLoading, handleRequestDeleteChip, placeholder, fieldName, dataSource, handleAddCriteria, loadSuggestions} = this.props;
    return (
      <div className={styles.filterBox + " d-flex flex-vertical"}>
        <div className="d-flex flex-horizontal">
          <div className="search-icon">
            <svg class="uc-searchBarOmnibox-searchIcon" viewBox="0 0 25 25">
              <path d="M17.8724934,19.3481945 C17.4662,18.9419012 17.4643401,18.2850294 17.8746847,17.8746847 L17.8746847,17.8746847 C18.2821883,17.4671811 18.9468084,17.4711073 19.3481945,17.8724934 L23.7796805,22.3039794 C24.1859739,22.7102728 24.1878338,23.3671445 23.7774892,23.7774892 L23.7774892,23.7774892 C23.3699856,24.1849928 22.7053655,24.1810666 22.3039794,23.7796805 L17.8724934,19.3481945 L17.8724934,19.3481945 Z"></path>
              <path d="M19.7391304,9.86956522 C19.7391304,4.41875486 15.3203756,0 9.86956522,0 C4.41875486,0 0,4.41875486 0,9.86956522 C0,15.3203756 4.41875486,19.7391304 9.86956522,19.7391304 C15.3203756,19.7391304 19.7391304,15.3203756 19.7391304,9.86956522 Z M2,9.86956522 C2,5.52332436 5.52332436,2 9.86956522,2 C14.2158061,2 17.7391304,5.52332436 17.7391304,9.86956522 C17.7391304,14.2158061 14.2158061,17.7391304 9.86956522,17.7391304 C5.52332436,17.7391304 2,14.2158061 2,9.86956522 Z"></path>
            </svg>
          </div>
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
