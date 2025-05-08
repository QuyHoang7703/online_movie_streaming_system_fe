import { usePreviewPosition } from "@hooks/usePreviewPosition";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MoviePreviewCard from "@components/user/movie/MoviePreviewCard";

const MovieCard = ({ movie }) => {
  const [showPreview, setShowPreview] = useState(false);
  const cardRef = useRef(null);
  const isNearRightEdge = usePreviewPosition(cardRef, showPreview, "default");
  return (
    <div className="flex flex-col items-center">
      <div
        className="group relative w-full"
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
      >
        <Link to={`/movie/${movie.id}`} className="block w-full">
          <div className="relative transform overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:scale-105">
            <div className="relative aspect-[2/3] w-full overflow-hidden sm:aspect-[1/1.5]">
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-full w-full rounded-lg object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Badges */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 transform justify-center gap-1">
              {movie.subtitled && (
                <span className="rounded bg-gray-700 px-1 py-0.5 text-[10px] font-medium text-white sm:text-xs">
                  PĐ {movie.subtitled}
                </span>
              )}
              {movie.episodes && (
                <span className="rounded bg-blue-600 px-1 py-0.5 text-[10px] font-medium text-white sm:text-xs">
                  TM {movie.episodes}
                </span>
              )}
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

      {/* Thông tin phim */}
      <div className="mt-2 w-full text-center sm:mt-4 md:mt-6">
        <h3 className="mb-0.5 line-clamp-1 text-center text-xs font-medium text-white sm:mb-1 sm:text-sm">
          {movie.title}
        </h3>
        <p className="line-clamp-1 text-[10px] text-gray-400 sm:text-xs">
          {movie.englishTitle}
        </p>
      </div>
    </div>
  );
};
export default MovieCard;
