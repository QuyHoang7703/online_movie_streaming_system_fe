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

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      {/* <React.StrictMode> */}
      <AppProvider>
        <AntdApp>
          <RouterProvider router={router} />
        </AntdApp>
      </AppProvider>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>,
);
