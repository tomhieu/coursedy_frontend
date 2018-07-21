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
  bankAccount: null,
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
    //Reducer for fetch bank account
    case asyncActs.FETCH_ADMIN_BANK_ACCOUNT + asyncActs.PENDING:
      return {...state, isLoading: true}
    case asyncActs.FETCH_ADMIN_BANK_ACCOUNT + asyncActs.FULFILLED:
      return {
        ...state, 
        bankAccount: action.payload
      }
    case asyncActs.FETCH_ADMIN_BANK_ACCOUNT + asyncActs.REJECTED:
      enrollErrorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
        errors : [TT.t('fetch_course_fail')];
      return {...state,  errors: enrollErrorMessages, isLoading: false}
    //Reducer for store bank account
    case asyncActs.STORE_ADMIN_BANK_ACCOUNT + asyncActs.PENDING:
      return state
    case asyncActs.STORE_ADMIN_BANK_ACCOUNT + asyncActs.FULFILLED:
      return {...state, bankAccounts: [
        ...state.bankAccounts, action.payload
      ]}
    case asyncActs.STORE_ADMIN_BANK_ACCOUNT + asyncActs.REJECTED:
      return state
    //Reducer for update bank account
    case asyncActs.UPDATE_ADMIN_BANK_ACCOUNT + asyncActs.PENDING:
      return state
    case asyncActs.UPDATE_ADMIN_BANK_ACCOUNT + asyncActs.FULFILLED:
      return {...state, bankAccounts: state.bankAccounts.map(item => {
        return item.id == action.payload.id ? action.payload : item
      })}
    case asyncActs.UPDATE_ADMIN_BANK_ACCOUNT + asyncActs.REJECTED:
      return state
    //Reducer for delete bank account
    case asyncActs.DELETE_ADMIN_BANK_ACCOUNT + asyncActs.PENDING:
      return state
    case asyncActs.DELETE_ADMIN_BANK_ACCOUNT + asyncActs.FULFILLED:
      return {...state, bankAccounts: state.bankAccounts.filter(item => {
        return item.id != action.payload.id
      })}
    case asyncActs.DELETE_ADMIN_BANK_ACCOUNT + asyncActs.REJECTED:
      return state

    case asyncActs.CLEAR_ADMIN_BANK_ACCOUNT:
      return {...state, bankAccount: null}

    default:
      return state;
    }
};

export default AdminPaymentMethodsReducer;
