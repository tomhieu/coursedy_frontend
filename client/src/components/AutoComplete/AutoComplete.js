import * as React from 'react';
import { Component } from 'react';
import cssModules from 'react-css-modules';
import Field from 'redux-form/es/Field';
import { SERVER_NAME } from 'utils/CommonConstant';
import styles from './AutoComplete.module.scss';
import { renderField } from '../Core/CustomComponents';
import AsyncLoader from '../../containers/LoadingMask/AsyncLoader';
import Image from '../Core/ImageComponent';

export class AutoComplete extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.autoCompleteWrapper && !this.autoCompleteWrapper.contains(event.target) && this.props.closeSuggestion) {
      this.props.closeSuggestion();
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.search({ key_word: e.target.value });
    }
  }

  static renderSuggestion(suggestion, handleAddCriteria) {
    return (
      <div className={`d-flex flex-horizontal ${styles.suggestionItemWrapper}`} key={`suggestion_${suggestion.id}`}>
        <div>
          <Image
            src={suggestion.avatar ? suggestion.avatar : ''}
            alt=""
            className={`${styles.itemAvatar} ${styles.suggestionCoverImage}`}
            fallbackSrc="http://placehold.it/65x65"
          />
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

  static renderSugguestionList({ show, isLoading, dataSource, handleAddCriteria, context }) {
    if (!show) return null;

    return (
      <div id="suggestion-items" className={`${styles.modalSuggestion} flex flex-vertical ${isLoading && 'loading-bar-autocomplete'}`}>
        {
          isLoading ? (
            <AsyncLoader normalPlaceholder loadingBgColor="#1CABA0" width={30} height={30}/>
          ) : null
        }
        {
          dataSource.length > 0 ? dataSource.map(gs => (
            AutoComplete.renderSuggestion(gs, handleAddCriteria)
          )) : (
            <div className={styles.suggestionLine}>
              <a className="pl-10 d-flex flex-vertical justify-content-center suggestion-line not-found">
                <span className="sub-header">{context.t('not_found_suggestion')}</span>
              </a>
            </div>)
        }
      </div>
    );
  }

  render() {
    const {
      onBlur, onFocus, placeholder, fieldName, loadSuggestions
    } = this.props;
    return (
      <div className={`${styles.filterBox} d-flex flex-vertical`} ref={(el) => {
        this.autoCompleteWrapper = el;
        AutoComplete.autoCompleteWrapper = el;
      }}>
        <div className="d-flex flex-horizontal">
          <div className="input-without-border">
            <Field
              name={fieldName}
              placeholder={placeholder}
              onBlur={onBlur}
              onFocus={onFocus}
              onChange={loadSuggestions}
              component={renderField}
              onKeyPress={this.onKeyPress.bind(this)}
            />
          </div>
        </div>
        { AutoComplete.renderSugguestionList({ ...this.props, context: this.context }) }
      </div>
    );
  }
}

AutoComplete.contextTypes = {
  t: React.PropTypes.func.isRequired
};

AutoComplete.propTypes = {
  show: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  handleAddCriteria: React.PropTypes.func.isRequired,
  fieldName: React.PropTypes.string.isRequired,
  fieldId: React.PropTypes.string.isRequired,
  dataSource: React.PropTypes.array.isRequired,
  loadSuggestions: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  closeSuggestion: React.PropTypes.func,
  search: React.PropTypes.func
};

export default cssModules(AutoComplete, styles);
