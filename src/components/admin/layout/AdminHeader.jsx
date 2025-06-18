import {
  BellFilled,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import NotificationDropdown from "@components/common/NotificationDropdown";
import UserDropdown from "@components/UserDropdown";
import { useLogout } from "@hooks/useLogout";

import { Badge, Button, Input, Layout } from "antd";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;
const AdminHeader = ({ collapsed, setCollapsed }) => {
  const { handleLogout } = useLogout();
  const navigate = useNavigate();
  // const menu = [
  //   {
  //     key: "1",
  //     label: "Cài đặt tài khoản",
  //     icon: <SettingOutlined />,
  //   },
  //   {
  //     key: "2",
  //     label: "Đăng xuất",
  //     icon: <LogoutOutlined />,
  //     onClick: handleLogout,
  //   },
  // ];
  const menu = [
    {
      key: "1",
      label: "Cài đặt tài khoản",
      icon: <SettingOutlined />,
      onClick: () => navigate("/admin/profile/info"),
    },
    {
      key: "2",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <div>
      <Header className="flex items-center justify-between !bg-[#273142]">
        <div className="flex w-1/2 items-center gap-3">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="mr-3 !text-lg !text-white sm:text-xl"
          />
          {/* <Input
            placeholder="Tìm kiếm"
            className="ant-input !w-full bg-[#323D4E] p-2 !text-white"
            prefix={<SearchOutlined />}
          /> */}
        </div>
        {/* <div className="flex items-center gap-3">
          <Badge count={5} size="small" offset={[-2, 2]}>
            <BellFilled className="cursor-pointer text-2xl text-blue-500" />
          </Badge>
          <UserDropdown menuItems={menu} />
        </div> */}
        <div className="flex items-center gap-3">
          <NotificationDropdown />
          <UserDropdown menuItems={menu} />
        </div>
      </Header>
    </div>
  );
};
export default AdminHeader;
