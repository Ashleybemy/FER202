import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { logout } from "./authSlice";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (userId) => {
    const res = await api.get(`/expenses?userId=${userId}`);
    return res.data;
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (payload) => {
    const res = await api.post("/expenses", payload);
    return res.data;
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async (payload) => {
    const res = await api.put(`/expenses/${payload.id}`, payload);
    return res.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id) => {
    await api.delete(`/expenses/${id}`);
    return id;
  }
);


const expenseSlice = createSlice({
  name: "expenses",
  initialState: { list: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message || "Unable to load expenses. Please try again.";
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const idx = state.list.findIndex((n) => n.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.list = state.list.filter((x) => x.id !== action.payload);
      })
      .addCase(logout, (state) => {
        state.list = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export default expenseSlice.reducer;
