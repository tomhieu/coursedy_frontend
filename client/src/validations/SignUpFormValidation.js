import { TT } from '../utils/locale';
import Network from '../utils/network';
import { validateEmail, validateMandatoryField, validatePassword } from './CommonValidator';

export const asyncValidate = (values) => {
  return Network().get(`validate_email?email=${values.email}`).then((response) => {
    if (!response.valid) {
      throw { email: TT.t('email_taken') };
    }
  });
};

export const validate = (values) => {
  const errors = {};

  validateMandatoryField('role', values.role, 'role_required', errors);
  validateMandatoryField('name', values.name, 'name_required', errors);
  validateEmail('email', values.email, errors);
  validatePassword(values.password, values.password_confirmation, 'password', errors);

  if (!values.phone_number) {
    errors.phone_number = TT.t('phone_number_required')
  } else if (!/^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,4}$/i.test(values.phone_number)) {
    errors.phone_number = TT.t('invalid_phone_number')
  }

  return errors;
};
