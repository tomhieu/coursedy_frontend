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
}

export default DateUtils;