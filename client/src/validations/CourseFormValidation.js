import {TT} from '../utils/locale'
import Network from '../utils/network'
import moment from 'moment'

export const validate = (values) => {
  const errors = {}

  if (!values.title) {
    errors.title = TT.t('course_title_required')
  }

  const start_date = moment(values.start_date, 'DD/MM/YYYY');
  const end_date = moment(values.end_date, 'DD/MM/YYYY');
  const now = moment();

  if (values.start_date && start_date.diff(now) < 0) {
    errors.start_date = TT.t('invalid_start_date')
  }

  if (values.end_date && end_date.diff(now) < 0) {
    errors.end_date = TT.t('invalid_end_date')
  }

  if (values.start_date && values.end_date && end_date.diff(start_date) < 0) {
    errors.end_date = TT.t('invalid_start_and_end_date')
  }

  if (values.number_of_students && isNaN(values.number_of_students)){
    errors.number_of_students = TT.t('not_a_number')
  }

  if (values.period && isNaN(values.period)){
    errors.period = TT.t('not_a_number')
  }

  if (values.tuition_fee && isNaN(values.tuition_fee)){
    errors.tuition_fee = TT.t('not_a_number')
  }

  return errors
}