/* eslint-disable no-unused-vars */
import { useNotification } from "@hooks/useNotification";
import {
  useCreateEpisodeMutation,
  useDeleteEpisodeMutation,
  useUpdateEpisodeMutation,
} from "@service/admin/episodeApi";
import { useNavigate } from "react-router-dom";

export const useEpisodeCRUD = () => {
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // Create episode
  const [createEpisode, { data: createResponse, isLoading: isCreateLoading }] =
    useCreateEpisodeMutation();

  const handleCreateEpisode = async ({ seriesMovieId, formData }) => {
    try {
      await createEpisode({ seriesMovieId, formData }).unwrap();
      showNotification("success", createResponse?.data?.data?.message);
    } catch (error) {
      showNotification("error", error?.data?.message);
    }
  };

  // Update episode
  const [updateEpisode, { data: updateResponse, isLoading: isUpdateLoading }] =
    useUpdateEpisodeMutation();

  const handleUpdateEpisode = async ({ episodeId, formData }) => {
    try {
      await updateEpisode({ episodeId, formData }).unwrap();
      showNotification("success", updateResponse?.data?.data?.message);
    } catch (error) {
      showNotification("error", error?.data?.message);
    }
  };

  // Delete episode
  const [deleteEpisode, { data: deleteResponse, isLoading: isDeleteLoading }] =
    useDeleteEpisodeMutation();
  const handleDeleteEpisode = async (episodeId) => {
    try {
      await deleteEpisode(episodeId).unwrap();
      showNotification("success", deleteResponse?.data?.data?.message);
    } catch (error) {
      showNotification("error", error?.data?.message);
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
  };
};
