import { TT } from 'utils/locale';
import { momentCustom } from '../components/Layout/Layout';

class DateUtils {
  static formatDate(dateValue, locale = 'vn') {
    if (dateValue === undefined) {
      return '';
    }
    const l10nEN = new Intl.DateTimeFormat('en-US');
    const l10nVN = new Intl.DateTimeFormat('vi-VN');
    const formatedDate = locale === 'vn'
      ? l10nVN.format(new Date(dateValue))
      : l10nEN.format(new Date(dateValue));
    return formatedDate;
  }

  static dateTimeFromNow(dateValue) {
    return momentCustom(dateValue).fromNow();
  }

  static normalizeTime = (time) => {
    return time.substr(0, time.length - 3);
  };

  static retrieveStartTimeOfDay = (courseDays, day) => {
    if (!Array.isArray(courseDays) || courseDays.length === 0) {
      return '';
    }
    if (day == null) {
      return DateUtils.normalizeTime(courseDays[0].start_time);
    }
    const [selectedDay] = courseDays.filter(d => d.day === day);
    return selectedDay ? DateUtils.normalizeTime(selectedDay.start_time) : '';
  };

  static retrieveEndTimeOfDay = (courseDays, day) => {
    if (!Array.isArray(courseDays) || courseDays.length === 0) {
      return '';
    }

    if (day == null) {
      return DateUtils.normalizeTime(courseDays[0].end_time);
    }
    const [selectedDay] = courseDays.filter(d => d.day === day);
    return selectedDay ? DateUtils.normalizeTime(selectedDay.end_time) : '';
  };

  static getDayInWeekOfCourse(week_day_schedules) {
    const days = week_day_schedules.map((day) => {
      return TT.t(day.day);
    });
    return days ? days.join(', ') : '';
  }
}

export default DateUtils;
