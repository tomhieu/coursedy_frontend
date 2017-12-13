import {TT} from '../utils/locale'
import {validateEmail} from "./CommonValidator";


export const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.start_date = TT.t('email_required')
  } else {
    validateEmail('email', values.email, errors);
  }
  return errors
}