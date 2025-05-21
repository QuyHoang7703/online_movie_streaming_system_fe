import { useGetSeriesMovieDetailQuery } from "@service/admin/seriesMovieApi";
import { useGetStandaloneMovieDetailQuery } from "@service/admin/standaloneMovieApi";

/**
 * Hook lấy chi tiết phim dựa trên movieId và movieType
 * @param {Object} options - Tùy chọn
 * @param {string} options.movieType - Loại phim (phim-le/phim-bo)
 * @param {string|number} options.movieId - ID của phim
 * @param {boolean} options.skip - Bỏ qua API call (mặc định: false)
 * @returns {Object} Trả về movieDetail, isLoading, isSuccess, error
 */
export const useGetMovieDetail = ({ movieType, movieId, skip = false }) => {
  // Kiểm tra xem có nên skip API call hay không
  const shouldSkipStandalone = skip || !movieId || movieType === "phim-bo";
  const shouldSkipSeries = skip || !movieId || movieType === "phim-le";

  // Gọi API cho phim lẻ
  const {
    data: standaloneMovieData,
    isLoading: isStandaloneLoading,
    error: standaloneError,
    isSuccess: isStandaloneSuccess,
  } = useGetStandaloneMovieDetailQuery(movieId, {
    skip: shouldSkipStandalone,
  });

  // Gọi API cho phim bộ
  const {
    data: seriesMovieData,
    isLoading: isSeriesLoading,
    error: seriesError,
    isSuccess: isSeriesSuccess,
  } = useGetSeriesMovieDetailQuery(movieId, {
    skip: shouldSkipSeries,
  });

  // Lấy response dựa vào loại phim
  const movieDetailResponse =
    movieType === "phim-le" ? standaloneMovieData : seriesMovieData;

  // Tổng hợp các trạng thái
  const isLoading = isSeriesLoading || isStandaloneLoading;
  const isSuccess = isSeriesSuccess || isStandaloneSuccess;
  const error = standaloneError || seriesError;

  // Lấy dữ liệu chi tiết phim từ response
  const movieDetail = movieDetailResponse?.data || null;

  return {
    movieDetail,
    isLoading,
    isSuccess,
    error,
  };
};
