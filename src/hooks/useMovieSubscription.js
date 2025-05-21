import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyCanUserWatchMovieQuery } from "@service/admin/movieApi";
import { movieTypeUrlMapperReverse } from "@consts/movieTypeUrlMapper";
import SubscriptionPlanModal from "@components/user/subscriptionPlan/SubscriptionPlanModal";

/**
 * Hook quản lý quyền xem phim và modal đăng ký gói dịch vụ
 * Hỗ trợ cả hai cách sử dụng:
 * 1. Truyền đủ movieDetail
 * 2. Chỉ truyền movieId và movieType khi không có đủ thông tin
 */
export const useMovieSubscription = () => {
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState(null);
  const [canUserWatchMovie] = useLazyCanUserWatchMovieQuery();

  /**
   * Mở modal đăng ký gói dịch vụ
   * @param {Object} params - Tham số
   * @param {string} params.movieId - ID phim
   * @param {string} params.movieTitle - Tên phim (tùy chọn)
   * @param {string} params.backdropUrl - URL ảnh nền (tùy chọn)
   * @param {string} params.originalTitle - Tên gốc phim (tùy chọn)
   */
  const handleOpenSubscriptionPlanModal = ({
    movieId,
    movieTitle = "",
    backdropUrl = "",
    originalTitle = "",
  }) => {
    setModalContent({
      title: "Các gói dịch vụ",
      open: true,
      onCancel: () => setModalContent(null),
      Component: SubscriptionPlanModal,
      componentProps: {
        movieId,
        movieTitle,
        backdropUrl,
        originalTitle,
        onCancel: () => setModalContent(null),
      },
    });
  };

  /**
   * Xử lý khi người dùng nhấn nút xem phim
   * @param {Object} params - Tham số
   * @param {Object} params.movieDetail - Chi tiết phim (tùy chọn)
   * @param {string} params.episodeId - ID tập phim
   * @param {Function} params.setChosenEpisode - Function cập nhật tập đã chọn (tùy chọn)
   * @param {string} params.movieId - ID phim (dùng khi không có movieDetail)
   * @param {string} params.movieType - Loại phim (dùng khi không có movieDetail)
   */
  const handleWatchMovie = async ({
    movieDetail,
    episodeId,
    setChosenEpisode,
    movieId,
    movieType,
  }) => {
    try {
      // Lấy ID để kiểm tra quyền xem phim
      const idToCheck = movieDetail?.id || movieId;

      if (!idToCheck) {
        console.error("Không có ID phim để kiểm tra quyền xem");
        return;
      }

      const canWatchMovieResponse = await canUserWatchMovie(idToCheck);
      const canWatch = canWatchMovieResponse.data?.data;

      // Nếu phim miễn phí hoặc người dùng có quyền xem
      if (movieDetail?.free || canWatch) {
        // Cập nhật tập được chọn nếu có hàm setChosenEpisode
        setChosenEpisode?.(episodeId);

        // Lấy loại phim để tạo URL
        const typeForUrl = movieDetail?.movieType || movieType;
        // Lấy ID phim để tạo URL
        const idForUrl = movieDetail?.id || movieId;

        // Điều hướng đến trang xem phim
        navigate(
          `/xem-phim/${movieTypeUrlMapperReverse[typeForUrl]}/${idForUrl}`,
          {
            state: {
              episodeId,
              movieDetail,
              movieId: movieDetail ? undefined : movieId,
              movieType: movieDetail ? undefined : movieType,
            },
          },
        );
      } else {
        // Mở modal đăng ký gói dịch vụ nếu không có quyền xem
        handleOpenSubscriptionPlanModal({
          movieId: idToCheck,
          movieTitle: movieDetail?.title || "",
          backdropUrl: movieDetail?.backdropUrl || "",
          originalTitle: movieDetail?.originalTitle || "",
        });
      }
    } catch (error) {
      console.error("Lỗi kiểm tra quyền xem phim:", error);
    }
  };

  return {
    modalContent,
    handleOpenSubscriptionPlanModal,
    handleWatchMovie,
  };
};
