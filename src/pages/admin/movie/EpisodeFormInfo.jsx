import FormField from "@components/FormField";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInputField from "@components/customeField/CustomInputField";
import CustomInputNumberField from "@components/customeField/CustomInputNumberField";
import VideoSourceInput from "@components/customeField/VideoSourceInput";
import { LoadingOutlined } from "@ant-design/icons";
import { useLazyGetDetailEpisodeQuery } from "@service/admin/episodeApi";
import { useEpisodeMutations } from "@hooks/useEpisodeMutations";
import { useLoading } from "@context/LoadingContext";

// Schema validation
const episodeSchema = yup.object().shape({
  title: yup.string().required("Tên tập không được để trống"),
  episodeNumber: yup
    .number()
    .required("Số tập không được để trống")
    .positive("Số tập phải là số dương"),
  duration: yup.number().positive("Thời lượng phải là số dương"),
  videoSource: yup.string().required("Vui lòng chọn nguồn video"),
  videoUrl: yup.string().when("videoSource", {
    is: "url",
    then: (schema) =>
      schema.required("URL video không được để trống").url("URL không hợp lệ"),
    otherwise: (schema) => schema.nullable(),
  }),
  videoFile: yup.mixed().when("videoSource", {
    is: "upload",
    then: (schema) => schema.required("File video không được để trống"),
    otherwise: (schema) => schema.nullable(),
  }),
});

const EpisodeFormInfo = ({
  isUpdate = false,
  onSuccess,
  onCancel,
  episodeId = null,
  videoVersionId = null,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(episodeSchema),
    defaultValues: {
      videoSource: "url", // mặc định chọn option nhập URL
    },
  });

  const [fileList, setFileList] = useState([]);
  const [getEpisodeDetail, { data: episodeDetailData, isSuccess }] =
    useLazyGetDetailEpisodeQuery();

  const {
    handleUpdateEpisode,
    handleCreateEpisode,
    isCreateLoading,
    isUpdateLoading,
  } = useEpisodeMutations();

  const isLoading = isUpdate ? isUpdateLoading : isCreateLoading;
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  useEffect(() => {
    if (isUpdate && episodeId) {
      getEpisodeDetail(episodeId);
    }
  }, [isUpdate, episodeId, getEpisodeDetail]);

  useEffect(() => {
    if (isSuccess) {
      const episodeDetail = episodeDetailData.data;
      reset({
        title: episodeDetail.title,
        episodeNumber: episodeDetail.episodeNumber,
        duration: episodeDetail.duration,
        videoUrl: episodeDetail.videoUrl,
        videoSource: "url",
      });
    }
  }, [isSuccess, episodeDetailData, reset]);

  const handleOnSubmit = async (data) => {
    console.log("data", data);
    showLoading();

    try {
      if (isUpdate && episodeId) {
        // Cập nhật episode hiện có
        await handleUpdateEpisode({
          episodeId,
          episodeInfo: data,
          video: data.videoSource === "upload" ? data.videoFile : null,
        });
      } else {
        // Tạo episode mới
        await handleCreateEpisode({
          videoVersionId,
          episodeInfo: data,
          video: data.videoSource === "upload" ? data.videoFile : null,
        });
      }
      onSuccess?.();
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="h-full bg-dark-200 p-2">
      <form
        className="mt-4 flex flex-col gap-5 rounded-lg"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="flex w-full flex-col gap-5">
          <FormField
            control={control}
            name="title"
            label="Tên tập"
            Component={CustomInputField}
            error={errors.title?.message}
          />
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <FormField
                control={control}
                name="episodeNumber"
                label="Tập số"
                Component={CustomInputNumberField}
                error={errors.episodeNumber?.message}
              />
            </div>

            <div className="w-1/2">
              <FormField
                control={control}
                name="duration"
                label="Thời lượng (phút)"
                Component={CustomInputNumberField}
                error={errors.duration?.message}
              />
            </div>
          </div>

          {/* Sử dụng component VideoSourceInput */}
          <VideoSourceInput
            control={control}
            watch={watch}
            errors={errors}
            fileList={fileList}
            setFileList={setFileList}
          />

          <div>
            <div className="mt-4 flex justify-center gap-10">
              <Button
                color="cyan"
                variant="solid"
                htmlType="submit"
                size="large"
                className="bg-blue-500 text-white"
                loading={isLoading}
                icon={isLoading ? <LoadingOutlined /> : null}
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : !isUpdate ? "Thêm" : "Cập nhập"}
              </Button>
              <Button
                size="large"
                color="red"
                variant="solid"
                onClick={onCancel}
                className="bg-red-500 text-white"
                disabled={isLoading}
              >
                Thoát
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EpisodeFormInfo;
