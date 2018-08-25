import { TT } from 'utils/locale';

export const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = TT.t('section_title_required');
  }

  return errors;
};
