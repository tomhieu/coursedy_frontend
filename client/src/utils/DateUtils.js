import moment from "moment";

class DateUtils {
  static formatDate(dateValue, locale = 'vn') {
    if (dateValue === undefined) {
      return '';
    }
    const l10nEN = new Intl.DateTimeFormat("en-US")
    const l10nVN = new Intl.DateTimeFormat("vi-VN")
    const formatedDate = locale === 'vn' ? l10nVN.format(new Date(dateValue)) : l10nEN.format(new Date(dateValue));
    return formatedDate;
  }

  static getHourFromDate(dateValue) {
    return !dateValue ? null : moment(dateValue).format('HH:mm:ss')
  }

  static retrieveStartTimeOfDay = (courseDays, day) => {
    if (!Array.isArray(courseDays) || courseDays.length === 0) {
      return "";
    }
    if (day == null) {
      return courseDays[0].start_time;
    }
    const [selectedDay] = courseDays.filter((d) => d.day === day);
    return selectedDay ? selectedDay.start_time : "";
  }

  static retrieveEndTimeOfDay = (courseDays, day) => {
    if (!Array.isArray(courseDays) || courseDays.length === 0) {
      return "";
    }

    if (day == null) {
      return courseDays[0].end_time;
    }
    const [selectedDay] = courseDays.filter((d) => d.day === day);
    return selectedDay ? selectedDay.end_time : "";
  }

  static getDayInWeekOfCourse(week_day_schedules) {
    const days = week_day_schedules.forEach((day) => {
      return day.name
    });
    return days ? days.join(', ') : '';
  }
}

export default DateUtils;