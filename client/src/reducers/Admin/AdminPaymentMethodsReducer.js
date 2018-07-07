import * as asyncActs from "../../actions/AsyncActionCreator";
import {TT} from "utils/locale";
let enrollErrorMessages;
const AdminPaymentMethodsReducer = (state = {
  paymentSettings: {
    manual: false,
    paypal: false,
    visa: false
  },
  paymentIntegrations: {
    stripe_api_key: '',
  },
  bankAccounts: [],
  isLoading: false,
  errors: []
}, action) => {
  switch (action.type) {
    //Reducer for payment settings
    case asyncActs.FETCH_ADMIN_PAYMENT_SETTINGS + asyncActs.PENDING:
      return {...state, isLoading: true}
    case asyncActs.FETCH_ADMIN_PAYMENT_SETTINGS + asyncActs.FULFILLED:
      return {
        ...state, 
        paymentSettings: action.payload.reduce((paymentSettings, item) => {
           paymentSettings[item.payment_method] = item.status
           return paymentSettings
         }, {}),
        isLoading: false
      }
    case asyncActs.FETCH_ADMIN_PAYMENT_SETTINGS + asyncActs.REJECTED:
      enrollErrorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
        errors : [TT.t('fetch_course_fail')];
      return {...state,  errors: enrollErrorMessages, isLoading: false}

    //Reducer for payment integrations
    case asyncActs.FETCH_ADMIN_PAYMENT_INTEGRATIONS + asyncActs.PENDING:
      return {...state, isLoading: true}
    case asyncActs.FETCH_ADMIN_PAYMENT_INTEGRATIONS + asyncActs.FULFILLED:
      return {
        ...state, 
        paymentIntegrations: action.payload,//
        isLoading: false
      }
    case asyncActs.FETCH_ADMIN_PAYMENT_INTEGRATIONS + asyncActs.REJECTED:
      enrollErrorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
        errors : [TT.t('fetch_course_fail')];
      return {...state,  errors: enrollErrorMessages, isLoading: false}

    //Reducer for bank accounts
    case asyncActs.FETCH_ADMIN_BANK_ACCOUNTS + asyncActs.PENDING:
      return {...state, isLoading: true}
    case asyncActs.FETCH_ADMIN_BANK_ACCOUNTS + asyncActs.FULFILLED:
      return {
        ...state, 
        bankAccounts: action.payload,//
        isLoading: false
      }
    case asyncActs.FETCH_ADMIN_BANK_ACCOUNTS + asyncActs.REJECTED:
      enrollErrorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
        errors : [TT.t('fetch_course_fail')];
      return {...state,  errors: enrollErrorMessages, isLoading: false}


    default:
      return state;
    }
};

export default AdminPaymentMethodsReducer;
