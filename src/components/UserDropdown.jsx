import {
  BellOutlined,
  CaretDownFilled,
  DownCircleOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Image } from "antd";
import { useSelector } from "react-redux";

const UserDropdown = ({ menuItems }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log({ userInfo });
  return (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
      <div className="flex cursor-pointer items-center gap-2 px-4 py-2">
        <Avatar
          src={userInfo?.avatarUrl || null}
          alt="avatar"
          size="large"
          style={{ backgroundColor: "#1890ff" }}
          className="text-white"
        >
          {!userInfo?.avatarUrl && userInfo?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <CaretDownFilled className="ml-2 text-white" size={20} />
      </div>
    </Dropdown>
  );
};
export default UserDropdown;
