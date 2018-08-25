import moment from 'moment';
import { TT } from '../utils/locale';
import Network from '../utils/network';

export const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = TT.t('tutor_education_title_required');
  }

  if (!values.graduated_from) {
    errors.graduated_from = TT.t('tutor_education_graduated_from_required');
  }

  if (!values.start_date) {
    errors.start_date = TT.t('tutor_education_start_date_required');
  }

  if (!values.end_date) {
    errors.end_date = TT.t('tutor_education_end_date_required');
  }

  if (moment(values.end_date, 'DD/MM/YYYYY') < moment(values.start_date, 'DD/MM/YYYYY')) {
    errors.end_date = TT.t('tutor_education_start_and_end_date');
  }

  return errors;
};
