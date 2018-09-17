import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { globalHistory } from 'utils/globalHistory';
import styles from './TutorItem.module.scss';
import RatingItem from '../../Rating/index';
import defaultAvatar from '../../../../images/default_avatar.png';

class TutorItem extends Component {
  goToTeacherDetails(teacherId) {
    globalHistory.replace(`/teachers/${teacherId}`);
  }

  render() {
    const {
      id, user, categories, place_of_work, title
    } = this.props.tutor;

    return (
      <div className={styles.teacherItemGrid} onClick={() => this.goToTeacherDetails(id)}>

        <a className={styles.imageWrapper}>
          <img className={styles.imageCard} src={user.avatar ? user.avatar : defaultAvatar} />
        </a>

        <div className={`${styles.teacherContact} row`}>
          <div className="col-md-12">
            <RatingItem num_stars={user.rating_points} num_reviews={user.rating_count} />
          </div>
          <div className="col-md-12">
            <a className={styles.teacherName}>
              {user.name}
            </a>
          </div>
          <div className="col-md-12">
            <a className={styles.teacherCategory}>
              {title}
            </a>
          </div>
          <div className="col-md-12">
            <a className={styles.teacherWorkingPlace}>
              {place_of_work}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

TutorItem.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorItem.propTypes = {
  tutor: React.PropTypes.object.isRequired
};

export default cssModules(TutorItem, styles);
