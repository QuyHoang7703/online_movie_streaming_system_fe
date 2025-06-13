import {
  CommentOutlined,
  DollarOutlined,
  FileTextOutlined,
  GiftOutlined,
  HistoryOutlined,
  HomeFilled,
  NotificationFilled,
  ProfileOutlined,
  TagsOutlined,
  UserOutlined,
  VideoCameraFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const handleMenuClick = ({ key }) => {
    // Map key sang route tương ứng
    switch (key) {
      case "1":
        navigate("/admin/statistics");
        break;
      case "2":
        navigate("/admin/users");
        break;
      case "3-1":
        navigate("/admin/movies");
        break;
      case "3-2":
        navigate("/admin/actors");
        break;
      case "3-3":
        navigate("/admin/genres");
        break;

      case "4":
        navigate("/admin/subscription-plans");
        break;
      default:
        break;
    }
  };
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
          icon: <UserOutlined />,
          label: "Diễn viên",
        },
        {
          key: "3-3",
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
      icon: <HistoryOutlined />,
      label: "Lịch sử giao dịch",
    },
  ];
  return (
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
        onClick={handleMenuClick}
      />
    </Sider>
  );
};
export default AdminSidebar;
