/** @jsxImportSource react */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MoviePreviewCard from "./MoviePreviewCard";
import { usePreviewPosition } from "../../../hooks/usePreviewPosition";
import { movieTypeUrlMapperReverse } from "@consts/movieTypeUrlMapper";
import ImageWithPlaceholder from "@components/common/ImageWithPlaceholder ";
import { Image } from "antd";

const VideoVersionMapper = {
  VIETSUB: { label: "P.Đ", color: "bg-green-600" },
  VOICEOVER: { label: "T.M", color: "bg-blue-600" },
  DUBBED: { label: "L.T", color: "bg-red-600" },
};
const MovieCard = ({
  movie,
  rank,
  index,
  variant = "default", // "hot" for HotMovieCard or "default" for MovieCard
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const cardRef = useRef(null);
  const isNearRightEdge = usePreviewPosition(cardRef, showPreview, "default");
  console.log({ movieTypeInPReview: movie.movieType });
  // Determine clip path based on index (odd or even) - only used for hot variant
  const clipPathStyle =
    variant === "hot" && index % 2 === 0
      ? "polygon(0 0, 100% 10%, 100% 100%, 0 100%)" // Even index: right to left slant
      : variant === "hot"
        ? "polygon(0 10%, 100% 0, 100% 100%, 0 100%)" // Odd index: left to right slant
        : "none"; // Default: no slant

  return (
    <div
      className={`flex ${variant === "hot" ? "w-full max-w-[230px]" : ""} flex-col items-center`}
    >
      <div
        className="group relative w-full"
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
      >
        <Link
          to={`/${movieTypeUrlMapperReverse[movie.movieType]}/${movie.movieId}`}
          className="block w-full"
        >
          <div className="relative transform overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:scale-105">
            <div
              className="relative aspect-[2/3] w-full overflow-hidden sm:aspect-[1/1.5]"
              style={{
                clipPath: clipPathStyle,
              }}
            >
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Badges */}
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 transform flex-nowrap items-center justify-center gap-1">
              {(movie.videoVersions || []).map((videoVersion) => (
                <span
                  key={videoVersion.id}
                  className={`whitespace-nowrap rounded px-2 py-0.5 text-[8px] font-medium text-white sm:text-xs ${VideoVersionMapper[videoVersion.videoType].color} font-light`}
                >
                  {VideoVersionMapper[videoVersion.videoType].label}
                  {movie.movieType === "SERIES" && (
                    <span>.{videoVersion.episodeCount}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </Link>

        {/* Preview Card */}
        <div ref={cardRef}>
          {showPreview && (
            <MoviePreviewCard
              movie={movie}
              isNearRightEdge={isNearRightEdge}
              variant="default"
            />
          )}
        </div>
      </div>

      {/* Movie info - Different layout based on variant */}
      {variant === "hot" ? (
        // Hot Movie Card layout with rank
        <div className="mt-2 flex w-full items-center justify-center sm:mt-4 md:mt-6">
          <div className="mr-2 sm:mr-4 md:mr-6">
            <span
              className="text-2xl font-bold italic text-mainUserColor-200 sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
            >
              {rank}
            </span>
          </div>
          <div className="flex-1">
            <p className="mb-0.5 line-clamp-2 text-xs font-medium text-white sm:mb-1 sm:text-sm">
              {movie.title}
            </p>
            <p className="line-clamp-1 text-[10px] text-gray-400 sm:text-xs">
              {movie.originalTitle}
            </p>
            <div className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-400 sm:mt-1 sm:gap-2 sm:text-xs">
              <span>T{movie.type || "16"}</span>
              <span>•</span>
              <span>Phần {movie.season || "1"}</span>
              <span>•</span>
              <span>Tập {movie.totalEpisodes || "?"}</span>
            </div>
          </div>
        </div>
      ) : (
        // Default Movie Card layout
        <div className="mt-1 w-full text-center sm:mt-3 md:mt-4">
          <p className="mb-0.5 line-clamp-2 text-center text-xs font-medium text-white sm:mb-1 sm:text-sm">
            {movie.title}
          </p>
          <p className="line-clamp-1 text-[10px] text-gray-400 sm:text-xs">
            {movie.originalTitle}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
