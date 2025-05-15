import { Layout } from "antd";
import UserHeader from "@components/user/layout/UserHeader";
import FeatureMovie from "@components/user/movie/FeatureMovie";
import HotMovieByCountry from "@components/user/movie/HotMovieByCountry";
import HotMovieSection from "@components/user/movie/HotMovieSection";
const { Content } = Layout;

// Dữ liệu mẫu cho phim Hàn Quốc
const koreanMovies = [
  {
    movieId: 1,
    movieType: "SERIES",
    title: "Người Hùng Yếu Đuối",
    originalTitle: "Weak Hero Class",
    posterUrl:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    backdropUrl: null,
    voteAverage: 0,
    year: null,
    genres: [],
    videoVersions: [
      {
        id: 1,
        videoType: "VIETSUB",
        episodeCount: 8,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 8,
  },
  {
    movieId: 2,
    movieType: "SERIES",
    title: "Chuyến Đời Bác Sĩ Nội Trú",
    originalTitle: "Resident Playbook",
    posterUrl:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    backdropUrl: null,
    voteAverage: 0,
    year: null,
    genres: [],
    videoVersions: [
      {
        id: 2,
        videoType: "VIETSUB",
        episodeCount: 8,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 8,
  },
  {
    movieId: 3,
    movieType: "SERIES",
    title: "Bảo Hiểm Ly Hôn",
    originalTitle: "The Divorce Insurance",
    posterUrl:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    backdropUrl: null,
    voteAverage: 0,
    year: null,
    genres: [],
    videoVersions: [
      {
        id: 3,
        videoType: "VIETSUB",
        episodeCount: 11,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 8,
  },
  {
    movieId: 4,
    movieType: "SERIES",
    title: "Cung Điện Ma Ám",
    originalTitle: "The Haunted Palace",
    posterUrl:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    backdropUrl: null,
    voteAverage: 0,
    year: null,
    genres: [],
    videoVersions: [
      {
        id: 4,
        videoType: "VIETSUB",
        episodeCount: 6,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 4,
  },
  {
    movieId: 5,
    movieType: "SERIES",
    title: "Đẹp Hơn Thiên Đường",
    originalTitle: "Heavenly Ever After",
    posterUrl:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    backdropUrl: null,
    voteAverage: 0,
    year: null,
    genres: [],
    videoVersions: [
      {
        id: 5,
        videoType: "VIETSUB",
        episodeCount: 6,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 4,
  },
  {
    movieId: 6,
    movieType: "SERIES",
    title: "Nữ Hoàng Nước Mắt",
    originalTitle: "The Queen of Tears",
    posterUrl:
      "https://www.themoviedb.org/t/p/w1280/xRw3akJQdfgqx0x4fiHW7nIkEUJ.jpg",
    backdropUrl: null,
    voteAverage: 0,
    year: null,
    genres: [],
    videoVersions: [
      {
        id: 6,
        videoType: "VIETSUB",
        episodeCount: 16,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 16,
  },
  {
    movieId: 7,
    movieType: "SERIES",
    title: "Dưới Những Tán Hoa",
    originalTitle: "Under the Flowers",
    posterUrl:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    backdropUrl: null,
    voteAverage: 0,
    year: null,
    genres: [],
    videoVersions: [
      {
        id: 7,
        videoType: "VIETSUB",
        episodeCount: 12,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 12,
  },
  {
    movieId: 8,
    movieType: "SERIES",
    title: "Chuyện Ma Trưa 12 Giờ",
    originalTitle: "Midnight Horror Story",
    posterUrl:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    backdropUrl: null,
    voteAverage: 0,
    year: null,
    genres: [],
    videoVersions: [
      {
        id: 8,
        videoType: "VIETSUB",
        episodeCount: 8,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 8,
  },
  {
    movieId: 9,
    movieType: "SERIES",
    title: "Dạ Điểu",
    originalTitle: "Nightbird",
    posterUrl:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    backdropUrl: null,
    voteAverage: 0,
    year: null,
    genres: [],
    videoVersions: [
      {
        id: 9,
        videoType: "VIETSUB",
        episodeCount: 6,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 6,
  },
  {
    movieId: 10,
    movieType: "SERIES",
    title: "Truy Bắt Sát Nhân",
    originalTitle: "A Killer Paradox",
    posterUrl:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    backdropUrl: null,
    voteAverage: 0,
    year: null,
    genres: [],
    videoVersions: [
      {
        id: 10,
        videoType: "VIETSUB",
        episodeCount: 8,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 8,
  },
];

// Dữ liệu mẫu phim Trung Quốc
const chineseMovies = [
  {
    movieId: 11,
    movieType: "SERIES",
    title: "Hoài Thủy Trúc Đinh",
    originalTitle: "Love in Pavilion",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/AbkZUxhgq5nLrMHuipmXpKNlqDE.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2024,
    genres: [],
    videoVersions: [
      {
        id: 1,
        videoType: "VIETSUB",
        episodeCount: 22,
      },
      {
        id: 2,
        videoType: "VOICEOVER",
        episodeCount: 0,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 22,
  },
  {
    movieId: 12,
    movieType: "SERIES",
    title: "Mưa Hoa Rơi Gặp Lại Chàng",
    originalTitle: "Love Never Fails",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/nTPFkLUARmo1bYHfkfdNyCE3LiI.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2024,
    genres: [],
    videoVersions: [
      {
        id: 3,
        videoType: "VIETSUB",
        episodeCount: 17,
      },
      {
        id: 4,
        videoType: "VOICEOVER",
        episodeCount: 0,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 17,
  },
  {
    movieId: 13,
    movieType: "SERIES",
    title: "Danh Bất Hư Truyền",
    originalTitle: "He Kills It",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/rUKcCHC7j3t2YqXqywy0XGChVJL.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2024,
    genres: [],
    videoVersions: [
      {
        id: 5,
        videoType: "VIETSUB",
        episodeCount: 22,
      },
      {
        id: 6,
        videoType: "VOICEOVER",
        episodeCount: 0,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 22,
  },
  {
    movieId: 14,
    movieType: "SERIES",
    title: "Bằng Thượng Giai Tế",
    originalTitle: "Serendipity",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/9eSoJrj8LkbUzuPUgQTY5EXzCyD.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2024,
    genres: [],
    videoVersions: [
      {
        id: 7,
        videoType: "VIETSUB",
        episodeCount: 22,
      },
      {
        id: 8,
        videoType: "VOICEOVER",
        episodeCount: 0,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 22,
  },
  {
    movieId: 15,
    movieType: "SERIES",
    title: "Tôi Là Triệu Giáp Đệ: Phong Mang",
    originalTitle: "The Rise of Zhao Jiaodi",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/vZ5U5X6BF3aD15F4B1jcSSvFdFq.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2024,
    genres: [],
    videoVersions: [
      {
        id: 9,
        videoType: "VIETSUB",
        episodeCount: 13,
      },
      {
        id: 10,
        videoType: "VOICEOVER",
        episodeCount: 0,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 13,
  },
  {
    movieId: 16,
    movieType: "SERIES",
    title: "Phong Khởi Lạc Dương",
    originalTitle: "Wind Rises in Luoyang",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/2Wf5ySuUXXwXBJoStpuYHPTXRzu.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2024,
    genres: [],
    videoVersions: [
      {
        id: 11,
        videoType: "VIETSUB",
        episodeCount: 24,
      },
      {
        id: 12,
        videoType: "VOICEOVER",
        episodeCount: 0,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 24,
  },
  {
    movieId: 17,
    movieType: "SERIES",
    title: "Trường An Như Cố",
    originalTitle: "The Eternal Love",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/79UovXztD64EUVPCTkOmsgXPTcE.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2024,
    genres: [],
    videoVersions: [
      {
        id: 13,
        videoType: "VIETSUB",
        episodeCount: 24,
      },
      {
        id: 14,
        videoType: "VOICEOVER",
        episodeCount: 0,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 24,
  },
  {
    movieId: 18,
    movieType: "SERIES",
    title: "Bạch Lộc",
    originalTitle: "One and Only",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/9wHJwm6gYcCpxXZqxYrjdDJMBXZ.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2024,
    genres: [],
    videoVersions: [
      {
        id: 15,
        videoType: "VIETSUB",
        episodeCount: 24,
      },
      {
        id: 16,
        videoType: "VOICEOVER",
        episodeCount: 0,
      },
    ],
    duration: 0,
    season: 1,
    totalEpisodes: 24,
  },
];
// Dữ liệu mẫu phim lẻ
const singleMovies = [
  {
    movieId: 19,
    movieType: "SINGLE",
    title: "Biệt Đội Marvel",
    originalTitle: "The Marvels",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/tUtgLOESpCx7ue4BaeCTqp3vn1b.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2023,
    genres: [],
    videoVersions: [
      {
        id: 1,
        videoType: "VIETSUB",
        episodeCount: 1,
      },
    ],
    duration: 105,
    season: 0,
    totalEpisodes: 1,
  },
  {
    movieId: 20,
    movieType: "SINGLE",
    title: "Vầng Trăng Máu",
    originalTitle: "Killers of the Flower Moon",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2023,
    genres: [],
    videoVersions: [
      {
        id: 2,
        videoType: "VIETSUB",
        episodeCount: 1,
      },
    ],
    duration: 206,
    season: 0,
    totalEpisodes: 1,
  },
  {
    movieId: 21,
    movieType: "SINGLE",
    title: "Kẻ Săn Mồi: Báo Thù",
    originalTitle: "Predator: Prey",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2022,
    genres: [],
    videoVersions: [
      {
        id: 3,
        videoType: "VIETSUB",
        episodeCount: 1,
      },
    ],
    duration: 100,
    season: 0,
    totalEpisodes: 1,
  },
  {
    movieId: 22,
    movieType: "SINGLE",
    title: "Dune: Hành Tinh Cát Phần Hai",
    originalTitle: "Dune: Part Two",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/Avid9MkOaPrcYxSlCU0iiQZHzM.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2024,
    genres: [],
    videoVersions: [
      {
        id: 4,
        videoType: "VIETSUB",
        episodeCount: 1,
      },
    ],
    duration: 166,
    season: 0,
    totalEpisodes: 1,
  },
  {
    movieId: 23,
    movieType: "SINGLE",
    title: "Quỷ Ám: Bởi Vì Có Quỷ 2",
    originalTitle: "The Exorcist: Believer",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/mmGiMvT19sGNMDICEBJLOZnKsRZ.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2023,
    genres: [],
    videoVersions: [
      {
        id: 5,
        videoType: "VIETSUB",
        episodeCount: 1,
      },
    ],
    duration: 111,
    season: 0,
    totalEpisodes: 1,
  },
  {
    movieId: 24,
    movieType: "SINGLE",
    title: "Quyền Lực Của Chó",
    originalTitle: "The Power of the Dog",
    posterUrl:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/kEy48iCzGnp0ao1cZbNeWR6yIhC.jpg",
    backdropUrl: "",
    voteAverage: 0,
    year: 2021,
    genres: [],
    videoVersions: [
      {
        id: 6,
        videoType: "VIETSUB",
        episodeCount: 1,
      },
    ],
    duration: 126,
    season: 0,
    totalEpisodes: 1,
  },
];

const HomePage = () => {
  return (
    <div className="relative">
      {/* Feature movie */}
      <FeatureMovie />

      <div className="mx-auto max-w-full pt-8 lg:max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px]">
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
            <HotMovieByCountry
              title="Phim Trung Quốc mới"
              movies={chineseMovies}
              viewAllLink="/quoc-gia/trung-quoc"
            />
          </div>
        </div>
        {/* Top 10 phim bộ */}
        <HotMovieSection
          movies={koreanMovies}
          title="Top 10 phim bộ hôm nay"
          viewAllLink="/phim-bo"
        />

        {/* Top 10 phim lẻ */}
        <HotMovieSection
          movies={singleMovies}
          title="Top 10 phim lẻ đặc sắc"
          viewAllLink="/phim-le"
        />
      </div>
    </div>
  );
};

export default HomePage;
