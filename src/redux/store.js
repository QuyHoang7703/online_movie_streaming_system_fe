import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slides/authSlice";
import { rootApi } from "@service/rootApi";
import storage from "redux-persist/lib/storage"; // localStorage
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import { logoutMiddleware } from "./middlewares";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [rootApi.reducerPath],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  }),
);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logoutMiddleware, rootApi.middleware);
  },
});

export const persistor = persistStore(store);
