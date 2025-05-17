import MovieCard from "@components/user/movie/MovieCard";
import { useLoading } from "@context/LoadingContext";
import { useGetFavoriteMoviesQuery } from "@service/admin/favoriteMovieApi";
import { Empty, Pagination } from "antd";
import { useEffect, useState } from "react";

const FavoriteMovies = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });

  const handlePageChange = (page, pageSize) => {
    setPagination({
      page,
      size: pageSize,
    });
  };

  const { showLoading, hideLoading } = useLoading();

  const { data: favoriteMovieResponse, isLoading } = useGetFavoriteMoviesQuery({
    page: pagination.page,
    size: pagination.size,
  });

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  const favoriteMovies = favoriteMovieResponse?.data?.result || [];

  return (
    <div>
      <p className="mb-2 text-lg font-medium text-white">Yêu thích</p>
      <div>
        {Array.isArray(favoriteMovies) && favoriteMovies.length === 0 ? (
          <Empty
            description={
              <p className="text-lg font-bold text-white">
                Chưa có phim yêu thích
              </p>
            }
            className="!text-white"
          />
        ) : (
          <div className="">
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-6">
              {favoriteMovies.map((movie) => (
                <MovieCard
                  key={movie.movieId}
                  movie={movie}
                  variant="default"
                />
              ))}
            </div>
            <div className="mt-7 flex justify-end">
              <Pagination
                current={pagination.page}
                pageSize={pagination.size}
                total={favoriteMovieResponse?.data?.meta?.totalElements || 0}
                onChange={handlePageChange}
                // showSizeChanger
                // showQuickJumper
                className="custom-pagination"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
