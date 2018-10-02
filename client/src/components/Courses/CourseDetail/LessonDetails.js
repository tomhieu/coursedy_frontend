import * as React from 'react';
import { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './LessonDetails.module.scss';
import LessonIcon from '../../Core/Icons/LessonIcon';
import {renderPreviewFile} from '../../Core/CustomComponents';
import {LessonStatus} from '../../../constants/LessonStatus';

class LessonDetails extends Component {
  render() {
    const { lesson, index, forStudentView } = this.props;
    const documents = lesson.documents.map((doc) => {
      doc.fileName = doc.name;
      return doc;
    });
    let lessonStatus;
    const lessonStatusClasses = [styles.lessonStatus];
    if (lesson.status === LessonStatus.FINISH) {
      lessonStatus = this.context.t('finish');
      lessonStatusClasses.push(styles.finish);
    } else if (lesson.status === LessonStatus.STARTED) {
      lessonStatus = this.context.t('started');
      lessonStatusClasses.push(styles.started);
    } else {
      lessonStatus = this.context.t('not_started');
      lessonStatusClasses.push(styles.not_started);
    }
    return (
      <div className={styles.lessonSummary} key={`lessons-${lesson.title}${index}`}>
        <div className="d-flex flex-row">
          <div className={styles.lessonIcon}><LessonIcon fillColor="#1BC8BA" /></div>
          <div className={styles.lessonTitle}>
            <span>{lesson.title}</span>
          </div>
          {
            forStudentView ? <div className={lessonStatusClasses.join(' ')}>{lessonStatus}</div> : null
          }
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
            <span>{this.context.t(this.context.t('lesson_period'), { lessonPeriod: lesson.period })}</span>
          </div>
        </div>
        <div id={`collapseLesson${lesson.id}`} className={styles.lessonDetails + " collapse"} aria-labelledby="headingOne" data-parent="#accordion">
          <div className={styles.lessonContent}>
            <div className={styles.label}>{this.context.t('lesson_description')}:</div>
            <p className={styles.lessonDescriptionDetail} dangerouslySetInnerHTML={{ __html: lesson.description }} />
          </div>
          {
            forStudentView ?
              <div className={styles.lessonContent}>
                <div className={styles.label}>{this.context.t('lesson_document')}:</div>
                {
                  documents.length > 0 ?
                    <div className="d-flex flex-vertical">
                      {
                        documents.map(doc => renderPreviewFile(doc))
                      }
                    </div> :
                    <div className={styles.noDocument}>
                      <span>{this.context.t('lesson_no_document')}</span>
                    </div>
                }
              </div> : null
          }
        </div>
      </div>
    );
  }
}

LessonDetails.propTypes = {
  lesson: React.PropTypes.object.isRequired,
  index: React.PropTypes.number,
  forStudentView: React.PropTypes.bool
};

LessonDetails.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default cssModules(LessonDetails, styles);
