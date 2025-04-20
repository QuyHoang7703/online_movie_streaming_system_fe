import { MESSAGES } from "@consts/messages";
import { useDeleteGenreMutation } from "@service/admin/genresApi";
import { Button } from "antd";
import { useNotification } from "@hooks/useNotification";
import { useEffect } from "react";

const ConfirmDeleteModal = ({ genreId, genreName, onSuccess, onCancel }) => {
  const [
    deleteGenre,
    // eslint-disable-next-line no-unused-vars
    { data: response, isLoading, isError, isSuccess, error },
  ] = useDeleteGenreMutation();

  const { showNotification } = useNotification();

  const handleDeleteGenre = () => {
    deleteGenre(genreId);
  };

  useEffect(() => {
    if (isSuccess) {
      showNotification("success", MESSAGES[response?.message]);
      onSuccess?.();
    }
    if (isError) {
      showNotification("error", error?.data?.message);
      onCancel?.();
    }
  }, [
    isSuccess,
    showNotification,
    response,
    isError,
    error,
    onSuccess,
    onCancel,
  ]);
  return (
    <div>
      <p className="text-base font-bold text-white">
        Bạn có muốn xóa thể loại{" "}
        <span className="text-yellow-400">"{genreName}"</span> này không?
      </p>

      <div className="mt-5 flex justify-end gap-4">
        <Button
          variant="solid"
          color="cyan"
          onClick={handleDeleteGenre}
          size="large"
        >
          Xóa
        </Button>
        <Button variant="solid" color="danger" onClick={onCancel} size="large">
          Thoát
        </Button>
      </div>
    </div>
  );
};
export default ConfirmDeleteModal;
