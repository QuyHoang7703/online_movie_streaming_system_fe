import MovieActions from "@components/user/movie/MovieDetail/MovieActions";
import MovieActors from "@components/user/movie/MovieDetail/MovieActors";

import MovieInformation from "@components/user/movie/MovieDetail/MovieInformation";
import MovieTabs from "@components/user/movie/MovieDetail/MovieTabs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "@context/LoadingContext";
import { useGetMovieDetail } from "@hooks/useGetMovieDetail";
import CommentExample from "@components/user/comment/CommentExample";

const MovieDetail = () => {
  const { movieType, movieId } = useParams();
  console.log("Route params:", { movieId, movieType });

  // const [movieDetail, setMovieDetail] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const [chosenEpisode, setChosenEpisode] = useState(null);

  const { movieDetail, isLoading, error } = useGetMovieDetail({
    movieType,
    movieId,
  });

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  useEffect(() => {
    if (error) {
      console.error("Movie detail API error:", error);
    }
  }, [error]);

  // Don't render content until movie detail is loaded
  if (!movieDetail) {
    return <div className="min-h-screen bg-dark-400"></div>;
  }

  return (
    <div className="bg-dark-400">
      <div className="h-[calc(100vh-100px)] min-h-[400px] w-full">
        {/* Background Image */}
        <div className="">
          <img
            src={movieDetail.backdropUrl}
            alt="Feature movie"
            className="h-full w-full object-contain brightness-50"
          />
        </div>
      </div>
      <div className="relative z-10 -mt-10 flex">
        <div className="shadow-3xl hidden w-[450px] flex-none overflow-auto rounded-[3rem] bg-dark-400 p-10 xl:block">
          <MovieInformation movieDetail={movieDetail} />
          <MovieActors movieActors={movieDetail.movieActors} />
        </div>
        <div className="flex-1 rounded-[3rem] bg-dark-400 p-8 text-white">
          <MovieActions
            movieId={movieId}
            isFavorite={movieDetail.favorite}
            movieDetail={movieDetail}
            setChosenEpisode={setChosenEpisode}
            episodeId={chosenEpisode}
          />
          <div className="mt-8">
            <MovieTabs
              movieDetail={movieDetail}
              setChosenEpisode={setChosenEpisode}
            />
          </div>
          <div className="mt-8" id="comment-section">
            <CommentExample movieId={movieId} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
