import { videoVersionTypes } from "@consts/videoVersionTypes";
import GenericModal from "@context/GenericModal";
import { Button } from "antd";
import { useMovieSubscription } from "@hooks/useMovieSubscription";

const VideoVersionCard = ({
  videoVersion,
  handleOpenViewDetailEpisodeModal,
  handleDeleteVideoVersion,
  isUserView = false,
  movieDetail,
  setChosenEpisode,
}) => {
  const { modalContent, handleWatchMovie } = useMovieSubscription();
  console.log({ videoVersion_videoType: videoVersion.videoType });
  const typeInfo = videoVersionTypes[videoVersion.videoType];

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
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-md ${typeInfo.colorBg}`}
                >
                  <span className="text-xs font-medium">{typeInfo.icon}</span>
                </div>
                <p className={`m-0 ${typeInfo.colorText}`}>{typeInfo.label}</p>
              </div>
              <p className="m-0 text-lg font-medium">
                {videoVersion.movieTitle}
              </p>
              <div className="mt-3 flex gap-2">
                {isUserView ? (
                  <Button
                    className="w-fit"
                    type="default"
                    onClick={() =>
                      handleWatchMovie({
                        movieDetail,
                        episodeId: videoVersion.episodeIdOfStandaloneMovie,
                        setChosenEpisode,
                      })
                    }
                  >
                    Xem bản này
                  </Button>
                ) : (
                  <>
                    {videoVersion.episodeIdOfStandaloneMovie ? (
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
                    ) : (
                      <Button
                        className="w-fit"
                        type="primary"
                        onClick={() =>
                          handleOpenViewDetailEpisodeModal({
                            videoVersionId: videoVersion.id,
                          })
                        }
                      >
                        Thêm tập phim
                      </Button>
                    )}
                  </>
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
      {modalContent && <GenericModal {...modalContent} />}
    </div>
  );
};

export default VideoVersionCard;
