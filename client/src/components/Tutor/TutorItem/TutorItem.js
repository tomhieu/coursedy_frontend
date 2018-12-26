import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { globalHistory } from 'utils/globalHistory';
import styles from './TutorItem.module.scss';
import RatingItem from '../../Rating/index';
import defaultAvatar from '../../../../images/default_avatar.png';
import Image from '../../Core/ImageComponent';

class TutorItem extends Component {
  goToTeacherDetails(teacherSlug) {
    globalHistory.replace(`/teachers/${teacherSlug}`);
  }

  render() {
    const { tutor } = this.props;
    const {
      id, user, categories, place_of_work, title
    } = tutor;

    return (
      <div className={styles.teacherItemGrid} onClick={() => this.goToTeacherDetails(tutor.slug)}>

        <a className={styles.imageWrapper}>
          <Image
            src={user.avatar ? user.avatar : defaultAvatar}
            className={styles.imageCard}
            fallbackSrc={defaultAvatar}
          />
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
