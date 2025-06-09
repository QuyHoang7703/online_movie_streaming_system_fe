import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MoviePreviewCard from "./MoviePreviewCard";
import { usePreviewPosition } from "../../../hooks/usePreviewPosition";
import { VideoVersionMapper } from "@consts/videoVersionTypes";
import { movieTypeUrlMapperReverse } from "@consts/movieTypeUrlMapper";
import ImageWithPlaceholder from "@components/common/ImageWithPlaceholder ";

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
      <Link
        to={`/${movieTypeUrlMapperReverse[movie.movieType]}/${movie.movieId}`}
        className="group w-[300px] flex-shrink-0"
      >
        <div className="relative">
          {/* Poster phim */}
          <div className="overflow-hidden rounded-md">
            <ImageWithPlaceholder
              src={movie.posterUrl}
              alt={movie.originalTitle}
              className="aspect-video w-full rounded-md object-cover"
            />
          </div>

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

        {/* Tiêu đề phim tiếng việt */}
        <h3 className="mt-2 line-clamp-1 text-sm font-medium text-white transition-colors duration-200 group-hover:text-mainColor">
          {movie.originalTitle}
        </h3>

        {/* Tên gốc*/}
        <p className="mt-2 line-clamp-1 text-xs text-gray-400">{movie.title}</p>
      </Link>
      <div ref={cardRef}>
        {showPreview && (
          <MoviePreviewCard
            movie={movie}
            isNearRightEdge={isNearRightEdge}
            variant="country"
          />
        )}
      </div>
    </div>
  );
};

export default RowMovieCard;
