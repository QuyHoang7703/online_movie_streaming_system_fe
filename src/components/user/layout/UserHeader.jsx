import { Badge, Button, Input, Layout } from "antd";
import {
  BellFilled,
  HeartFilled,
  HeartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CategoryDropdown from "@components/common/CategoryDropdown";
import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "@hooks/useLogout";
import UserDropdown from "@components/UserDropdown";
import { useGetCountriesQuery } from "@service/admin/countryApi";
import { useGetAllGenresQuery } from "@service/admin/genresApi";
import { useLoading } from "@context/LoadingContext";
import { COUNTRY_NAME_MAP } from "@consts/countryNameMap";
import InputSearch from "@components/common/InputSearch";
import NotificationDropdown from "@components/common/NotificationDropdown";
const { Header } = Layout;

// Dữ liệu mẫu cho thể loại và quốc gia đã được thay thế bằng API calls

const UserHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lưu trữ thể loại và quốc gia đã chọn
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const { handleLogout } = useLogout();
  const menu = [
    {
      key: "1",
      label: "Cài đặt tài khoản",
      icon: <SettingOutlined />,
      onClick: () => navigate("/user/profile/info"),
    },
    {
      key: "2",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  if (userInfo && userInfo.role === "USER") {
    menu.push({
      key: "3",
      label: "Yêu thích",
      icon: <HeartOutlined />,
      onClick: () => navigate("/user/profile/favorite-movies"),
    });
    menu.push({
      key: "4",
      label: "Lịch sử mua hàng",
      icon: <HistoryOutlined />,
      onClick: () => navigate("/user/profile/subscription-orders"),
    });
  }

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

  const { data: countriesResponse, isLoading: isCountryLoading } =
    useGetCountriesQuery();
  const { data: genresResponse, isLoading: isGenreLoading } =
    useGetAllGenresQuery();

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (isGenreLoading || isCountryLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isGenreLoading, isCountryLoading, showLoading, hideLoading]);

  // Cập nhật lựa chọn từ URL
  useEffect(() => {
    const genre = searchParams.get("genre");
    const country = searchParams.get("country");

    if (genre) {
      setSelectedGenre(genre);
    }

    if (country) {
      setSelectedCountry(country);
    }
  }, [searchParams]);

  // Handle genre selection - chỉ chọn một
  const handleGenreClick = (item) => {
    const params = new URLSearchParams(searchParams);

    // Nếu giống với thể loại đã chọn, bỏ chọn
    if (selectedGenre === item.value) {
      setSelectedGenre("");
      params.delete("genre");
    } else {
      // Nếu là thể loại mới, thay thế thể loại cũ và xóa quốc gia
      setSelectedGenre(item.value);
      setSelectedCountry(""); // Clear country selection
      params.delete("genre");
      params.delete("country"); // Clear country param
      params.append("genre", item.value);
    }

    navigate(`/phim?${params.toString()}`, { state: { fromUrl: true } });
  };

  // Handle country selection - chỉ chọn một
  const handleCountryClick = (item) => {
    const params = new URLSearchParams(searchParams);

    // Nếu giống với quốc gia đã chọn, bỏ chọn
    if (selectedCountry === item.value) {
      setSelectedCountry("");
      params.delete("country");
    } else {
      // Nếu là quốc gia mới, thay thế quốc gia cũ và xóa thể loại
      setSelectedCountry(item.value);
      setSelectedGenre(""); // Clear genre selection
      params.delete("country");
      params.delete("genre"); // Clear genre param
      params.append("country", item.value);
    }

    navigate(`/phim?${params.toString()}`, { state: { fromUrl: true } });
  };

  // Handle search
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set("q", searchValue.trim());
      navigate(`/phim?${params.toString()}`);
    }
  };

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

      <InputSearch onKeyDown={handleSearch} />
      <nav className="ml-9 hidden lg:block">
        <ul className="m-0 flex list-none gap-8 p-0 font-medium">
          <li>
            <CategoryDropdown
              title="Thể loại"
              filterType="genre"
              items={(genresResponse?.data || []).map((genre) => ({
                label: genre.name,
                value: genre.name,
                link: `/the-loai/${genre.name}`,
                isSelected: selectedGenre === genre.name,
              }))}
              onItemClick={handleGenreClick}
            />
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
            <CategoryDropdown
              title="Quốc gia"
              filterType="country"
              items={(countriesResponse?.data || []).map((country) => ({
                label: COUNTRY_NAME_MAP[country.name],
                value: country.name,
                link: `/quoc-gia/${country.name}`,
                isSelected: selectedCountry === country.name,
              }))}
              onItemClick={handleCountryClick}
            />
          </li>
          <li>
            <Link
              to="/dien-vien"
              className="whitespace-nowrap text-white transition-colors duration-200 hover:text-mainColor"
            >
              Diễn viên
            </Link>
          </li>
        </ul>
      </nav>

      {userInfo ? (
        <div className="ml-auto flex items-center gap-7">
          <Link to="/user/subscription-plan">
            <Button
              type="primary"
              className="p-4 font-semibold text-dark-200 hover:!text-dark-300"
            >
              Đăng ký gói
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            {/* <Badge count={5} size="small" offset={[-2, 2]}>
              <BellFilled className="cursor-pointer text-2xl text-blue-500" />
            </Badge> */}
            <NotificationDropdown />
            <UserDropdown menuItems={menu} />
          </div>
        </div>
      ) : (
        <div className="ml-auto">
          <Button
            icon={<UserOutlined />}
            type="primary"
            className="text-dark-200 hover:!text-dark-300"
            // className="!flex !h-8 !items-center !justify-center !rounded !border-mainColor !bg-transparent !px-4 !text-mainColor hover:!border-mainColor hover:!bg-mainColor/10 hover:!text-mainColor"
          >
            <Link
              to="/login"
              state={{ fromUrl: location.pathname + location.search }}
            >
              Đăng nhập
            </Link>
          </Button>
        </div>
      )}
    </Header>
  );
};
export default UserHeader;
