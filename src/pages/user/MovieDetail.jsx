import MovieActions from "@components/user/movie/MovieDetail/MovieActions";
import MovieActors from "@components/user/movie/MovieDetail/MovieActors";

import MovieInformation from "@components/user/movie/MovieDetail/MovieInformation";
import MovieTabs from "@components/user/movie/MovieDetail/MovieTabs";
import { useGetSeriesMovieDetailQuery } from "@service/admin/seriesMovieApi";
import { useGetStandaloneMovieDetailQuery } from "@service/admin/standaloneMovieApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "@context/LoadingContext";
import { movieTypeUrlMapper } from "@consts/movieTypeUrlMapper";

const MovieDetail = () => {
  const { movieType, movieId } = useParams();
  console.log("Route params:", { movieId, movieType });

  const [movieDetail, setMovieDetail] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const [chosenEpisode, setChosenEpisode] = useState(null);

  // Hiển thị chi tiết movie theo movieType
  const {
    data: standaloneMovieData,
    isLoading: isStandaloneLoading,
    error: standaloneError,
    isSuccess: isStandaloneSuccess,
  } = useGetStandaloneMovieDetailQuery(movieId, {
    skip: movieType === "phim-bo",
  });

  const {
    data: seriesMovieData,
    isLoading: isSeriesLoading,
    error: seriesError,
    isSuccess: isSeriesSuccess,
  } = useGetSeriesMovieDetailQuery(movieId, {
    skip: movieType === "phim-le",
  });

  // Debug API responses
  useEffect(() => {
    if (standaloneError) {
      console.error("Standalone movie API error:", standaloneError);
    }
    if (seriesError) {
      console.error("Series movie API error:", seriesError);
    }

    console.log("Standalone data:", standaloneMovieData);
    console.log("Series data:", seriesMovieData);
  }, [standaloneMovieData, seriesMovieData, standaloneError, seriesError]);

  const movieDetailResponse =
    movieType === "phim-le" ? standaloneMovieData : seriesMovieData;
  console.log("Movie detail response:", movieDetailResponse);

  const isLoading = isSeriesLoading || isStandaloneLoading;
  const isSuccess = isSeriesSuccess || isStandaloneSuccess;

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  useEffect(() => {
    if (isSuccess) {
      const movieDetail = movieDetailResponse?.data;
      setMovieDetail(movieDetail);
    }
  }, [isSuccess, movieDetailResponse]);

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
          <MovieActions />
          <div className="mt-8">
            <MovieTabs
              movieDetail={movieDetail}
              setChosenEpisode={setChosenEpisode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
