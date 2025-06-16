import { Layout, Menu, Grid } from "antd";
import {
  ClockCircleOutlined,
  EyeOutlined,
  HeartFilled,
  HistoryOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useMemo } from "react";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const AccountManagePage = () => {
  const location = useLocation();
  const screens = useBreakpoint();

  const selectedKey = useMemo(() => {
    if (location.pathname.includes("favorite-movies")) return "2";
    if (location.pathname.includes("info")) return "1";
    if (location.pathname.includes("subscription-orders")) return "3";
    return "1";
  }, [location.pathname]);

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/user/profile/info">Thông tin tài khoản</Link>,
    },
    {
      key: "2",
      icon: <HeartFilled />,
      label: <Link to="/user/profile/favorite-movies">Yêu thích</Link>,
    },
    {
      key: "3",
      icon: <HistoryOutlined />,
      label: (
        <Link to="/user/profile/subscription-orders">Lịch sử giao dịch</Link>
      ),
    },
    {
      key: "4",
      icon: <EyeOutlined />,
      label: <Link to="/user/profile/history-view">Lịch sử xem phim</Link>,
    },
  ];

  return (
    <div className="mx-auto mt-24 w-full max-w-screen-2xl px-4 py-5 sm:px-6 md:px-10">
      {/* đổi từ Layout thành div flex-col nếu mobile */}
      <div className={`flex ${screens.md ? "flex-row" : "flex-col"} gap-5`}>
        <div
          className={`${
            screens.md ? "w-[250px]" : "w-full"
          } rounded-lg bg-dark-100 shadow-md`}
        >
          <div className="mb-5 flex items-center justify-center border-b p-5">
            <p className="text-lg font-bold text-gray-400">Quản lý tài khoản</p>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            className="!bg-dark-100 !text-sm [&_.ant-menu-item-selected]:!bg-mainColor/85 [&_.ant-menu-item-selected]:!text-white [&_.ant-menu-item]:!mb-3"
            theme="dark"
            items={menuItems}
          />
        </div>

        <div className="min-h-[600px] flex-1 rounded-lg bg-dark-400 px-4 py-5 sm:px-6 md:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountManagePage;
