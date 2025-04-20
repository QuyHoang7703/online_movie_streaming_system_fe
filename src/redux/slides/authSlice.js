import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  // accessToken: null,
  // refreshToken: null,
  userInfo: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: () => {
      console.log("Logout action triggered in reducer");
      return initialState;
    },
  },
});

export const { saveUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
