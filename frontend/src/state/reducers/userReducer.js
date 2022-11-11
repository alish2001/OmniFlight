import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userid: null,
    first_name: null,
    last_name: null,
    email: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.userid = action.payload.userid;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state = this.initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
