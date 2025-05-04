import { useNotification } from "@hooks/useNotification";
import { useDeleteMovieMutation } from "@service/admin/movieApi";
import {
  useCreateSeriesMovieMutation,
  useUpdateSeriesMovieMutation,
} from "@service/admin/seriesMovieApi";
import {
  useCreateStandaloneMovieMutation,
  useUpdateStandaloneMovieMutation,
} from "@service/admin/standaloneMovieApi";

import { useNavigate } from "react-router-dom";

/**
 * Custom hook để quản lý CRUD operations cho movie
 */
export const useMovieCRUD = () => {
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // Delete movie
  const [
    deleteMovie,
    {
      data: deleteResponse,
      // eslint-disable-next-line no-unused-vars
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      error: deleteError,
      reset: resetDelete,
    },
  ] = useDeleteMovieMutation();

  // Create movie
  const [createStandaloneMovie, { isLoading: isCreateStandaloneLoading }] =
    useCreateStandaloneMovieMutation();
  const [createSeriesMovie, { isLoading: isCreateSeriesLoading }] =
    useCreateSeriesMovieMutation();

  // Update movie
  const [updateStandaloneMovie, { isLoading: isUpdateStandaloneLoading }] =
    useUpdateStandaloneMovieMutation();
  const [updateSeriesMovie, { isLoading: isUpdateSeriesLoading }] =
    useUpdateSeriesMovieMutation();

  // Handle delete movie
  const handleDeleteMovie = (movieId) => {
    // Chuyển đổi movieId thành số nguyên
    const movieIdNumber = parseInt(movieId, 10);
    if (isNaN(movieIdNumber)) {
      showNotification("error", "ID phim không hợp lệ");
      return;
    }
    deleteMovie(movieIdNumber);
  };

  // Handle create movie
  const handleCreateMovie = async (formData, movieType) => {
    try {
      let response;
      if (movieType === "STANDALONE") {
        response = await createStandaloneMovie(formData).unwrap();
      } else {
        response = await createSeriesMovie(formData).unwrap();
      }
      showNotification("success", response?.message || "Thêm phim thành công!");
      navigate("/admin/movies");
      return response;
    } catch (error) {
      showNotification("error", error?.data?.message || "Thêm phim thất bại!");
      throw error;
    }
  };

  // Handle update movie
  const handleUpdateMovie = async (formData, movieId, movieType) => {
    try {
      let response;
      if (movieType === "STANDALONE") {
        response = await updateStandaloneMovie({
          movieId,
          formData,
        }).unwrap();
      } else {
        response = await updateSeriesMovie({
          movieId,
          formData,
        }).unwrap();
      }
      showNotification(
        "success",
        response?.message || "Cập nhập phim thành công!",
      );
      navigate("/admin/movies");
      return response;
    } catch (error) {
      showNotification(
        "error",
        error?.data?.message || "Cập nhập phim thất bại!",
      );
      throw error;
    }
  };

  // Prepare form data
  const prepareFormData = (
    data,
    filePosterList,
    fileBackdropList,
    fileVideoList,
    movieType,
    free,
    subscriptionPlanIds,
  ) => {
    // Tạo base data chung
    const baseData = {
      title: data.title,
      description: data.description,
      director: data.director,
      country: data.country,
      releaseDate: data.releaseDate,
      free: free,
      trailerUrl: data.trailerUrl,
      genreIds: (data.genreIds || []).map(Number),
      movieActors: data.movieActors || [],
      subscriptionPlanIds: subscriptionPlanIds,
    };

    // Thêm các trường riêng cho từng loại phim
    const submitData = {
      ...baseData,
      movieType: movieType === "STANDALONE" ? "STANDALONE" : "SERIES",
      ...(movieType === "STANDALONE"
        ? {
            duration: Number(data.duration),
            videoUrl: data.videoUrl,
          }
        : {
            season: Number(data.season),
            episodeNumber: Number(data.episodeNumber),
          }),
    };

    console.log("Prepared submit data:", submitData);

    const formData = new FormData();
    formData.append(
      "movieInfo",
      new Blob([JSON.stringify(submitData)], { type: "application/json" }),
    );

    if (
      filePosterList &&
      filePosterList.length > 0 &&
      filePosterList[0]?.originFileObj
    ) {
      formData.append("poster", filePosterList[0].originFileObj);
    }

    if (
      fileBackdropList &&
      fileBackdropList.length > 0 &&
      fileBackdropList[0]?.originFileObj
    ) {
      formData.append("backdrop", fileBackdropList[0].originFileObj);
    }

    if (
      fileVideoList &&
      fileVideoList.length > 0 &&
      fileVideoList[0]?.originFileObj
    ) {
      formData.append("video", fileVideoList[0].originFileObj);
    }

    return formData;
  };

  return {
    // Delete
    handleDeleteMovie,
    deleteResponse,
    isDeleteError,
    isDeleteSuccess,
    deleteError,
    resetDelete,

    // Create & Update
    handleCreateMovie,
    handleUpdateMovie,
    prepareFormData,

    // Props
    isCreateStandaloneLoading,
    isCreateSeriesLoading,
    isUpdateStandaloneLoading,
    isUpdateSeriesLoading,
  };
};
