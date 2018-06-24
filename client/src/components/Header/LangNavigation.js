import React, {Component, PropTypes} from 'react';
import cssModules from 'react-css-modules';
import styles from './Header.module.scss';
import defaultAvatar from '../../../images/default_avatar.png'
import CoursedyDropDown from "../Core/CoursedyDropdown/CoursedyDropDown";

class LangNavigation extends Component {
  constructor(props) {
    super();
    this.state = {
      show: false
    }
  }
  onClickArrow() {
    const isOpenDropDown = this.state.show;
    this.setState({show: !isOpenDropDown});
  }

  onCloseDropDown() {
    this.setState({show: false});
  }

  handleSwitchLang(lang) {
    this.props.switchLang(lang)
  }

  render() {
    const dropdownOptions = [
      {id: 1, callback: this.handleSwitchLang.bind(this, "en"), text: 'Tiếng Anh'},
      {id: 2, callback: this.handleSwitchLang.bind(this, "vn"), text: 'Tiếng Việt'}
    ]
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <div className={styles.langIcon}>
            <img className="media-object full-width" onClick={this.onClickArrow.bind(this)}
                 src={'/flags/' + this.props.lang + '.png'}
            />
          </div>
        </div>
        <CoursedyDropDown items={dropdownOptions}
                          isOpen={this.state.show}
                          bgColor="#F4FAFA"
                          closeDropDown={this.onCloseDropDown.bind(this)}>
        </CoursedyDropDown>
      </div>
    )
  }
}


LangNavigation.contextTypes = {
  t: React.PropTypes.func.isRequired
}

LangNavigation.propTypes = {
  session: PropTypes.object.isRequired,
};

export default cssModules(LangNavigation, styles);