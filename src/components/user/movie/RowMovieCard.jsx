import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MoviePreviewCard from "./MoviePreviewCard";
import { usePreviewPosition } from "../../../hooks/usePreviewPosition";

const RowMovieCard = ({ movie }) => {
  const [showPreview, setShowPreview] = useState(false);
  const cardRef = useRef(null);
  const isNearRightEdge = usePreviewPosition(cardRef, showPreview, "country");

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <Link to={`/movie/${movie.id}`} className="group w-[300px] flex-shrink-0">
        <div className="relative">
          {/* Poster phim */}
          <div className="overflow-hidden rounded-md">
            <img
              src={movie.poster}
              alt={movie.title}
              className="aspect-video w-full rounded-md object-cover"
            />
          </div>

          {/* Badges ở góc trái trên */}
          <div className="absolute bottom-2 left-2 flex gap-1">
            {movie.subtitled && (
              <span className="rounded bg-gray-700 px-1.5 py-0.5 text-xs font-medium text-white">
                PĐ {movie.subtitled}
              </span>
            )}
            {movie.episodes && (
              <span className="rounded bg-blue-600 px-1.5 py-0.5 text-xs font-medium text-white">
                TM {movie.episodes}
              </span>
            )}
          </div>
        </div>

        {/* Tiêu đề phim */}
        <h3 className="mt-2 line-clamp-1 text-sm font-medium text-white transition-colors duration-200 group-hover:text-mainColor">
          {movie.title}
        </h3>

        {/* Tên tiếng Anh */}
        <p className="line-clamp-1 text-xs text-gray-400">
          {movie.englishTitle}
        </p>
        <div ref={cardRef}>
          {showPreview && (
            <MoviePreviewCard
              movie={movie}
              isNearRightEdge={isNearRightEdge}
              variant="country"
            />
          )}
        </div>
      </Link>
    </div>
  );
};

export default RowMovieCard;
