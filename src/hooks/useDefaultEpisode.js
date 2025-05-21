import { useState, useEffect } from "react";
import { useGetVideoVersionQuery } from "@service/admin/videoVersionApi";
import { useGetEpisodesQuery } from "@service/admin/episodeApi";
import { useGetMovieDetail } from "./useGetMovieDetail";
import { movieTypeUrlMapperReverse } from "@consts/movieTypeUrlMapper";

/**
 * Custom hook để lấy tập mặc định cho một bộ phim
 * - Đối với phim lẻ: trả về episodeId từ phiên bản đầu tiên
 * - Đối với phim bộ: trả về tập đầu tiên của phiên bản đầu tiên
 *
 * Hỗ trợ cả hai cách sử dụng:
 * 1. Truyền đầy đủ movieDetail
 * 2. Chỉ truyền movieId và movieType
 *
 * @param {Object} params - Tham số
 * @param {Object} params.movieDetail - Chi tiết phim (tùy chọn)
 * @param {string} params.movieId - ID phim (dùng khi không có movieDetail)
 * @param {string} params.movieType - Loại phim (dùng khi không có movieDetail)
 * @returns {Object} - { defaultEpisodeId, isLoading, firstVideoVersion }
 */
export const useDefaultEpisode = ({ movieDetail, movieId, movieType }) => {
  const [defaultEpisodeId, setDefaultEpisodeId] = useState(null);

  // Nếu không có movieDetail đầy đủ nhưng có movieId và movieType, lấy chi tiết phim
  const { movieDetail: fetchedMovieDetail, isLoading: isMovieDetailLoading } =
    useGetMovieDetail({
      movieId,
      movieType: movieTypeUrlMapperReverse[movieType],
      skip: !!movieDetail, // Bỏ qua API call nếu đã có movieDetail
    });

  // Sử dụng hoặc movieDetail được truyền vào hoặc movieDetail lấy từ API
  const actualMovieDetail = movieDetail || fetchedMovieDetail;

  // Skip API call nếu không có đủ thông tin
  const shouldSkip = !actualMovieDetail?.id;

  // Lấy danh sách phiên bản video của phim
  const {
    data: videoVersionData,
    isSuccess: isVideoVersionSuccess,
    isLoading: isVideoVersionLoading,
  } = useGetVideoVersionQuery(actualMovieDetail?.id, {
    skip: shouldSkip,
  });

  // Lấy phiên bản video đầu tiên (nếu có)
  const firstVideoVersion =
    isVideoVersionSuccess && videoVersionData.data.length > 0
      ? videoVersionData.data[0]
      : null;

  // Đối với phim bộ, lấy danh sách tập của phiên bản đầu tiên
  const {
    data: episodesData,
    isSuccess: isEpisodesSuccess,
    isLoading: isEpisodesLoading,
  } = useGetEpisodesQuery(
    { videoVersionId: firstVideoVersion?.id },
    {
      skip: !firstVideoVersion || actualMovieDetail?.movieType !== "SERIES",
    },
  );

  useEffect(() => {
    // Đối với phim lẻ, sử dụng episodeId từ phiên bản đầu tiên
    if (actualMovieDetail?.movieType === "STANDALONE" && firstVideoVersion) {
      setDefaultEpisodeId(firstVideoVersion.episodeIdOfStandaloneMovie);
    }
    // Đối với phim bộ, sử dụng tập đầu tiên của phiên bản đầu tiên
    else if (
      actualMovieDetail?.movieType === "SERIES" &&
      isEpisodesSuccess &&
      episodesData?.data?.result?.length > 0
    ) {
      setDefaultEpisodeId(episodesData.data.result[0].id);
    }
  }, [
    actualMovieDetail?.movieType,
    firstVideoVersion,
    isEpisodesSuccess,
    episodesData,
  ]);

  // Tổng hợp trạng thái loading từ các API calls
  const isLoading =
    isMovieDetailLoading ||
    isVideoVersionLoading ||
    (actualMovieDetail?.movieType === "SERIES" && isEpisodesLoading);

  return {
    defaultEpisodeId,
    isLoading,
    firstVideoVersion,
    movieDetail: actualMovieDetail, // Trả về movieDetail đã fetch (nếu cần)
  };
};
