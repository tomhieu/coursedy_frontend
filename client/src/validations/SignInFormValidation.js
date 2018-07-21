import {TT} from 'utils/locale'
import Network from 'utils/network'
import {validateEmail, validateMandatoryField} from "./CommonValidator";

export const asyncValidate = (values) => {
  return Network().get(`validate_email?email=${values.email}`).then((response) => {
    if (!response.valid) {
      throw { email: TT.t('email_taken') };
    }
  })
}

export const validate = (values) => {
  const errors = {}

  validateEmail('email', values.email, errors);
  validateMandatoryField('password', values.password, 'password_required', errors);
  return errors
}
