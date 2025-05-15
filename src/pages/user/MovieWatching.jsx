import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieInformation from "@components/user/movie/MovieDetail/MovieInformation";
import { useLazyGetDetailEpisodeQuery } from "@service/admin/episodeApi";
import { useLoading } from "@context/LoadingContext";
import MovieActors from "@components/user/movie/MovieDetail/MovieActors";
import { useGetVideoVersionQuery } from "@service/admin/videoVersionApi";
import VideoVersionCard from "@components/common/VideoVersionCard";
import VideoVersionForSeriesMovie from "@components/user/movie/VideoVersionForSeriesMovie";

const MovieWatching = () => {
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState(null);
  const episodeId = location?.state?.episodeId;
  const movieDetail = location?.state?.movieDetail;
  const [chosenEpisode, setChosenEpisode] = useState(episodeId);
  const [getEpisodeDetail, { data: episodeDetailData, isSuccess, isLoading }] =
    useLazyGetDetailEpisodeQuery();
  const { showLoading, hideLoading } = useLoading();

  const { data: videoVersionData, isSuccess: isVideoVersionSuccess } =
    useGetVideoVersionQuery(movieDetail?.id, { skip: !movieDetail?.id });

  const videoVersions = isVideoVersionSuccess ? videoVersionData.data : [];

  useEffect(() => {
    if (episodeId) {
      console.log("episodeId", episodeId);
      getEpisodeDetail(episodeId);
    }
  }, [episodeId, getEpisodeDetail]);

  useEffect(() => {
    if (chosenEpisode) {
      setVideoUrl(null);
      getEpisodeDetail(chosenEpisode);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [chosenEpisode, getEpisodeDetail]);

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  useEffect(() => {
    if (isSuccess) {
      const url = episodeDetailData.data.videoUrl;
      console.log("episode url", url);
      setVideoUrl(url);
    }
  }, [isSuccess, episodeDetailData]);
  const resolvedVideoUrl = videoUrl?.includes("player.phimapi.com")
    ? videoUrl.split("url=")[1]
    : videoUrl;

  return (
    <div className="bg-dark-400 pt-24">
      <div className="h-[calc(100vh-100px)] w-full">
        {resolvedVideoUrl ? (
          <ReactPlayer
            url={resolvedVideoUrl}
            controls={true}
            playing={true}
            width="100%"
            height="100%"
            config={{
              file: {
                forceVideo: true,
                attributes: {
                  controlsList: "nodownload",
                },
                hlsOptions: {
                  enableWorker: true,
                  debug: false,
                },
              },
            }}
            onError={(e) => {
              console.error("Lỗi phát video:", e);
            }}
          />
        ) : (
          !isLoading && (
            <div className="flex h-[70vh] items-center justify-center text-white">
              Không tìm thấy video hoặc có lỗi khi tải.
            </div>
          )
        )}
      </div>
      <div className="relative bg-dark-400 p-5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="lg:w-2/3">
              <MovieInformation movieDetail={movieDetail} layout="horizontal" />

              {/* Hiển thị các phiên bản video */}
              {videoVersions && videoVersions.length > 0 && (
                <div className="mt-8">
                  <p className="mb-4 text-lg font-medium text-white">
                    Các bản chiếu:
                  </p>

                  {movieDetail.movieType === "STANDALONE" && (
                    <div className="flex gap-5">
                      {videoVersions.map((videoVersion) => (
                        <div
                          key={videoVersion.id}
                          onClick={() =>
                            setChosenEpisode(
                              videoVersion.episodeIdOfStandaloneMovie,
                            )
                          }
                          className={`cursor-pointer rounded-lg p-1 ${
                            chosenEpisode ===
                            videoVersion.episodeIdOfStandaloneMovie
                              ? "border-2 border-mainColor"
                              : ""
                          }`}
                        >
                          <VideoVersionCard
                            videoVersion={videoVersion}
                            isUserView={true}
                            movieDetail={movieDetail}
                            setChosenEpisode={setChosenEpisode}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {movieDetail.movieType === "SERIES" && (
                    <VideoVersionForSeriesMovie
                      videoVersions={videoVersions}
                      movieDetail={movieDetail}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="lg:w-1/3">
              <MovieActors movieActors={movieDetail.movieActors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieWatching;
