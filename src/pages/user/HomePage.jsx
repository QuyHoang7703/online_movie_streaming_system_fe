import { Layout } from "antd";
import UserHeader from "@components/user/layout/UserHeader";
import FeatureMovie from "@components/user/movie/FeatureMovie";
import HotMovieByCountry from "@components/user/movie/HotMovieByCountry";
import HotStandAloneMovie from "@components/user/movie/HotStandAloneMovie";
const { Content } = Layout;

// Dữ liệu mẫu cho phim Hàn Quốc
const koreanMovies = [
  {
    id: 1,
    title: "Người Hùng Yếu Đuối",
    englishTitle: "Weak Hero Class",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "8",
    episodes: "8",
    quality: "4K",
  },
  {
    id: 2,
    title: "Chuyến Đời Bác Sĩ Nội Trú",
    englishTitle: "Resident Playbook",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "8",
    episodes: "8",
  },
  {
    id: 3,
    title: "Bảo Hiểm Ly Hôn",
    englishTitle: "The Divorce Insurance",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "11",
    episodes: "8",
  },
  {
    id: 4,
    title: "Cung Điện Ma Ám",
    englishTitle: "The Haunted Palace",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "6",
    episodes: "4",
  },
  {
    id: 5,
    title: "Đẹp Hơn Thiên Đường",
    englishTitle: "Heavenly Ever After",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "6",
    episodes: "4",
  },
  {
    id: 6,
    title: "Nữ Hoàng Nước Mắt",
    englishTitle: "The Queen of Tears",
    poster:
      "https://www.themoviedb.org/t/p/w1280/xRw3akJQdfgqx0x4fiHW7nIkEUJ.jpg",
    subtitled: "16",
    episodes: "16",
  },
  {
    id: 7,
    title: "Dưới Những Tán Hoa",
    englishTitle: "Under the Flowers",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "12",
    episodes: "12",
  },
  {
    id: 8,
    title: "Chuyện Ma Trưa 12 Giờ",
    englishTitle: "Midnight Horror Story",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "8",
    episodes: "8",
  },
  {
    id: 9,
    title: "Dạ Điểu",
    englishTitle: "Nightbird",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "6",
    episodes: "6",
  },
  {
    id: 10,
    title: "Truy Bắt Sát Nhân",
    englishTitle: "A Killer Paradox",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "8",
    episodes: "8",
  },
];

// Dữ liệu mẫu phim Trung Quốc
const chineseMovies = [
  {
    id: 11,
    title: "Hoài Thủy Trúc Đinh",
    englishTitle: "Love in Pavilion",
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/AbkZUxhgq5nLrMHuipmXpKNlqDE.jpg",
    subtitled: "22",
    episodes: "22",
  },
  {
    id: 12,
    title: "Mưa Hoa Rơi Gặp Lại Chàng",
    englishTitle: "Love Never Fails",
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/nTPFkLUARmo1bYHfkfdNyCE3LiI.jpg",
    subtitled: "17",
  },
  {
    id: 13,
    title: "Danh Bất Hư Truyền",
    englishTitle: "He Kills It",
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/rUKcCHC7j3t2YqXqywy0XGChVJL.jpg",
    subtitled: "22",
  },
  {
    id: 14,
    title: "Bằng Thượng Giai Tế",
    englishTitle: "Serendipity",
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/9eSoJrj8LkbUzuPUgQTY5EXzCyD.jpg",
    subtitled: "22",
  },
  {
    id: 15,
    title: "Tôi Là Triệu Giáp Đệ: Phong Mang",
    englishTitle: "The Rise of Zhao Jiaodi",
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/vZ5U5X6BF3aD15F4B1jcSSvFdFq.jpg",
    subtitled: "13",
  },
  {
    id: 16,
    title: "Phong Khởi Lạc Dương",
    englishTitle: "Wind Rises in Luoyang",
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/2Wf5ySuUXXwXBJoStpuYHPTXRzu.jpg",
    subtitled: "24",
  },
  {
    id: 17,
    title: "Trường An Như Cố",
    englishTitle: "The Eternal Love",
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/79UovXztD64EUVPCTkOmsgXPTcE.jpg",
    subtitled: "24",
  },
  {
    id: 18,
    title: "Bạch Lộc",
    englishTitle: "One and Only",
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/9wHJwm6gYcCpxXZqxYrjdDJMBXZ.jpg",
    subtitled: "24",
  },
];

const HomePage = () => {
  return (
    <Layout className="min-h-screen bg-dark-400">
      <UserHeader />
      <Content className="mx-auto max-w-full lg:max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px]">
        {/* Feature movie */}
        <FeatureMovie />

        {/* Phân loại phim theo quốc gia */}
        <div className="mt-3 px-2 sm:px-4 md:px-6">
          <div className="rounded-lg border border-gray-700 bg-dark-300 p-3 sm:p-4 md:p-5">
            {/* Phim Hàn Quốc Mới */}
            <HotMovieByCountry
              title="Phim Hàn Quốc mới"
              movies={koreanMovies}
              viewAllLink="/quoc-gia/han-quoc"
            />

            {/* Phim Trung Quốc Mới */}
            {/* <HotMovieByCountry
              title="Phim Trung Quốc mới"
              movies={chineseMovies}
              viewAllLink="/quoc-gia/trung-quoc"
            /> */}
          </div>
        </div>
        {/* Top 10 phim bộ */}
        <div>
          <HotStandAloneMovie
            movies={koreanMovies}
            title="Top 10 phim bộ hôm nay"
          />
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;
