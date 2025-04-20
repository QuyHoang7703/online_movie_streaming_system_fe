/* eslint-disable no-unused-vars */
import FormField from "@components/FormField";
import InputField from "@components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateGenreMutation,
  useGetGenresQuery,
  useUpdateGenreMutation,
} from "@service/admin/genresApi";
import { Button } from "antd";
import { useNotification } from "@hooks/useNotification";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { MESSAGES } from "@consts/messages";

const CreateGenreForm = ({
  genre = {},
  onSuccess,
  onCancel,
  isUpdate = false,
}) => {
  const formSchema = yup.object().shape({
    name: yup.string().required("Tên thể loại không được để trống"),
    description: yup.string().required("Mô tả không được để trống"),
  });
  const { showNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: genre?.name || "",
      description: genre?.description || "",
    },
  });

  useEffect(() => {
    reset({
      name: genre?.name || "",
      description: genre?.description || "",
    });
  }, [genre, reset]);

  const [createGenre, createResult] = useCreateGenreMutation();
  const [updateGenre, updateResult] = useUpdateGenreMutation();

  // Chọn mutation function và kết quả tương ứng
  const mutationFunction = isUpdate ? updateGenre : createGenre;
  const mutationResult = isUpdate ? updateResult : createResult;

  const {
    data: response,
    isSuccess,
    isError,
    isLoading,
    error,
  } = mutationResult;

  const handleSubmitForm = (formData) => {
    console.log({ formData });
    if (isUpdate) {
      mutationFunction({ genreId: genre?.id, ...formData });
    } else {
      mutationFunction(formData);
    }
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
    isError,
    error,
    showNotification,
    onSuccess,
    onCancel,
    response,
  ]);

  const handleCancelModal = () => {
    onCancel?.();
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <FormField
          control={control}
          name="name"
          label="Tên thể loại"
          Component={InputField}
          error={errors?.name?.message}
          // defaultValue={genre?.name}
        />
        <FormField
          control={control}
          name="description"
          label="Mô tả"
          Component={InputField}
          error={errors?.description?.message}
          // defaultValue={genre?.description}
        />
        <div className="flex justify-end gap-4">
          <Button
            htmlType="submit"
            size="large"
            type="success"
            color="cyan"
            variant="solid"
          >
            {isUpdate ? "Cập nhật" : "Tạo"}
          </Button>
          <Button
            onClick={handleCancelModal}
            size="large"
            type="danger"
            color="red"
            variant="solid"
          >
            Thoát
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CreateGenreForm;
