import {validateEmail, validateMandatoryField, validatePassword} from "./CommonValidator";

export const validate = (values) => {
    const errors = {}
    validateMandatoryField('firstName', values.firstName, 'first_name_required', errors);
    validateMandatoryField('lastName', values.lastName, 'first_name_required', errors);

    validateEmail('email', values.email, errors);
    validateMandatoryField('birthDate', values.birthDate, 'first_name_required', errors);
    validateMandatoryField('address', values.address, 'first_name_required', errors);
    return errors
}