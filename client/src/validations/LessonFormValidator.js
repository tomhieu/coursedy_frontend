import {TT} from '../utils/locale'
import Network from '../utils/network'
import moment from 'moment'

export const validate = (values) => {
  const errors = {}

  if (!values.lessonName) {
    errors.lessonName = TT.t('lesson_required')
  }

  if (!values.lessonPeriod) {
      errors.lessonPeriod = TT.t('lesson_priode_required')
  } else if (isNaN(values.lessonPeriod)){
    errors.lessonPeriod = TT.t('not_a_number')
  }

  if (!values.lessonDesciption) {
      errors.lessonDesciption = TT.t('lesson_desc_required')
  }

  return errors
}