import { Component } from 'react';
import * as React from 'react';
import cssModules from 'react-css-modules';
import { Link } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import styles from './CoursedyDropDown.module.scss';
import { globalHistory } from '../../../utils/globalHistory';

class CoursedyMultiStep extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  handleClickOutside(event) {
    const dropDownContainer = ReactDOM.findDOMNode(this.refs.dropDownContainer);
    if (dropDownContainer != null && !dropDownContainer.contains(event.target)) {
      this.props.closeDropDown();
    }
  }

  onSelectOption(link, callback) {
    this.props.closeDropDown();
    if (link) {
      globalHistory.push(link);
    } else {
      callback();
    }
  }

  render() {
    const {
      items, isOpen, closeDropDown, bgColor, width, emptyMessage
    } = this.props;

    if (!isOpen) {
      return null;
    }

    const dropDownClasses = [styles.dropDownMenu];
    if (isOpen) {
      dropDownClasses.push(styles.open);
    } else {
      dropDownClasses.push(styles.close);
    }

    const customStyles = {};
    if (width) {
      customStyles.width = width;
    }

    return (
      <div className={styles.dropDownContainer}>
        <div className={styles.dropDownArrow_w} />
        <div className={styles.dropDownArrow_v} />
        <div ref="dropDownContainer" className={dropDownClasses.join(' ')} style={customStyles}>
          <ul>
            {
              items.length > 0
                ? items.map((item) => {
                  return item.link
                    ? <li key={`${item.id}option`} className={styles.option}><a onClick={this.onSelectOption.bind(this, item.link)}>{item.text}</a></li>
                    : <li key={`${item.id}option`} className={styles.option}><a onClick={this.onSelectOption.bind(this, undefined, item.callback)}>{item.text}</a></li>;
                }) : <span>{emptyMessage}</span>
            }
          </ul>
        </div>
      </div>
    );
  }
}


CoursedyMultiStep.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CoursedyMultiStep.propTypes = {
  items: React.PropTypes.array.isRequired,
  isOpen: React.PropTypes.bool.isRequired,
  closeDropDown: React.PropTypes.func.isRequired,
  bgColor: React.PropTypes.string,
  width: React.PropTypes.number,
  emptyMessage: React.PropTypes.string
};

export default cssModules(CoursedyMultiStep, styles);
