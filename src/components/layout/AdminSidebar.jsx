import {
  CommentOutlined,
  DollarOutlined,
  FileTextOutlined,
  GiftOutlined,
  HomeFilled,
  NotificationFilled,
  ProfileOutlined,
  TagsOutlined,
  UserOutlined,
  VideoCameraFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const menuItems = [
    {
      key: "1",
      icon: <HomeFilled />,
      label: "Trang chủ",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Người dùng",
    },
    {
      key: "3",
      icon: <VideoCameraFilled />,
      label: "Quản lý phim",
      children: [
        {
          key: "3-1",
          icon: <FileTextOutlined />,
          label: "Danh sách phim",
        },
        {
          key: "3-2",
          icon: <ProfileOutlined />,
          label: "Tập phim",
        },
        {
          key: "3-3",
          icon: <UserOutlined />,
          label: "Diễn viên",
        },
        {
          key: "3-4",
          icon: <TagsOutlined />,
          label: "Thể loại",
        },
      ],
    },
    {
      key: "4",
      icon: <DollarOutlined />,
      label: "Gói đăng ký",
    },
    {
      key: "5",
      icon: <NotificationFilled />,
      label: "Thông báo",
    },
    {
      key: "6",
      icon: <CommentOutlined />,
      label: "Bình luận",
    },
    {
      key: "7",
      icon: <GiftOutlined />,
      label: "Mã khuyến mãi",
    },
  ];
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg" // có thể là 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'
        onBreakpoint={(broken) => setCollapsed(broken)}
        className="min-h-screen !bg-[#273142]"
      >
        <div className="mb-5 flex items-center justify-center p-5">
          <img
            src="/emovie-logo.png"
            alt="emovie-logo"
            className={`h-[20px] transition-all duration-300 ${
              collapsed ? "w-[15px] object-cover object-left" : "w-auto"
            }`}
          />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="!bg-[#273142] !text-sm [&_.ant-menu-item-selected]:!text-black [&_.ant-menu-item]:!mb-3 [&_.ant-menu-submenu-title]:!mb-3 [&_.ant-menu-submenu]:!mb-3"
          // className="!bg-[#273142] !text-sm [&_.ant-menu-item-selected]:!bg-[#ECE000] [&_.ant-menu-item-selected]:!text-black [&_.ant-menu-item:hover]:!bg-[#ECE000]/80 [&_.ant-menu-item:hover]:!text-black [&_.ant-menu-item]:!mb-3 [&_.ant-menu-submenu-title]:!mb-3 [&_.ant-menu-submenu]:!mb-3"
          theme="dark"
          items={menuItems}
        />
      </Sider>
    </div>
  );
};
export default AdminSidebar;
