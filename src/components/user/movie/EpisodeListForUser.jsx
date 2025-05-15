import { CaretRightFilled } from "@ant-design/icons";
import { movieTypeUrlMapperReverse } from "@consts/movieTypeUrlMapper";
import { useGetEpisodesQuery } from "@service/admin/episodeApi";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EpisodeListForUser = ({
  videoVersionId,
  movieDetail,
  currentEpisodeId,
}) => {
  const episodesResponse = useGetEpisodesQuery({ videoVersionId });
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (episodesResponse.isSuccess) {
      console.log("episodes", episodesResponse.data.data.result);
      setEpisodes(episodesResponse.data.data.result);
    }
  }, [episodesResponse]);

  return (
    <div className="flex flex-wrap gap-3">
      {episodes.map((episode) => {
        const isCurrentEpisode =
          currentEpisodeId && String(currentEpisodeId) === String(episode.id);

        return (
          <div
            key={episode.id}
            className={`${isCurrentEpisode ? "rounded-md ring-2" : ""}`}
          >
            <Link
              to={`/xem-phim/${movieTypeUrlMapperReverse[movieDetail.movieType]}/${movieDetail.id}`}
              state={{
                episodeId: episode.id,
                movieDetail: movieDetail,
              }}
            >
              <Button
                className={`border-none p-5 ${
                  isCurrentEpisode
                    ? "bg-mainColor text-white hover:!bg-mainColorHover hover:!text-white"
                    : "bg-dark-100 text-white hover:!bg-dark-100 hover:!text-mainUserColor-200"
                }`}
                icon={<CaretRightFilled />}
              >
                Tập {episode.episodeNumber}
              </Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default EpisodeListForUser;
