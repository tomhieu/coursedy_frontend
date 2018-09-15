import {validateEmail, validateMandatoryField} from './CommonValidator';

export const validate = (values) => {
  const errors = {};
  validateMandatoryField('name', values.name, 'first_name_required', errors);

  validateEmail('email', values.email, errors);
  validateMandatoryField('gender', values.gender, 'gender_required', errors);
  validateMandatoryField('country_code', values.country_code, 'country_required', errors);
  validateMandatoryField('address', values.address, 'address_required', errors);
  validateMandatoryField('date_of_birth', values.date_of_birth, 'date_of_birth_required', errors);
  return errors;
};
