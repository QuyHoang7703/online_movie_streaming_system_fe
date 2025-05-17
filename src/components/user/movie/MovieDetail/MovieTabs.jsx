import MovieActors from "@components/user/movie/MovieDetail/MovieActors";
import VideoVersionCard from "@components/common/VideoVersionCard";
import { useGetVideoVersionQuery } from "@service/admin/videoVersionApi";
import { Tabs } from "antd";
import "@styles/user/styles.css";
import VideoVersionForSeriesMovie from "@components/user/movie/VideoVersionForSeriesMovie";

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
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <div>
      <Tabs items={items} className="custom-tabs text-[1.3vw] text-white" />
    </div>
  );
};

export default MovieTabs;
