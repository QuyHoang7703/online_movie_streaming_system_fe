import MovieActors from "@components/user/movie/MovieDetail/MovieActors";
import VideoVersionCard from "@components/common/VideoVersionCard";
import { useGetVideoVersionQuery } from "@service/admin/videoVersionApi";
import { Tabs } from "antd";
import "@styles/user/styles.css";
import VideoVersionForSeriesMovie from "@components/user/movie/VideoVersionForSeriesMovie";
import { useGetRecommendationMoviesMutation } from "@service/admin/movieApi";
import MovieCard from "@components/user/movie/MovieCard";
import { useEffect } from "react";

const MovieTabs = ({ movieDetail, setChosenEpisode }) => {
  const videoVersionResponse = useGetVideoVersionQuery(movieDetail.id);
  const videoVersions = videoVersionResponse.isSuccess
    ? videoVersionResponse.data.data
    : [];

  const renderEpisodes = (movieType) => {
    if (movieType === "STANDALONE") {
      return (
        <div className="grid grid-cols-3 gap-2">
          {videoVersions.map((videoVersion) => (
            <VideoVersionCard
              key={videoVersion.id}
              videoVersion={videoVersion}
              isUserView={true}
              movieDetail={movieDetail}
              setChosenEpisode={setChosenEpisode}
            />
          ))}
        </div>
      );
    } else if (movieType === "SERIES") {
      return (
        <VideoVersionForSeriesMovie
          videoVersions={videoVersions}
          movieDetail={movieDetail}
        />
      );
    }
  };

  const renderActors = (movieActors) => {
    return <MovieActors movieActors={movieActors} isDetail={true} />;
  };

  const [
    getRecommendationMovies,
    { data: recommendationResponse, isSuccess, isError, isLoading },
  ] = useGetRecommendationMoviesMutation();

  useEffect(() => {
    if (movieDetail?.title) {
      getRecommendationMovies({
        title: movieDetail.originalTitle,
        numRecommendations: 5,
      });
    }
  }, [movieDetail, getRecommendationMovies]);

  const renderRecommendationMovies = () => {
    if (isLoading) return <p>Đang tải đề xuất...</p>;
    if (isError)
      return <p className="text-red-500">Không thể tải đề xuất phim 😢</p>;

    if (isSuccess && recommendationResponse?.data) {
      const recommendationMovies = recommendationResponse.data;
      return (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {recommendationMovies.map((movie) => (
            <MovieCard key={movie.movieId} movie={movie} variant="default" />
          ))}
        </div>
      );
    }

    return null;
  };

  const items = [
    {
      key: "1",
      label: "Tập phim",
      children: renderEpisodes(movieDetail.movieType),
    },
    {
      key: "2",
      label: "Diễn viên",
      children: renderActors(movieDetail.movieActors),
    },
    {
      key: "3",
      label: "Đề xuất",
      children: renderRecommendationMovies(),
    },
  ];

  return (
    <div>
      <Tabs items={items} className="custom-tabs text-[1.3vw] text-white" />
    </div>
  );
};

export default MovieTabs;
