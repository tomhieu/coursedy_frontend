import * as React from 'react';
import { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './LessonDetails.module.scss';
import LessonIcon from '../../Core/Icons/LessonIcon';

class LessonDetails extends Component {
  render() {
    const { lesson, index } = this.props;
    return (
      <div className={styles.lessonSummary} key={`lessons-${lesson.title}${index}`}>
        <div className="d-flex flex-row">
          <div className={styles.lessonIcon}><LessonIcon fillColor="#1BC8BA" /></div>
          <div className={styles.lessonTitle}>
            <span>{lesson.title}</span>
          </div>
          <div
            className={styles.lessonDescription}
            data-toggle="collapse"
            data-target={`#collapseLesson${lesson.id}`}
            aria-expanded="true"
            aria-controls="collapseLesson"
          >
            <span>{this.context.t('lesson_description_expand')}</span>
          </div>
          <div className={styles.lesssonPeriod}>
            <span>{this.context.t('lesson_period', { lessonPeriod: lesson.period })}</span>
          </div>
        </div>
        <div id={`collapseLesson${lesson.id}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <p className={styles.descriptionContent} dangerouslySetInnerHTML={{ __html: lesson.description }} />
        </div>
      </div>
    );
  }
}

LessonDetails.propTypes = {
  lesson: React.PropTypes.object.isRequired,
  index: React.PropTypes.number
};

LessonDetails.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default cssModules(LessonDetails, styles);
