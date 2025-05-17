import {
  useAddFavoriteMovieMutation,
  useRemoveFavoriteMovieMutation,
} from "@service/admin/favoriteMovieApi";
import { useNotification } from "@hooks/useNotification";

export const useFavoriteMovie = () => {
  const [addFavoriteMovie, { isLoading: isAdding }] =
    useAddFavoriteMovieMutation();
  const [deleteFavoriteMovie, { isLoading: isDeleting }] =
    useRemoveFavoriteMovieMutation();
  const { showNotification } = useNotification();

  const handleAddFavoriteMovie = async (movieId) => {
    try {
      const response = await addFavoriteMovie(movieId).unwrap();
      console.log(response);
      showNotification(
        "success",
        response.message || "Đã thêm vào danh sách yêu thích",
      );
    } catch (error) {
      showNotification(
        "error",
        error.message || "Bạn phải đăng nhập để sử dụng tính năng này ",
      );
    }
  };

  const handleRemoveFavoriteMovie = async (movieId) => {
    try {
      const response = await deleteFavoriteMovie(movieId).unwrap();
      showNotification(
        "success",
        response.message || "Đã xóa khỏi danh sách yêu thích",
      );
    } catch (error) {
      showNotification(
        "error",
        error.message || "Bạn phải đăng nhập để sử dụng tính năng này",
      );
    }
  };

  const toggleFavorite = async ({ movieId, isFavorite }) => {
    if (!movieId) return;
    if (isFavorite) {
      await handleRemoveFavoriteMovie(movieId);
    } else {
      await handleAddFavoriteMovie(movieId);
    }
  };

  return {
    handleAddFavoriteMovie,
    handleRemoveFavoriteMovie,
    toggleFavorite,
    isProcessing: isAdding || isDeleting,
  };
};
