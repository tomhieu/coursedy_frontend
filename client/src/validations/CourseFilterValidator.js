import * as commonUtils from 'utils/commonUtils';
import { TT } from '../utils/locale';

export const validate = (values) => {
  const errors = {};
  if (!commonUtils.isNumber(values.selectedMinFee)) {
    errors.selectedMinFee = TT.t('must_be_a_number');
  } else if (!commonUtils.isNumber(values.selectedMaxFee)) {
    errors.selectedMaxFee = 'must_be_a_number';
  }
  return errors;
};
