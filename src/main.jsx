import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { App as AntdApp } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <AppProvider> */}
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
      {/* </AppProvider> */}
    </React.StrictMode>
  </Provider>,
);
