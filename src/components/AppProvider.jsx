import { App as AntdApp, ConfigProvider } from "antd";
import { theme } from "@configs/ConfigAntd";

const AppProvider = ({ children }) => {
  return (
    <ConfigProvider theme={theme}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
};

export default AppProvider;
