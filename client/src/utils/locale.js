import {translations} from '../translations'

export const TT =  {
  locale: "vn",
  t: (keys) => {
    let values = keys.split('.')
    values.unshift(translations[TT.locale])
    return values.reduce((trans, k) => trans[k])
  },
  t: (keys, params = {}) => {
      let values = keys.split('.')
      values.unshift(translations[TT.locale])
      let rawMessage = values.reduce((trans, k) => trans[k])
      Object.keys(params).map((key) => rawMessage = rawMessage.replace("%{" + key + "}", params[key]))
      return rawMessage
  }

};