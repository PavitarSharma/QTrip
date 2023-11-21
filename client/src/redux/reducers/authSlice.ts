import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthState = {
  isAuth: boolean;
  token: null;
};

const initialState: AuthState = {
  isAuth: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
      state.isAuth = true;
    },

    logOut: () => initialState,
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const SelectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
