// src/redux/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  // FAKE API — luôn trả về dữ liệu đúng
  return [
    { id: 1, name: "Alice", isAdmin: false },
    { id: 2, name: "Bob", isAdmin: true },
  ];
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    toggleAdmin(state, action) {
      const id = action.payload;
      const user = state.list.find((u) => u.id === id);
      if (user) user.isAdmin = !user.isAdmin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.error = "Fetch failed";
      });
  },
});

export const { toggleAdmin } = usersSlice.actions;
export default usersSlice.reducer;
