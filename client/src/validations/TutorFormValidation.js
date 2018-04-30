import {TT} from '../utils/locale'
import Network from '../utils/network'
import moment from 'moment'

export const validate = (values) => {
  const errors = {}

  if (!values.title) {
    errors.title = TT.t('tutor_title_required')
  }

  if (!values.description) {
    errors.description = TT.t('tutor_descriotion_required')
  }

  return errors
}