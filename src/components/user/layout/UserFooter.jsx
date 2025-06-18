// import {
//   TelegramOutlined,
//   DiscordOutlined,
//   TwitterOutlined,
//   FacebookOutlined,
//   YoutubeOutlined,
//   InstagramOutlined,
//   LineOutlined,
// } from "@ant-design/icons";

import { Facebook, Instagram, Telegram, Twitter } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Link } from "react-router-dom";

const UserFooter = () => {
  return (
    <footer className="mt-5 bg-dark-300 px-3 py-5 text-white">
      <div className="ml-5 max-w-6xl">
        {/* Logo Section */}
        <div className="mb-5 flex gap-5 py-4">
          <Link to="/">
            <img src="/emovie-logo.png" alt="EMovie" className="mr-3 h-6" />
          </Link>
          <div className="flex gap-5">
            <Link to="/#" className="text-gray-400 transition-colors">
              <Telegram />
            </Link>
            <Link to="/#" className="text-gray-400 transition-colors">
              <Facebook />
            </Link>
            <Link to="/#" className="text-gray-400 transition-colors">
              <Twitter />
            </Link>
            <Link to="/#" className="text-gray-400 transition-colors">
              <Instagram />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-6 flex flex-wrap gap-6 text-sm">
          <Link
            to="/#"
            className="text-gray-400 transition-colors hover:text-yellow-400"
          >
            Hỏi đáp
          </Link>
          <Link
            to="/#"
            className="text-gray-400 transition-colors hover:text-yellow-400"
          >
            Chính sách bảo mật
          </Link>
          <Link
            to="/#"
            className="text-gray-400 transition-colors hover:text-yellow-400"
          >
            Điều khoản sử dụng
          </Link>
          <Link
            to="/#"
            className="text-gray-400 transition-colors hover:text-yellow-400"
          >
            Giới thiệu
          </Link>
          <Link
            to="/#"
            className="text-gray-400 transition-colors hover:text-yellow-400"
          >
            Liên hệ
          </Link>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="max-w-3xltext-sm leading-relaxed text-gray-400">
            EMovie - Trang xem phim online chất lượng cao miễn phí Vietsub,
            thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu
            rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc,
            Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá
            nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
          </p>
        </div>

        {/* Copyright */}
        <div className="w-[100%] border-t border-gray-700 pt-4">
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-400">
            © 2024 EMovie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
