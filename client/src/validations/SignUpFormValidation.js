import {TT} from '../utils/locale'
import Network from '../utils/network'
import {validateEmail, validateMandatoryField, validatePassword} from "./CommonValidator";

export const asyncValidate = (values) => {
  return Network().get(`validate_email?email=${values.email}`).then((response) => {
    if (!response.valid) {
      throw { email: TT.t('email_taken') };
    }
  })
}

export const validate = (values) => {
  const errors = {}

  validateMandatoryField('role', values.role, 'role_required', errors);
  validateMandatoryField('first_name', values.first_name, 'first_name_required', errors);
  validateEmail('email', values.email, errors);
  validatePassword(values.password, values.password_confirmation, 'password', errors);

  if (!values.phone_number) {
    errors.phone_number = TT.t('phone_number_required')
  } else if (!/^\d*$/i.test(values.phone_number)) {
    errors.phone_number = TT.t('invalid_phone_number')
  }

  return errors
}