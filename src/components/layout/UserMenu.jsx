import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  PlayCircleOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const UserMenu = () => {
  const items = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: "movies",
      icon: <PlayCircleOutlined />,
      label: <Link to="/movies">Phim</Link>,
    },
    {
      key: "my-profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Hồ sơ của tôi</Link>,
    },
    {
      key: "favorites",
      icon: <HeartOutlined />,
      label: <Link to="/favorites">Phim yêu thích</Link>,
    },
  ];

  return <Menu theme="dark" mode="inline" items={items} />;
};

export default UserMenu;
