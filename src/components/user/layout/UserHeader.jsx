import { Button, Input, Layout } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import CategoryDropdown from "@components/common/CategoryDropdown";
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
  return (
    <div>
      <Header className="sticky top-0 z-10 flex h-16 items-center bg-[#1a1d29] p-8 shadow-md">
        <div className="mr-6">
          <img src="/emovie-logo.png" alt="emovie-logo" className="h-[20px]" />
        </div>
        <Input
          placeholder="Tìm kiếm phim, diễn viên"
          className="!w-1/4 !rounded !border-none !bg-[#323D4E] !px-3 !py-2 font-medium !text-white"
          prefix={<SearchOutlined className="text-white/70" />}
        />
        <nav className="ml-9 hidden sm:block">
          <ul className="m-0 flex list-none gap-8 p-0 font-medium">
            <li>
              <CategoryDropdown title="Thể loại" items={genreItems} />
            </li>
            <li>
              <a
                href="/phim-le"
                className="text-white transition-colors duration-200 hover:text-mainColor"
              >
                Phim lẻ
              </a>
            </li>
            <li>
              <a
                href="/phim-bo"
                className="text-white transition-colors duration-200 hover:text-mainColor"
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
                className="text-white transition-colors duration-200 hover:text-mainColor"
              >
                Diễn viên
              </a>
            </li>
          </ul>
        </nav>
        <div className="ml-auto">
          <Button
            icon={<UserOutlined />}
            type="primary"
            className="text-dark-200"
            // className="!flex !h-8 !items-center !justify-center !rounded !border-mainColor !bg-transparent !px-4 !text-mainColor hover:!border-mainColor hover:!bg-mainColor/10 hover:!text-mainColor"
          >
            Đăng nhập
          </Button>
        </div>
      </Header>
    </div>
  );
};
export default UserHeader;
