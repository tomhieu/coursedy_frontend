import {TT} from "utils/locale";
import {validateEmail, validateMandatoryField, validatePassword} from "./CommonValidator";

export const validate = (values) => {
    const errors = {}
    validateMandatoryField('firstName', values.firstName, 'first_name_required', errors);
    validateMandatoryField('lastName', values.lastName, 'last_name_required', errors);

    validateEmail('email', values.email, errors);
    validateMandatoryField('birthDate', values.birthDate, 'birthdate_required', errors);
    validateMandatoryField('address', values.address, 'address_required', errors);

    return errors
}