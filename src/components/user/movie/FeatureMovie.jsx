import { HeartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState, useEffect } from "react";
import WatchButton from "@components/user/movie/WatchButton";
import { convertMinutesToHourMinute } from "@utils/timeUtils";
import MovieTags from "@components/user/movie/MovieDetail/MovieTags";

import { useFavoriteMovie } from "@hooks/useFavoriteMovie";
import { useNavigate } from "react-router-dom";
import { movieTypeUrlMapperReverse } from "@consts/movieTypeUrlMapper";

const FeatureMovie = ({ movies }) => {
  const [currentMovie, setCurrentMovie] = useState(null);
  const { toggleFavorite, isProcessing } = useFavoriteMovie();
  const navigate = useNavigate();
  // Set first movie as default when movies prop changes
  useEffect(() => {
    if (movies && movies.length > 0) {
      setCurrentMovie(movies[0]);
    }
  }, [movies]);

  // Don't render if no movies or currentMovie
  if (!movies || movies.length === 0 || !currentMovie) {
    return null;
  }

  const handleThumbnailClick = (movie) => {
    setCurrentMovie(movie);
    console.log({ movie });
    1;
  };

  return (
    <div className="relative">
      {/* Banner phim */}
      <div className="relative">
        <img
          src={
            currentMovie.backdropUrl ||
            currentMovie.posterUrl ||
            "https://image.tmdb.org/t/p/original/ybBIIzDL1B9yH8OVFav81JTZmoN.jpg"
          }
          alt={currentMovie.title || currentMovie.name}
          className="aspect-[16/7] w-full object-cover brightness-[0.7]"
        />

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 flex w-full justify-between bg-gradient-to-t from-black/80 to-transparent p-10">
          <div className="hidden max-w-2xl sm:block">
            {/* Tiêu đề phim */}
            <p className="mb-2 text-[2.5vw] font-bold text-white/80">
              {currentMovie.originalTitle || currentMovie.title || "Tên phim"}
            </p>
            <div className="mb-2 text-mainUserColor-100">
              {currentMovie.title || "Original Title"}
            </div>

            <div className="hidden lg:block">
              {/* Tags và thông tin */}
              <div className="mb-4 flex items-center gap-3">
                <MovieTags
                  rating={currentMovie.voteAverage?.toFixed(1)}
                  year={currentMovie.releaseDate?.split("-")[0]}
                  duration={convertMinutesToHourMinute(currentMovie.duration)}
                  type="16"
                  quality={currentMovie.quality}
                />
              </div>

              {/* Thể loại */}
              {currentMovie.genres && currentMovie.genres.length > 0 && (
                <div className="mb-3 flex items-center gap-4">
                  {currentMovie.genres.slice(0, 4).map((genre) => (
                    <span
                      key={genre.id || genre.name}
                      className="rounded-md border-2 border-white/30 bg-gray-500/30 p-1 text-white hover:text-mainColor"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Mô tả */}
              <p className="mb-6 max-w-3xl text-gray-300">
                {currentMovie.description || "Không có mô tả cho phim này."}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <WatchButton
                movieDetail={currentMovie}
                // episodeId={episodeId || defaultEpisodeId}
                // setChosenEpisode={setChosenEpisode}
                variant="action"
                movieType={currentMovie.movieType}
                movieId={currentMovie.id}
              />

              <Button
                icon={<HeartOutlined />}
                size="large"
                type="text"
                shape="circle"
                className={`!flex !h-14 !w-14 !items-center !justify-center !bg-gray-800/80 hover:!bg-gray-700 ${currentMovie.favorite ? "!text-mainUserColor-200" : "!text-white"}`}
                loading={isProcessing}
                onClick={() =>
                  toggleFavorite({
                    movieId: currentMovie.id,
                    isFavorite: currentMovie.favorite,
                  })
                }
              />

              <Button
                icon={<InfoCircleOutlined />}
                size="large"
                type="text"
                shape="circle"
                className="!flex !h-14 !w-14 !items-center !justify-center !bg-gray-800/80 !text-white hover:!bg-gray-700"
                onClick={() =>
                  navigate(
                    `/${movieTypeUrlMapperReverse[currentMovie.movieType]}/${currentMovie.id}`,
                  )
                }
              />
            </div>
          </div>
          {/* Thumbnails */}
          <div className="mt-4 flex items-end justify-end gap-2 px-6">
            {movies.slice(0, 5).map((movie, index) => (
              <div
                key={movie.id || index}
                className={`h-14 w-24 cursor-pointer overflow-hidden rounded-md transition-all hover:!bg-mainColor/80 ${
                  currentMovie.id === movie.id
                    ? "border-2 border-mainColor"
                    : ""
                }`}
                onClick={() => handleThumbnailClick(movie)}
              >
                <img
                  src={movie.backdropUrl || movie.posterUrl}
                  alt="Feature movie"
                  className="brightness- h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureMovie;
