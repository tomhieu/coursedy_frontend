import {TT} from '../utils/locale'
import Network from '../utils/network'

export const asyncValidate = (values) => {
  return Network().get(`validate_email?email=${values.email}`).then((response) => {
    if (!response.valid) {
      throw { email: TT.t('email_taken') };
    }
  })
}

export const validate = (values) => {
  const errors = {}

  if (!values.role) {
    errors.role = TT.t('role_required')
  }

  if (!values.first_name) {
    errors.first_name = TT.t('first_name_required')
  }

  if (!values.email) {
    errors.email = TT.t('registration_email_require')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = TT.t('invalid_email')
  }

  if (!values.password) {
    errors.password = TT.t('password_required')
  } else if (values.password.length < 8) {
    errors.password = TT.t('invalid_password')
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = TT.t('password_confirmation_required')
  } else if (values.password_confirmation != values.password) {
    errors.password_confirmation = TT.t('password_confirmation_not_match')
  }

  if (!values.phone_number) {
    errors.phone_number = TT.t('phone_number_required')
  } else if (!/^\d*$/i.test(values.phone_number)) {
    errors.phone_number = TT.t('invalid_phone_number')
  }

  return errors
}