import moment from "moment";

class DateUtils {
    static formatDate(dateValue, locale = 'vn') {
        const l10nEN = new Intl.DateTimeFormat("en-US")
        const l10nVN = new Intl.DateTimeFormat("vi-VN")
        const formatedDate = locale === 'vn' ? l10nVN.format(new Date(dateValue)) : l10nEN.format(new Date(dateValue));
        return formatedDate;
    }
}

export default DateUtils;