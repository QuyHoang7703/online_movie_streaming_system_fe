import {
  useCreateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
} from "@service/admin/subscriptionPlanApi";
import { useNotification } from "@hooks/useNotification";
import { useNavigate } from "react-router-dom";
export const useSubscriptionPlanCRUD = () => {
  const [createSubscriptionPlan, { isLoading: isCreateLoading }] =
    useCreateSubscriptionPlanMutation();

  const [updateSubscriptionPlan, { isLoading: isUpdateLoading }] =
    useUpdateSubscriptionPlanMutation();

  const [
    deleteSubscriptionPlan,
    {
      response: deleteResponse,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
      reset: resetDelete,
    },
  ] = useDeleteSubscriptionPlanMutation();

  const { showNotification } = useNotification();

  const navigate = useNavigate();

  const handleCreateSubscriptionPlan = async (formData) => {
    let response;
    try {
      response = await createSubscriptionPlan(formData).unwrap();
      showNotification("success", response?.message || "Thêm gói thành công!");
      navigate("/admin/subscription-plans");
    } catch (error) {
      showNotification("error", error?.data?.message || "Thêm gói thất bại!");
    }
  };

  const handleUpdateSubscriptionPlan = async (subscriptionPlanId, formData) => {
    let response;
    try {
      const parentPlanIds = formData.parentPlanIds || [];

      response = await updateSubscriptionPlan({
        subscriptionPlanId,
        formData,
        relatedPlanIds: parentPlanIds,
      }).unwrap();
      showNotification(
        "success",
        response?.message || "Cập nhật gói thành công!",
      );
      navigate("/admin/subscription-plans");
    } catch (error) {
      showNotification(
        "error",
        error?.data?.message || "Cập nhật gói thất bại!",
      );
    }
  };

  const handleDeleteSubscriptionPlan = async (subscriptionPlanId) => {
    let response;
    try {
      response = await deleteSubscriptionPlan(subscriptionPlanId).unwrap();
      showNotification("success", response?.message || "Xóa gói thành công!");
      navigate("/admin/subscription-plans");
    } catch (error) {
      showNotification("error", error?.data?.message || "Xóa gói thất bại!");
    }
  };

  return {
    handleCreateSubscriptionPlan,
    handleUpdateSubscriptionPlan,
    handleDeleteSubscriptionPlan,
    // Props
    isCreateLoading,
    isDeleteSuccess,
    isDeleteError,
    isDeleteLoading,
    isUpdateLoading,

    // Response
    deleteResponse,
    deleteError,

    // Reset
    resetDelete,
  };
};
