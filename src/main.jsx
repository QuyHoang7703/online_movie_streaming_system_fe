import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import { App as AntdApp } from "antd";
import { PersistGate } from "redux-persist/integration/react";
import AppProvider from "@components/AppProvider";
import "@styles/styles.css";
import { LoadingProvider } from "@context/LoadingContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <AuthProvider>
        <LoadingProvider>
          {/* <React.StrictMode> */}
          <AppProvider>
            <AntdApp>
              <RouterProvider router={router} />
            </AntdApp>
          </AppProvider>
          {/* </React.StrictMode> */}
        </LoadingProvider>
      </AuthProvider>
    </PersistGate>
  </Provider>,
);
