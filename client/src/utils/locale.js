import {translations} from '../translations'

export const TT =  {
  locale: "vn",
  t: (keys) => {
    let values = keys.split('.')
    values.unshift(translations[TT.locale])

    return values.reduce((trans, k) => trans[k])
  },

  t: (key, params, context) => {
    let values = keys.split('.')
    values.unshift(translations[TT.locale])

  }
};