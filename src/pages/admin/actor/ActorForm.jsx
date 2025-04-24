/* eslint-disable no-unused-vars */
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, DatePicker, Input, Select } from "antd";
import FormField from "@components/FormField";
import InputField from "@components/InputField";
import ImageUpload from "@components/ImageUpload";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateActorMutation,
  useGetDetailActorQuery,
  useUpdateActorMutation,
} from "@service/admin/actorApi";
import { useNotification } from "@hooks/useNotification";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { TextArea } = Input;
const genderOptions = [
  { label: "Nam", value: "MALE" },
  { label: "Nữ", value: "FEMALE" },
  { label: "Khác", value: "OTHER" },
];
const ActorForm = ({
  actorId = null,
  onSuccess,
  onCancel,
  isUpdate = false,
}) => {
  const [fileList, setFileList] = useState([]);
  const [createActor, { isCreateLoading }] = useCreateActorMutation();
  const [updateActor, { isUpdateLoading }] = useUpdateActorMutation();
  const { showNotification } = useNotification();
  const handleChange = ({ fileList: newList }) => setFileList(newList);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    name: yup.string().required("Tên diễn viên không được để trống"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {},
  });

  const { data: response, refetch } = useGetDetailActorQuery(actorId, {
    skip: !isUpdate || !actorId, // Bỏ qua gọi nếu không phải edit
  });
  console.log({ response });
  const actor = response?.data;

  useEffect(() => {
    if (actor && isUpdate) {
      console.log("Actor data:", actor);
      reset({
        name: actor.name,
        otherName: actor.otherName,
        biography: actor.biography,
        birthDate: actor.birthDate ? dayjs(actor.birthDate) : null,
        gender: actor.gender,
        placeOfBirth: actor.placeOfBirth,
      });
      if (actor.avatarUrl) {
        setFileList([
          {
            url: actor.avatarUrl,
          },
        ]);
      }
    }
  }, [actor, isUpdate, reset]);

  const handleCancelModal = () => {
    onCancel?.();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log({ type: typeof JSON.stringify(data) });

    // 1. Thêm actorInfo dưới dạng JSON
    formData.append(
      "actorInfo",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
    );

    // 2. Thêm avatar nếu có
    if (fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj);
    }

    console.log({ actorInfo: formData });
    // 3. Gửi mutation

    try {
      const response = isUpdate
        ? await updateActor({ actorId: actor.id, formData }).unwrap()
        : await createActor(formData).unwrap(); // unwrap để throw error nếu fail
      console.log({ response });
      showNotification("success", response?.message);
      navigate("/admin/actors");
      onSuccess?.();
      if (isUpdate) {
        await refetch(); // 🔁 lấy lại dữ liệu mới nhất từ server
      }
      if (response?.data?.avatarUrl) {
        setFileList([
          {
            url: `${response.data.avatarUrl}?t=${new Date().getTime()}`, // ép load mới ảnh
          },
        ]);
      }
    } catch (err) {
      showNotification("error", err?.data?.message);
      onCancel?.();
    }
  };

  return (
    <div className="h-full bg-dark-200 p-7">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-3 flex gap-5 rounded-lg bg-dark-100 p-7"
      >
        <div className="flex w-full flex-col gap-4 p-4">
          <div className="mx-auto">
            <ImageUpload fileList={fileList} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="name"
              label="Tên diễn viên"
              Component={InputField}
              error={errors?.name?.message}
              // defaultValue={genre?.name}
            />
            <FormField
              control={control}
              name="otherName"
              label="Tên gọi khác"
              Component={InputField}
            />
          </div>
          <FormField
            control={control}
            name="biography"
            label="Tiểu sử"
            Component={(props) => <TextArea {...props} rows={6} />}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={control}
              name="birthDate"
              label="Ngày sinh"
              Component={(props) => (
                <DatePicker {...props} className="w-full" size="large" />
              )}
            />
            <FormField
              control={control}
              name="gender"
              label="Giới tính"
              Component={(props) => (
                <Select
                  {...props}
                  className="w-full"
                  size="large"
                  options={genderOptions}
                  placeholder="Chọn giới tính"
                />
              )}
            />
            <FormField
              control={control}
              name="placeOfBirth"
              label="Nơi sinh"
              Component={InputField}
              defaultValue={actor?.placeOfBirth}
            />
          </div>

          <div className="mt-4 flex justify-center gap-10">
            <Button
              color="cyan"
              variant="solid"
              htmlType="submit"
              size="large"
              loading={isUpdate ? isUpdateLoading : isCreateLoading}
            >
              {isUpdate ? "Cập nhật" : "Thêm"}
            </Button>
            <Button
              size="large"
              color="red"
              variant="solid"
              onClick={handleCancelModal}
            >
              Thoát
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ActorForm;
