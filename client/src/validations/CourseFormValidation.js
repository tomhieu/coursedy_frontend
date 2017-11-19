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

  if (!values.start_date) {
    errors.start_date = TT.t('start_date_required')
  } else if (start_date.diff(now) < 0) {
    errors.start_date = TT.t('invalid_start_date')
  }

  if (!values.end_date) {
    errors.end_date = TT.t('end_date_required')
  } else if (end_date.diff(now) < 0) {
    errors.end_date = TT.t('invalid_end_date')
  }

  if (values.start_date && values.end_date && end_date.diff(start_date) < 0) {
    errors.end_date = TT.t('invalid_start_and_end_date')
  }

  if (!values.number_of_students) {
      errors.number_of_students = TT.t('num_student_mandatory')
  } else if (isNaN(values.number_of_students)){
    errors.number_of_students = TT.t('not_a_number')
  }

  if (!values.period) {
    errors.period = TT.t('period_mandatory')
  } else if (isNaN(values.period)){
    errors.period = TT.t('not_a_number')
  }

  if (!values.period_type) {
    errors.period_type = TT.t('period_type_mandatory')
  }

  if (!values.tuition_fee) {
    errors.tuition_fee = TT.t('tuition_fee_mandatory')
  } else if (isNaN(values.tuition_fee)){
    errors.tuition_fee = TT.t('not_a_number')
  }

  if (!values.currency) {
    errors.currency = TT.t('tuition_currency_mandatory')
  }

  if (!values.description) {
    errors.description = TT.t('course_description_mandatory')
  }

  if (!values.category_id) {
    errors.category_id = TT.t('category_mandatory')
  }

  if (!values.course_level_id) {
    errors.course_level_id = TT.t('course_level_mandatory')
  }

  return errors
}