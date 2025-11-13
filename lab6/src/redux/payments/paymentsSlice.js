// src/redux/payments/paymentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createPayment = createAsyncThunk(
  "payments/create",
  async (payload) => {
    // FAKE API RESPONSE
    return {
      id: Date.now(),
      amount: payload.amount,
      method: payload.method,
      status: "SUCCESS",
    };
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
      })
      .addCase(createPayment.rejected, (state) => {
        state.isLoading = false;
        state.error = "Payment failed";
      });
  },
});

export default paymentsSlice.reducer;
