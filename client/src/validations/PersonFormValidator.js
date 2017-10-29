import {TT} from "utils/locale";
import {validateEmail, validateMandatoryField, validatePassword} from "./CommonValidator";

export const validate = (values) => {
    const errors = {}
    validateMandatoryField('firstName', values.first_name, errors);

    validateEmail('email', values.email, errors);

    validatePassword(values.password, values.password_confirmation, 'password', errors);

    if (!values.phone_number) {
        errors.phone_number = TT.t('phone_number_required')
    } else if (!/^\d*$/i.test(values.phone_number)) {
        errors.phone_number = TT.t('invalid_phone_number')
    }

    return errors
}