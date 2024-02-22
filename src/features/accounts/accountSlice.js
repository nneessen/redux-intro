/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
  isLoading: false,
};

const ACCOUNT_ACTION_TYPES = {
  DEPOSIT: "account/deposit",
  WITHDRAWAL: "account/withdrawal",
  REQUEST_LOAN: "account/requestLoan",
  PAY_LOAN: "account/payLoan",
  IS_LOADING: "account/convertingCurrency",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdrawal(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdrawal, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD")
    return { type: ACCOUNT_ACTION_TYPES.DEPOSIT, payload: amount };

  // MIDDLEWARE
  return async function (dispatch, getState) {
    dispatch({ type: ACCOUNT_ACTION_TYPES.IS_LOADING });
    // API call
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // return action
    dispatch({ type: ACCOUNT_ACTION_TYPES.DEPOSIT, payload: converted });
  };
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case ACCOUNT_ACTION_TYPES.DEPOSIT:
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case ACCOUNT_ACTION_TYPES.WITHDRAWAL:
//       return { ...state, balance: state.balance - action.payload };
//     case ACCOUNT_ACTION_TYPES.REQUEST_LOAN:
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case ACCOUNT_ACTION_TYPES.PAY_LOAN:
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case ACCOUNT_ACTION_TYPES.IS_LOADING:
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// // ACTION FUNCTIONS
// function deposit(amount, currency) {
//   if (currency === "USD")
//     return { type: ACCOUNT_ACTION_TYPES.DEPOSIT, payload: amount };

//   // MIDDLEWARE
//   return async function (dispatch, getState) {
//     dispatch({ type: ACCOUNT_ACTION_TYPES.IS_LOADING });
//     // API call
//     const host = "api.frankfurter.app";
//     const res = await fetch(
//       `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;

//     // return action
//     dispatch({ type: ACCOUNT_ACTION_TYPES.DEPOSIT, payload: converted });
//   };
// }

// function withdrawal(amount) {
//   return { type: ACCOUNT_ACTION_TYPES.WITHDRAWAL, payload: amount };
// }

// function requestLoan(amount, purpose) {
//   return {
//     type: ACCOUNT_ACTION_TYPES.REQUEST_LOAN,
//     payload: { amount, purpose },
//   };
// }

// function payLoan() {
//   return { type: ACCOUNT_ACTION_TYPES.PAY_LOAN };
// }

// export { deposit, withdrawal, payLoan, requestLoan };
