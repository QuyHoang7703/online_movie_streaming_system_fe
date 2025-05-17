import MovieTags from "@components/user/movie/MovieDetail/MovieTags";
import { convertMinutesToHourMinute } from "@utils/timeUtils";
import { Image } from "antd";

const MovieSearchResult = ({ movieInfo, handleMovieClick }) => {
  return (
    <div
      className="flex gap-4 rounded-lg bg-[#1e1e1e] p-3 hover:bg-dark-100"
      onClick={() => handleMovieClick(movieInfo.movieType, movieInfo.movieId)}
    >
      {/* Phần ảnh */}
      <div className="flex h-[90px] w-[60px] flex-shrink-0 items-center justify-center">
        <Image
          src={movieInfo.posterUrl}
          alt={movieInfo.title}
          preview={false}
          className="aspect-[2/3] h-full rounded-md object-cover"
        />
      </div>

      {/* Phần thông tin */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="line-clamp-1 text-base font-bold text-white">
            {movieInfo.title}
          </p>
          <p className="line-clamp-1 text-sm text-mainUserColor-100">
            {movieInfo.originalTitle}
          </p>
        </div>

        <div className="mt-2">
          <MovieTags
            rating={movieInfo.voteAverage?.toFixed(1)}
            year={movieInfo.releaseDate?.split("-")[0]}
            duration={convertMinutesToHourMinute(movieInfo.duration)}
            type="16"
            quality={movieInfo.quality}
            size="0.4em"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieSearchResult;
