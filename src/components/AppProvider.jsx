import { App as AntdApp, ConfigProvider } from "antd";
import { theme } from "@configs/ConfigAntd";

const AppProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={theme}
      // Các cấu hình khác
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
};

export default AppProvider;
