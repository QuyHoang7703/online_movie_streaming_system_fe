import { useNotification } from "@hooks/useNotification";
import {
  useCreateEpisodeMutation,
  useDeleteEpisodeMutation,
  useUpdateEpisodeMutation,
} from "@service/admin/episodeApi";
import { useNavigate } from "react-router-dom";

export const useEpisodeMutations = () => {
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // Create episode
  const [createEpisode, { data: createResponse, isLoading: isCreateLoading }] =
    useCreateEpisodeMutation();

  const handleCreateEpisode = async ({
    seriesMovieId,
    episodeInfo,
    video,
    onSuccess,
  }) => {
    try {
      const result = await createEpisode({
        seriesMovieId,
        episodeInfo,
        video,
      }).unwrap();
      console.log("Create episode success:", result);

      // Hiển thị thông báo thành công
      showNotification(
        "success",
        result?.message || "Thêm tập phim thành công",
      );

      // Gọi callback onSuccess sau khi API thành công
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      } else {
        // Nếu không có callback, chuyển hướng trang
        navigate(`/admin/series-movie/${seriesMovieId}/episodes`);
      }
    } catch (error) {
      console.error("Create episode error:", error);
      showNotification(
        "error",
        error?.data?.message || "Có lỗi xảy ra khi thêm tập phim",
      );
    }
  };

  // Update episode
  const [updateEpisode, { data: updateResponse, isLoading: isUpdateLoading }] =
    useUpdateEpisodeMutation();

  const handleUpdateEpisode = async (
    { episodeId, episodeInfo, video, onSuccess },
    movieId,
  ) => {
    try {
      const result = await updateEpisode({
        episodeId,
        episodeInfo,
        video,
      }).unwrap();
      console.log("Update episode success:", result);

      // Hiển thị thông báo thành công
      showNotification(
        "success",
        result?.message || "Cập nhật tập phim thành công",
      );

      // Gọi callback onSuccess sau khi API thành công
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      } else {
        // Nếu không có callback, chuyển hướng trang
        navigate(`/admin/series-movie/${movieId}/episodes`);
      }
    } catch (error) {
      console.error("Update episode error:", error);
      showNotification(
        "error",
        error?.data?.message || "Có lỗi xảy ra khi cập nhật tập phim",
      );
    }
  };

  // Delete episode
  const [deleteEpisode, { data: deleteResponse, isLoading: isDeleteLoading }] =
    useDeleteEpisodeMutation();

  const handleDeleteEpisode = async ({ episodeId, movieId }) => {
    try {
      const result = await deleteEpisode(episodeId).unwrap();
      console.log("Delete episode success:", result);
      showNotification("success", result?.message || "Xóa tập phim thành công");
      navigate(`/admin/series-movie/${movieId}/episodes`);
    } catch (error) {
      console.error("Delete episode error:", error);
      showNotification(
        "error",
        error?.data?.message || "Có lỗi xảy ra khi xóa tập phim",
      );
    }
  };

  return {
    // functions
    handleCreateEpisode,
    handleUpdateEpisode,
    handleDeleteEpisode,

    // props
    isCreateLoading,
    isUpdateLoading,
    isDeleteLoading,

    // data
    createResponse,
    updateResponse,
    deleteResponse,
  };
};
