import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './StudentItem.module.scss';
import defaultAvatar from '../../../../images/default_avatar.png';
import Image from '../../Core/ImageComponent';

class StudentItem extends Component {
  render() {
    const { student } = this.props;
    return (
      <div className={`row flex-auto ${styles.seperationLine}`}>
        <div className="col-xl-5 col-sm-12">
          <div className="row">
            <div className="col-md-9 col-sm-12">
              <div className="d-flex flex-row align-items-center">
                <a className={styles.studentAvatarImage}>
                  <Image src={student.avatar ? student.avatar : defaultAvatar} fallbackSrc={defaultAvatar} />
                </a>
                <div className={styles.studentName}>{student.name}</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 d-flex align-items-center" />
          </div>
        </div>
        <div className="col-xl-7 col-sm-12">
          <div className="row align-items-center">
            <div className="col-md-2 col-sm-4">
              <div className="d-flex flex-row align-items-center">
                <div className={styles.leftSeperateLine} />
                <div>{student.date_of_enrollment}</div>
              </div>
            </div>
            <div className="col-md-2 col-sm-4">
              <div className="d-flex flex-row align-items-center">
                <div className={styles.leftSeperateLine} />
                <div>{student.gender}</div>
              </div>
            </div>
            <div className="col-md-6 col-sm-4">
              <div className="d-flex flex-row align-items-center">
                <div className={styles.leftSeperateLine} />
                <div>{student.email}</div>
              </div>
            </div>
            <div className="col-md-2 col-sm-4">
              <div className="d-flex flex-row" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentItem.contextTypes = {
  t: React.PropTypes.func.isRequired
};

StudentItem.propTypes = {
  // the public course will have some additional feature like following
  student: React.PropTypes.object.isRequired
};

export default cssModules(StudentItem, styles);
