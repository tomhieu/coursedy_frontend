import { validateEmail, validateMandatoryField, validatePassword } from './CommonValidator';

export const validate = (values) => {
  const errors = {};
  validateMandatoryField('name', values.name, 'first_name_required', errors);

  validateEmail('email', values.email, errors);
  return errors;
};
