import {TT} from '../utils/locale'
import moment from 'moment'

export const validate = (values) => {
  const errors = {}

  if (!values.title) {
    errors.title = TT.t('course_title_required')
  }

  const start_date = moment(values.start_date, 'DD/MM/YYYY');
  const now = moment();

  if (values.start_date && start_date == null) {
    errors.start_date = TT.t('invalid_start_date')
  } else if (values.start_date && start_date.diff(now) < 0) {
    errors.start_date = TT.t('start_date_less_now')
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

  if (!values.is_free && !values.tuition_fee) {
    errors.tuition_fee = TT.t('tuition_fee_mandatory')
  } else if (values.tuition_fee && isNaN(values.tuition_fee)){
    errors.tuition_fee = TT.t('not_a_number')
  } else {
    errors.tuition_fee = ''
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

  if (values.is_same_period) {
    if (!values.start_time) {
      errors.start_time = TT.t('teaching_start_time_per_week_madatory')
    }

    if (!values.end_time) {
      errors.end_time = TT.t('teaching_end_time_per_week_madatory')
    }

    if (values.start_time && values.end_time && values.start_time > values.end_time) {
      errors.start_time = TT.t('start_time_error');
      errors.end_time = TT.t('end_time_error');
    }
  } else {
    values.course_days.map(day => {
      const day_key = day.split('_')[0];
      if (!values[day + '_start_time']) {
        errors[day + '_start_time'] = TT.t('teaching_start_time_per_day_madatory', {date: TT.t(day_key)})
      }

      if (!values[day + '_end_time']) {
        errors[day + '_end_time'] = TT.t('teaching_end_time_per_day_madatory', {date: TT.t(day_key)})
      }

      if (values[day + '_start_time'] && values[day + '_end_time'] && values[day + '_start_time'] > values[day + '_end_time']) {
        errors[day + '_start_time'] = TT.t('start_time_error');
        errors[day + '_end_time'] = TT.t('end_time_error');
      }
    })
  }

  return errors
}