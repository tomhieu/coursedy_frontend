import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { setLanguage } from 'redux-i18n';
import styles from './Header.module.scss';
import CoursedyDropDown from '../../../components/Core/CoursedyDropdown/CoursedyDropDown';
import Image from '../../../components/Core/ImageComponent';

class LangNavigation extends Component {
  constructor(props) {
    super();
    this.state = {
      show: false
    };
  }

  onClickArrow() {
    const isOpenDropDown = this.state.show;
    this.setState({ show: !isOpenDropDown });
  }

  onCloseDropDown() {
    this.setState({ show: false });
  }

  handleSwitchLang(lang) {
    this.props.switchLang(lang);
  }

  findFlagByLang(lang) {
    if (lang === 'vi') {
      return '/flags/vn.png';
    }
    return '/flags/en.png';
  }

  render() {
    const dropdownOptions = [
      {
        id: 1,
        callback: this.handleSwitchLang.bind(this, 'en'),
        text: '  EN',
        prefix: {
          type: 'image',
          value: '/flags/en.png'
        }
      },
      {
        id: 2,
        callback: this.handleSwitchLang.bind(this, 'vi'),
        text: '  VI',
        prefix: {
          type: 'image',
          value: '/flags/vn.png'
        }
      }
    ];
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <div>
            <Image
              className="flag-country-icon"
              src={this.findFlagByLang(this.props.lang)}
              onClick={this.onClickArrow.bind(this)}
            />
          </div>
        </div>
        <CoursedyDropDown
          items={dropdownOptions}
          isOpen={this.state.show}
          bgColor="#F4FAFA"
          closeDropDown={this.onCloseDropDown.bind(this)}
          width={75}
        />
      </div>
    );
  }
}


LangNavigation.contextTypes = {
  t: React.PropTypes.func.isRequired
};

LangNavigation.propTypes = {
  session: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  switchLang: lang => {
    dispatch(setLanguage(lang))
    localStorage.setItem('coursedyLang', lang)
  }
});

export default connect(null, mapDispatchToProps)(cssModules(LangNavigation, styles));
