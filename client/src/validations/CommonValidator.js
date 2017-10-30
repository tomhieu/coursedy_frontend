import {TT} from "utils/locale";

export const validateMandatoryField = (field, fieldValue, messageKey, errors, params = {}) => {
    if (!fieldValue || fieldValue === '') {
        errors[field] = TT.t(messageKey, params)
    }
    return errors
}

export const validateEmail = (field, fieldValue, errors) => {
    if (!fieldValue) {
        errors[field] = TT.t('registration_email_require')
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fieldValue)) {
        errors[field] = TT.t('invalid_email')
    }
    return errors
}

export const validatePassword = (password, confirmedPass,field, errors) => {
    if (!password) {
        errors.password = TT.t('password_required')
    } else if (password.length < 8) {
        errors.password = TT.t('invalid_password')
    }

    if (!confirmedPass) {
        errors.password_confirmation = TT.t('password_confirmation_required')
    } else if (confirmedPass != password) {
        errors.password_confirmation = TT.t('password_confirmation_not_match')
    }
}