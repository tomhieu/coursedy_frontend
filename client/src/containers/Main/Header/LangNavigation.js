import React, {Component, PropTypes} from 'react';
import cssModules from 'react-css-modules';
import styles from './Header.module.scss';
import CoursedyDropDown from "../../../components/Core/CoursedyDropdown/CoursedyDropDown";

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
      {id: 1, callback: this.handleSwitchLang.bind(this, "en"), text: '  EN', 
        'prefix': {
          'type': 'image',
          'value': '/flags/en.png'
        }
      },
      {id: 2, callback: this.handleSwitchLang.bind(this, "vn"), text: '  VI', 
        'prefix': {
          'type': 'image',
          'value': '/flags/vn.png'
        }
      }
    ]
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <div>
            <span className="nav-link" onClick={this.onClickArrow.bind(this)}>{this.props.lang.toUpperCase()}</span>
          </div>
        </div>
        <CoursedyDropDown items={dropdownOptions}
                          isOpen={this.state.show}
                          bgColor="#F4FAFA"
                          closeDropDown={this.onCloseDropDown.bind(this)}
                          width={'75px'}
                          >
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