import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slides/authSlice";
import { rootApi } from "@service/rootApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});
