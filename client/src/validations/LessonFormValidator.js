import { TT } from '../utils/locale';

export const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = TT.t('lesson_required');
  }

  if (!values.period) {
    errors.period = TT.t('lesson_priode_required');
  } else if (isNaN(values.period)) {
    errors.period = TT.t('not_a_number');
  }

  if (!values.description) {
    errors.description = TT.t('lesson_desc_required');
  }

  return errors;
};
