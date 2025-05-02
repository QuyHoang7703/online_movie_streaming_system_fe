import FormField from "@components/FormField";
import { Button, Spin } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInputField from "@components/customeField/CustomInputField";
import CustomInputNumberField from "@components/customeField/CustomInputNumberField";
import { useGetDetailEpisodeQuery } from "@service/admin/episodeApi";
import VideoSourceInput from "@components/customeField/VideoSourceInput";
import { useEpisodeMutations } from "@hooks/useEpisodeMutations";
import { LoadingOutlined } from "@ant-design/icons";
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
  movieId = null,
  onSuccess,
  episodeId = null,
}) => {
  const { showLoading, hideLoading } = useLoading();
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

  console.log({ errors });

  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);

  const { data: episodeDetailResponse } = useGetDetailEpisodeQuery(episodeId);
  const episodeDetail = episodeDetailResponse?.data;

  // Set data khi xem chi tiết
  useEffect(() => {
    if (isUpdate && episodeDetail) {
      reset({
        title: episodeDetail.title,
        episodeNumber: episodeDetail.episodeNumber,
        duration: episodeDetail.duration,
        videoUrl: episodeDetail.videoUrl,
        videoSource: "url",
      });
    }
  }, [isUpdate, episodeDetail, reset]);

  const {
    handleCreateEpisode,
    handleUpdateEpisode,
    isCreateLoading,
    isUpdateLoading,
  } = useEpisodeMutations();

  // Hiển thị loading khi bắt đầu và ẩn khi kết thúc
  useEffect(() => {
    console.log("Loading state changed:", { isCreateLoading, isUpdateLoading });

    if (isCreateLoading || isUpdateLoading) {
      showLoading();
    } else {
      // Đảm bảo luôn gọi hideLoading khi không còn loading
      hideLoading();
    }

    // Cleanup function để đảm bảo hideLoading được gọi khi component unmount
    return () => {
      hideLoading();
    };
  }, [isCreateLoading, isUpdateLoading, showLoading, hideLoading]);

  const handleOnSubmit = (data) => {
    // Xử lý submit
    if (!isUpdate) {
      handleCreateEpisode({
        seriesMovieId: movieId,
        episodeInfo: data,
        video: fileList[0]?.originFileObj,
        onSuccess: () => {
          // Force ẩn loading và gọi callback
          hideLoading();
          onSuccess?.();
        },
      });
    } else {
      handleUpdateEpisode({
        episodeId: episodeId,
        episodeInfo: data,
        video: fileList[0]?.originFileObj,
        onSuccess: () => {
          // Force ẩn loading và gọi callback
          hideLoading();
          onSuccess?.();
        },
      });
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
                label="Số tập"
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
                loading={!isUpdate ? isCreateLoading : isUpdateLoading}
                icon={
                  (!isUpdate ? isCreateLoading : isUpdateLoading) ? (
                    <LoadingOutlined />
                  ) : null
                }
                disabled={!isUpdate ? isCreateLoading : isUpdateLoading}
              >
                {(!isUpdate ? isCreateLoading : isUpdateLoading)
                  ? "Đang xử lý..."
                  : !isUpdate
                    ? "Thêm"
                    : "Cập nhập"}
              </Button>
              <Button
                size="large"
                color="red"
                variant="solid"
                onClick={() => {
                  navigate("/admin/movies");
                }}
                className="bg-red-500 text-white"
                disabled={!isUpdate ? isCreateLoading : isUpdateLoading}
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
