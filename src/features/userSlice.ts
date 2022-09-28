import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/users/User";

interface userState {
  user: User | null;
}

const initialState: userState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: userState) => state.user?.user;

export default userSlice.reducer;
