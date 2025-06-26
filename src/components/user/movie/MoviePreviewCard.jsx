import { HeartFilled, InfoCircleOutlined } from "@ant-design/icons";
import { movieTypeUrlMapperReverse } from "@consts/movieTypeUrlMapper";
import VARIANTS from "@consts/variants";
import { useFavoriteMovie } from "@hooks/useFavoriteMovie";
import { useDefaultEpisode } from "@hooks/useDefaultEpisode";
import { convertMinutesToHourMinute } from "@utils/timeUtils";
import { Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WatchButton from "./WatchButton";
import { useAddHistoryViewMutation } from "@service/userInteractionApi";

const MoviePreviewCard = ({
  movie,
  isNearRightEdge,
  variant = "default", // Thêm variant prop
}) => {
  const genres = movie.genres.map((genre) => genre.name) || [
    "Hành Động",
    "Phiêu Lưu",
  ];

  // Lấy defaultEpisodeId cho movie này
  const { defaultEpisodeId } = useDefaultEpisode({
    movieId: movie.movieId,
    movieType: movie.movieType,
  });

  // Lấy cấu hình dựa theo variant
  const config = VARIANTS[variant] || VARIANTS.default;

  const { toggleFavorite, isProcessing } = useFavoriteMovie();
  const navigate = useNavigate();

  const [addHistoryView, { isLoading: _isAddingHistoryView }] =
    useAddHistoryViewMutation();

  const handleAddHistoryView = async () => {
    try {
      await addHistoryView({ movieId: movie.movieId }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`absolute ${config.positionClass} -top-[36px] z-50 mt-2 overflow-hidden rounded-lg bg-dark-300 shadow-xl ${isNearRightEdge ? "right-[-10px]" : "left-[-10px]"}`}
      style={{ width: config.width }}
    >
      {/* Preview Image */}
      <div className="relative w-full" style={{ height: config.imageHeight }}>
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-white">
          {movie.originalTitle}
        </h3>
        <div className="mb-3 flex gap-2">
          <WatchButton
            episodeId={defaultEpisodeId}
            movieId={movie.movieId}
            movieType={movie.movieType}
            variant="preview"
            handleAddHistoryView={handleAddHistoryView}
          />

          <Button
            icon={<HeartFilled />}
            size="middle"
            type="text"
            className={`!flex !items-center !justify-center !border-2 !border-gray-700 !bg-gray-800/80 !font-medium hover:!bg-gray-700 ${movie.favorite ? "!text-mainUserColor-100" : "!text-white"}`}
            loading={isProcessing}
            onClick={() =>
              toggleFavorite({
                movieId: movie.movieId,
                isFavorite: movie.favorite,
              })
            }
          >
            {movie.favorite ? "Đã thích" : "Thích"}
          </Button>
          {/* <Link
            to={`/${movieTypeUrlMapperReverse[movie.movieType]}/${movie.movieId}`}
          >
            <Button
              icon={<InfoCircleOutlined />}
              size="middle"
              type="text"
              className="!flex !items-center !justify-center !border-2 !border-gray-700 !bg-gray-800/80 !font-medium !text-white hover:!bg-gray-700"
            >
              Thông tin
            </Button>
          </Link> */}
          <Button
            icon={<InfoCircleOutlined />}
            size="middle"
            type="text"
            className="!flex !items-center !justify-center !border-2 !border-gray-700 !bg-gray-800/80 !font-medium !text-white hover:!bg-gray-700"
            onClick={() =>
              navigate(
                `/${movieTypeUrlMapperReverse[movie.movieType]}/${movie.movieId}`,
              )
            }
          >
            Thông tin
          </Button>
        </div>

        {/* Info Row */}
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
          <span>T{movie.type || "16"}</span>
          <span>•</span>
          <span>{movie.year || "2024"}</span>
          <span>•</span>
          <span>{convertMinutesToHourMinute(movie.duration) || "2h 30m"}</span>
        </div>

        {/* Genres */}
        <div className="mb-3 flex flex-wrap gap-2">
          {(genres || []).map((genre, index) => (
            <React.Fragment key={index}>
              <span className="flex items-center rounded bg-gray-800 p-1 text-xs text-gray-300">
                {genre}
              </span>
              {index < genres.length - 1 && (
                <span className="text-white">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePreviewCard;
