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
  debug: import.meta.env.DEV,
  serialize: true,
  writeFailHandler: (err) => {
    console.error("Redux Persist Write Error:", err);
  },
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
  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store, null, () => {
  console.log("Redux Persist: Store rehydrated");
});

persistor.subscribe(() => {
  const state = persistor.getState();
  if (state.bootstrapped) {
    console.log("Redux Persist: Bootstrap completed");
  }
});

if (import.meta.env.DEV) {
  console.log("Redux Store initialized:", store.getState());
}
