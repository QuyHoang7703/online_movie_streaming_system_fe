import { Badge, Button, Input, Layout } from "antd";
import {
  BellFilled,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CategoryDropdown from "@components/common/CategoryDropdown";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "@hooks/useLogout";
import UserDropdown from "@components/UserDropdown";
const { Header } = Layout;

// Dữ liệu mẫu cho thể loại
const genreItems = [
  { label: "Anime", link: "/the-loai/anime" },
  { label: "Bí Ẩn", link: "/the-loai/bi-an" },
  { label: "Chiến Tranh", link: "/the-loai/chien-tranh" },
  { label: "Chiếu Rạp", link: "/the-loai/chieu-rap" },
  { label: "Chuyện Thế", link: "/the-loai/chuyen-the" },
  { label: "Chính Kịch", link: "/the-loai/chinh-kich" },
  { label: "Chính Luận", link: "/the-loai/chinh-luan" },
  { label: "Chính Trị", link: "/the-loai/chinh-tri" },
  { label: "Cổ Trang", link: "/the-loai/co-trang" },
  { label: "Cố Tích", link: "/the-loai/co-tich" },
  { label: "Cố Điển", link: "/the-loai/co-dien" },
  { label: "DC", link: "/the-loai/dc" },
  { label: "Gia Đình", link: "/the-loai/gia-dinh" },
  { label: "Giả Tưởng", link: "/the-loai/gia-tuong" },
  { label: "Hài", link: "/the-loai/hai" },
  { label: "Hành Động", link: "/the-loai/hanh-dong" },
];

// Dữ liệu mẫu cho quốc gia
const countryItems = [
  { label: "Việt Nam", link: "/quoc-gia/viet-nam" },
  { label: "Mỹ", link: "/quoc-gia/my" },
  { label: "Hàn Quốc", link: "/quoc-gia/han-quoc" },
  { label: "Nhật Bản", link: "/quoc-gia/nhat-ban" },
  { label: "Trung Quốc", link: "/quoc-gia/trung-quoc" },
  { label: "Thái Lan", link: "/quoc-gia/thai-lan" },
  { label: "Ấn Độ", link: "/quoc-gia/an-do" },
  { label: "Anh", link: "/quoc-gia/anh" },
  { label: "Pháp", link: "/quoc-gia/phap" },
  { label: "Canada", link: "/quoc-gia/canada" },
];

const UserHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log({ userInfo });
  const { handleLogout } = useLogout();
  const menu = [
    {
      key: "1",
      label: "Cài đặt tài khoản",
      icon: <SettingOutlined />,
    },
    {
      key: "2",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  // Theo dõi scroll và cập nhật trạng thái
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <Header
      className={`fixed left-0 right-0 top-0 z-50 flex h-16 items-center px-5 py-10 transition-all duration-300 ${
        scrolled
          ? "bg-[#1a1d29]/95 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <Link to="/">
        <div className="mr-6">
          <img src="/emovie-logo.png" alt="emovie-logo" className="h-[20px]" />
        </div>
      </Link>
      <Input
        placeholder="Tìm kiếm phim, diễn viên"
        className="!w-1/4 !rounded !border-none !bg-[#323D4E] !px-3 !py-2 font-medium !text-white"
        prefix={<SearchOutlined className="text-white/70" />}
      />
      <nav className="ml-9 hidden lg:block">
        <ul className="m-0 flex list-none gap-8 p-0 font-medium">
          <li>
            <CategoryDropdown title="Thể loại" items={genreItems} />
          </li>
          <li>
            <a
              href="/phim-le"
              className="whitespace-nowrap text-white transition-colors duration-200 hover:text-mainColor"
            >
              Phim lẻ
            </a>
          </li>
          <li>
            <a
              href="/phim-bo"
              className="whitespace-nowrap text-white transition-colors duration-200 hover:text-mainColor"
            >
              Phim bộ
            </a>
          </li>
          <li>
            <CategoryDropdown title="Quốc gia" items={countryItems} />
          </li>
          <li>
            <a
              href="/dien-vien"
              className="whitespace-nowrap text-white transition-colors duration-200 hover:text-mainColor"
            >
              Diễn viên
            </a>
          </li>
        </ul>
      </nav>

      {userInfo ? (
        <div className="ml-auto flex items-center gap-3">
          <Badge count={5} size="small" offset={[-2, 2]}>
            <BellFilled className="cursor-pointer text-2xl text-blue-500" />
          </Badge>
          <UserDropdown menuItems={menu} />
        </div>
      ) : (
        <div className="ml-auto">
          <Button
            icon={<UserOutlined />}
            type="primary"
            className="text-dark-200 hover:!text-dark-300"
            // className="!flex !h-8 !items-center !justify-center !rounded !border-mainColor !bg-transparent !px-4 !text-mainColor hover:!border-mainColor hover:!bg-mainColor/10 hover:!text-mainColor"
          >
            <Link to="/login">Đăng nhập</Link>
          </Button>
        </div>
      )}
    </Header>
  );
};
export default UserHeader;
