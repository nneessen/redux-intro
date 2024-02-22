/* eslint-disable no-unused-vars */
import { createStore } from "redux";

const initialState = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdrawal":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
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

const store = createStore(reducer);

// store.dispatch({ type: "account/deposit", payload: 100 });
// store.dispatch({ type: "account/withdrawal", payload: 100 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });

// console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdrawal(amount) {
  return { type: "account/withdrawal", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(12345));
store.dispatch(withdrawal(12345));
store.dispatch(requestLoan(10000, "Buy supplies for my business"));
store.dispatch(payLoan());
