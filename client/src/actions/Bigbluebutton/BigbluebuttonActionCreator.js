import Network from '../../utils/network';
import {success} from 'react-notification-system-redux';
import {STARTED_JOINING_ACTIVE_CLASS} from '../AsyncActionCreator';
import {LessonStatus} from '../../constants/LessonStatus';
import React from 'react';

export const joinToBBBRoom = (classRoomId, lessonId, context, lang, onRemoveNotification, afterJoiningUpcomingClass) => dispatch => {
  Network().get(`rooms/${classRoomId}/join`, {lesson_id: lessonId}, true).then((res) => {
    const bbbTab = window.open(res.url, '_blank');
    // join fails because of blocking pop-up
    if (bbbTab === null) {
      const popupBlockerNoti = {
        title: '',
        message: context.t('browser_popup_blocker', {
          support_link: <a href={`https://support.google.com/chrome/answer/95472?co=GENIE.Platform%3DDesktop&hl=${lang}`} target='_blank'>{context.t('guide_link')}</a>,
          bbb_join_link: <a onClick={(e) => afterJoiningUpcomingClass(e)} href={res.url} target="_blank">{context.t('bbb_join_again')}</a>
        }),
        position: 'tr',
        onRemove: onRemoveNotification ? onRemoveNotification.bind(this) : null,
        autoDismiss: 0
      };
      dispatch(success(popupBlockerNoti));
    } else {
      // executed after joining an active class
      dispatch({ type: STARTED_JOINING_ACTIVE_CLASS })
    }
  }, (err) => {
    const roomNotReadyNotif = {
      title: '',
      message: context.t('no_bbb_room_ready'),
      position: 'tr',
      autoDismiss: 5,
      onRemove: onRemoveNotification ? onRemoveNotification.bind(this) : null,
    };
    dispatch(success(roomNotReadyNotif));
  });
};

export const terminateLesson = (lessonId, afterTerminateCallback) => {
  Network().update(`lessons/${lessonId}`, {id: lessonId, status: LessonStatus.FINISH}).then((res) => {
    if (afterTerminateCallback) {
      afterTerminateCallback();
    }
  });
}
