import {validateMandatoryField, validatePassword} from "./CommonValidator";

export const validate = (values) => {
  const errors = {}
  validateMandatoryField('current_password', values.current_password, 'current_password_required', errors);

  validateMandatoryField('password', values.password, 'password_required', errors);
  validatePassword(values.password, values.password_confirmation, 'password', errors);

  validateMandatoryField('password_confirmation', values.password_confirmation, 'password_confirmation_required', errors);

  return errors
}