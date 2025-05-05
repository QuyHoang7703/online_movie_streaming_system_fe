import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  // accessToken: null,
  // refreshToken: null,
  userInfo: null,
  lastForgotPasswordRequests: {}, // Object lưu theo email
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: () => {
      return initialState;
    },
    setLastForgotPasswordRequest: (state, action) => {
      const { email, timestamp } = action.payload;
      state.lastForgotPasswordRequests[email] = timestamp;
    },
  },
});

// Tự động tạo ra các action create khi định nghĩa reducers
export const { saveUserInfo, logout, setLastForgotPasswordRequest } =
  authSlice.actions;
export default authSlice.reducer;
