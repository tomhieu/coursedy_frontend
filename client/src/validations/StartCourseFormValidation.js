import moment from 'moment';
import { TT } from '../utils/locale';

export const validate = (values) => {
  const errors = {};

  if (!values) {
    return errors;
  }

  const start_date = moment(values.start_date, 'DD/MM/YYYY');
  const now = moment();

  if (!values.start_date) {
    errors.start_date = TT.t('start_date_required');
  } else if (values.start_date && start_date == null) {
    errors.start_date = TT.t('invalid_start_date');
  }
  return errors;
};
