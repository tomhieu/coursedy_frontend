class ObjectUtils {
    static generateUUID() {
        let d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    static currencyFormat(value, currency) {
        const l10nUSD = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
        const l10nVND = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'});
        if (currency === 'VND') {
            return l10nVND.format(value);
        } else {
            return l10nUSD.format(value);
        }
    }
}

export default ObjectUtils;