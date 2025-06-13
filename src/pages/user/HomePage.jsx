import { Layout } from "antd";
import UserHeader from "@components/user/layout/UserHeader";
import FeatureMovie from "@components/user/movie/FeatureMovie";
import HotMovieByCountry from "@components/user/movie/HotMovieByCountry";
import HotMovieSection from "@components/user/movie/HotMovieSection";
import {
  useGetFeatureMoviesQuery,
  useGetHotMoviesByFilterQuery,
} from "@service/homePageApi";
const { Content } = Layout;

const HomePage = () => {
  const { data: koreanMoviesResponse } = useGetHotMoviesByFilterQuery({
    size: 10,
    country: "South Korea",
  });
  console.log({ koreanMoviesResponse });
  const { data: chineseMoviesResponse } = useGetHotMoviesByFilterQuery({
    size: 10,
    country: "China",
  });
  const { data: usMoviesResponse } = useGetHotMoviesByFilterQuery({
    size: 10,
    country: "United States",
  });

  const { data: standaloneMoviesResponse } = useGetHotMoviesByFilterQuery({
    size: 10,
    movieType: "STANDALONE",
  });

  const { data: movieFeatureResponse } = useGetFeatureMoviesQuery({
    size: 6,
  });

  return (
    <div className="relative">
      {/* Feature movie */}
      <FeatureMovie movies={movieFeatureResponse?.data?.result || []} />

      <div className="mx-auto max-w-full pt-8 lg:max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px]">
        {/* Phân loại phim theo quốc gia */}
        <div className="mt-3 px-2 sm:px-4 md:px-6">
          <div className="rounded-lg border border-gray-700 bg-dark-300 p-3 sm:p-4 md:p-5">
            {/* Phim Hàn Quốc Mới */}
            <HotMovieByCountry
              title="Phim Hàn Quốc mới"
              movies={koreanMoviesResponse?.data?.result || []}
              viewAllLink="/quoc-gia/han-quoc"
            />

            {/* Phim Trung Quốc Mới */}
            <HotMovieByCountry
              title="Phim Trung Quốc mới"
              movies={chineseMoviesResponse?.data?.result || []}
              viewAllLink="/quoc-gia/trung-quoc"
            />

            {/* Phim Mỹ Mới */}
            <HotMovieByCountry
              title="Phim Mỹ mới"
              movies={usMoviesResponse?.data?.result || []}
              viewAllLink="/quoc-gia/my"
            />
          </div>
        </div>
        {/* Top 10 phim bộ */}
        <HotMovieSection
          movies={koreanMoviesResponse?.data?.result || []}
          title="Top 10 phim bộ hôm nay"
          viewAllLink="/phim-bo"
        />

        {/* Top 10 phim lẻ */}
        <HotMovieSection
          movies={standaloneMoviesResponse?.data?.result || []}
          title="Top 10 phim lẻ đặc sắc"
          viewAllLink="/phim-le"
        />
      </div>
    </div>
  );
};

export default HomePage;
