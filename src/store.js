/* eslint-disable no-unused-vars */
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createAt: "",
};

const ACCOUNT_ACTION_TYPES = {
  DEPOSIT: "account/deposit",
  WITHDRAWAL: "account/withdrawal",
  REQUEST_LOAN: "account/requestLoan",
  PAY_LOAN: "account/payLoan",
};

const CUSTOMER_ACTION_TYPES = {
  CREATE_CUSTOMER: "customer/createCustomer",
  UPDATE_CUSTOMER_NAME: "customer/updateCustomer",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case ACCOUNT_ACTION_TYPES.DEPOSIT:
      return { ...state, balance: state.balance + action.payload };
    case ACCOUNT_ACTION_TYPES.WITHDRAWAL:
      return { ...state, balance: state.balance - action.payload };
    case ACCOUNT_ACTION_TYPES.REQUEST_LOAN:
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case ACCOUNT_ACTION_TYPES.PAY_LOAN:
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case CUSTOMER_ACTION_TYPES.CREATE_CUSTOMER:
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case CUSTOMER_ACTION_TYPES.UPDATE_CUSTOMER_NAME:
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

// ROOT REDUCER
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// ACTION FUNCTIONS
function deposit(amount) {
  return { type: ACCOUNT_ACTION_TYPES.DEPOSIT, payload: amount };
}

function withdrawal(amount) {
  return { type: ACCOUNT_ACTION_TYPES.WITHDRAWAL, payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: ACCOUNT_ACTION_TYPES.REQUEST_LOAN,
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: ACCOUNT_ACTION_TYPES.PAY_LOAN };
}

function createCustomer(fullName, nationalID) {
  return {
    type: CUSTOMER_ACTION_TYPES.CREATE_CUSTOMER,
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return {
    type: CUSTOMER_ACTION_TYPES.UPDATE_CUSTOMER_NAME,
    payload: fullName,
  };
}

store.dispatch(createCustomer("Nick Neessen", "32513215"));
console.log(store.getState());

store.dispatch(requestLoan(1000000));
console.log(store.getState());
