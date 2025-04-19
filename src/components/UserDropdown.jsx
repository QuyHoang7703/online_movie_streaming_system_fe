import {
  BellOutlined,
  CaretDownFilled,
  DownCircleOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Image } from "antd";

const UserDropdown = ({ menuItems }) => {
  return (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
      <div className="flex cursor-pointer items-center gap-2 px-4 py-2">
        <Avatar src="/google-logo.png" alt="avatar" size="medium" />
        <CaretDownFilled className="ml-2 text-white" size={20} />
      </div>
    </Dropdown>
  );
};
export default UserDropdown;
