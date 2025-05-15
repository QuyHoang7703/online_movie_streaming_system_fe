import { movieTypeUrlMapperReverse } from "@consts/movieTypeUrlMapper";
import { videoVersionTypes } from "@consts/videoVersionTypes";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const VideoVersionCard = ({
  videoVersion,
  handleOpenViewDetailEpisodeModal,
  handleDeleteVideoVersion,
  isUserView = false,
  movieDetail,
  setChosenEpisode,
}) => {
  const navigate = useNavigate();

  const handleWatchMovie = () => {
    setChosenEpisode(videoVersion.episodeIdOfStandaloneMovie);
    // Navigate to the MovieWatching page with videoVersion information
    navigate(
      `/xem-phim/${movieTypeUrlMapperReverse[movieDetail.movieType]}/${movieDetail.id}`,
      {
        state: {
          episodeId: videoVersion.episodeIdOfStandaloneMovie,
          movieDetail: movieDetail,
        },
      },
    );
  };

  return (
    <div>
      <div className="relative h-[150px] w-[300px] overflow-hidden rounded-lg">
        {/* Background image */}
        <img
          alt={videoVersion.title || "Movie poster"}
          src={videoVersion.backdropUrl}
          className="h-full w-full object-cover"
        />

        {/* Content overlay with shadow effect */}
        <div className="absolute inset-0 flex items-center">
          <div className="h-full w-[95%] bg-gradient-to-r from-[#5e6070]/95 via-[#5e6070] to-transparent p-4 text-white">
            <div className="flex h-full flex-col justify-center">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600/50">
                  <span className="text-xs font-medium">CC</span>
                </div>
                <p className="m-0 text-blue-400">
                  {videoVersionTypes[videoVersion.videoType]}
                </p>
              </div>
              <p className="m-0 text-lg font-medium">
                {videoVersion.movieTitle}
              </p>
              <div className="mt-3 flex gap-2">
                {isUserView ? (
                  <Button
                    className="w-fit"
                    type="default"
                    onClick={handleWatchMovie}
                  >
                    Xem bản này
                  </Button>
                ) : (
                  <Button
                    className="w-fit"
                    type="default"
                    onClick={() =>
                      handleOpenViewDetailEpisodeModal({
                        episodeId: videoVersion.episodeIdOfStandaloneMovie,
                      })
                    }
                  >
                    Xem bản này
                  </Button>
                )}
                {handleDeleteVideoVersion && (
                  <Button
                    className="w-fit"
                    type="default"
                    danger
                    onClick={() =>
                      handleDeleteVideoVersion(
                        videoVersion.id,
                        videoVersion.videoType,
                      )
                    }
                  >
                    Xóa
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoVersionCard;
