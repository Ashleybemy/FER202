// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users/usersSlice";
import paymentsReducer from "./payments/paymentsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    payments: paymentsReducer,
  },
});
