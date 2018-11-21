import { translations } from '../translations';

const getInitCoursedyLang = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('coursedyLang');
  }
  return undefined;
};

export const TT = {
  locale: 'vn',
  changeLocale: (locale = getInitCoursedyLang() || TT.locale) => {
    const newTT = TT;
    TT.locale = locale;
    return newTT;
  },
  t: (keys) => {
    const values = keys.split('.');
    values.unshift(translations[getInitCoursedyLang() || TT.locale]);

    return values.reduce((trans, k) => trans[k]);
  },
  t: (keys, params = {}) => {
    const values = keys.split('.');
    values.unshift(translations[getInitCoursedyLang() || TT.locale]);
    let rawMessage = values.reduce((trans, k) => trans[k]);
    Object.keys(params).map(key => rawMessage = rawMessage.replace(`{${key}}`, params[key]));
    return rawMessage;
  }
};
