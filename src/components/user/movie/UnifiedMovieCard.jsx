/** @jsxImportSource react */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MoviePreviewCard from "./MoviePreviewCard";
import { usePreviewPosition } from "../../../hooks/usePreviewPosition";

const UnifiedMovieCard = ({
  movie,
  rank,
  index,
  variant = "default", // "hot" for HotMovieCard or "default" for MovieCard
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const cardRef = useRef(null);
  const isNearRightEdge = usePreviewPosition(cardRef, showPreview, "default");

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
        <Link to={`/movie/${movie.id}`} className="block w-full">
          <div className="relative transform overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:scale-105">
            <div
              className="relative aspect-[2/3] w-full overflow-hidden sm:aspect-[1/1.5]"
              style={{
                clipPath: clipPathStyle,
              }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Badges */}
            {/* <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 transform flex-nowrap items-center justify-center gap-1">
              {movie.subtitled && (
                <span className="whitespace-nowrap rounded bg-gray-700 px-1 py-0.5 text-[10px] font-medium text-white sm:text-xs">
                  PĐ {movie.subtitled}
                </span>
              )}
              {movie.episodes && (
                <span className="whitespace-nowrap rounded bg-blue-600 px-1 py-0.5 text-[10px] font-medium text-white sm:text-xs">
                  TM {movie.episodes}
                </span>
              )}
            </div> */}
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
            <h3 className="mb-0.5 line-clamp-1 text-xs font-medium text-white sm:mb-1 sm:text-sm">
              {movie.title}
            </h3>
            <p className="line-clamp-1 text-[10px] text-gray-400 sm:text-xs">
              {movie.englishTitle}
            </p>
            <div className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-400 sm:mt-1 sm:gap-2 sm:text-xs">
              <span>T{movie.type || "16"}</span>
              <span>•</span>
              <span>Phần {movie.season || "1"}</span>
              <span>•</span>
              <span>Tập {movie.episodes || "?"}</span>
            </div>
          </div>
        </div>
      ) : (
        // Default Movie Card layout
        <div className="mt-2 w-full text-center sm:mt-4 md:mt-6">
          <h3 className="mb-0.5 line-clamp-1 text-center text-xs font-medium text-white sm:mb-1 sm:text-sm">
            {movie.title}
          </h3>
          <p className="line-clamp-1 text-[10px] text-gray-400 sm:text-xs">
            {movie.englishTitle}
          </p>
        </div>
      )}
    </div>
  );
};

export default UnifiedMovieCard;
