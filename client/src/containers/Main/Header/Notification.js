import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './Header.module.scss';
import CoursedyDropDown from '../../../components/Core/CoursedyDropdown/CoursedyDropDown';

class Notification extends Component {
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

  onClickNotification() {
    console.log('sdsdsdsdsdsd');
  }

  onCloseDropDown() {
    this.setState({ show: false });
  }

  render() {
    const { session, main } = this.props;

    const dropdownContainerClassList = [styles.notificationContainer];

    let fillColor = '#B3BDBC';
    if (main.darkHeader) {
      fillColor = '#FFFFFF';
      dropdownContainerClassList.push(styles.homepage);
    }
    const dropdownClasses = [styles.notificationDropdown];
    if (this.state.show) {
      dropdownClasses.push(styles.open);
      dropdownContainerClassList.push(styles.open);
    } else {
      dropdownClasses.push(styles.close);
      dropdownContainerClassList.push(styles.close);
    }

    const notificationList = session.notifications;

    return (
      <div className={dropdownContainerClassList.join(' ')} onClick={this.onClickArrow.bind(this)}>
        <svg width="17px" height="20px" viewBox="0 0 17 20">
          <defs>
            <path d="M12.5,22 C13.6,22 14.5,21.1 14.5,20 L10.5,20 C10.5,21.1 11.4,22 12.5,22 L12.5,22 Z M19,16 L19,10.5 C19,7.43 16.87,4.86 14,4.18 L14,3.5 C14,2.67 13.33,2 12.5,2 C11.67,2 11,2.67 11,3.5 L11,4.18 C8.13,4.86 6,7.43 6,10.5 L6,16 L4,18 L4,19 L21,19 L21,18 L19,16 L19,16 Z" id="path-1" />
          </defs>
          <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Atoms-/-Icon/System/Notification" transform="translate(-4.000000, -2.000000)">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <use id="Shape" fillOpacity="0.7" fill={fillColor} xlinkHref="#path-1" />
            </g>
          </g>
        </svg>
        {
          notificationList.length > 0
            ? (
              <div className={styles.notificationNumber}>
                {notificationList.length}
              </div>
            ) : null
        }
        <CoursedyDropDown
          items={notificationList}
          isOpen={this.state.show}
          bgColor="#F4FAFA"
          width={450}
          emptyMessage={this.context.t('no_notification_found')}
          closeDropDown={this.onCloseDropDown.bind(this)}
        />
      </div>
    );
  }
}

Notification.contextTypes = {
  t: React.PropTypes.func.isRequired
};

Notification.propTypes = {
  session: PropTypes.object,
  main: PropTypes.object
};

export default cssModules(Notification, styles);
