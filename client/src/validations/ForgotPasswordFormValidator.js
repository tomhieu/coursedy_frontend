import {TT} from 'utils/locale'
import Network from 'utils/network'
import {validateEmail} from "./CommonValidator";

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
  return errors
}
