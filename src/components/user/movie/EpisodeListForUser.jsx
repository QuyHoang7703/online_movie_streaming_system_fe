import { CaretRightFilled } from "@ant-design/icons";
import { useGetEpisodesQuery } from "@service/admin/episodeApi";
import { Button } from "antd";
import { useEffect, useState } from "react";
import GenericModal from "@context/GenericModal";
import { useMovieSubscription } from "@hooks/useMovieSubscription";

const EpisodeListForUser = ({
  videoVersionId,
  movieDetail,
  currentEpisodeId,
}) => {
  const episodesResponse = useGetEpisodesQuery({ videoVersionId });
  const [episodes, setEpisodes] = useState([]);
  const { modalContent, handleWatchMovie } = useMovieSubscription();

  useEffect(() => {
    if (episodesResponse.isSuccess) {
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
            <Button
              className={`border-none p-5 ${
                isCurrentEpisode
                  ? "bg-mainColor text-white hover:!bg-mainColorHover hover:!text-white"
                  : "bg-dark-100 text-white hover:!bg-dark-100 hover:!text-mainUserColor-200"
              }`}
              icon={<CaretRightFilled />}
              onClick={() =>
                handleWatchMovie({
                  movieDetail,
                  episodeId: episode.id,
                })
              }
            >
              Tập {episode.episodeNumber}
            </Button>
          </div>
        );
      })}
      {modalContent && <GenericModal {...modalContent} />}
    </div>
  );
};

export default EpisodeListForUser;
