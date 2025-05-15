import React from "react";
import { Button, Empty, Typography } from "antd";
import { useCreateVideoVersionMutation } from "@service/admin/videoVersionApi";
import { useNotification } from "@hooks/useNotification";

const { Text } = Typography;

const videoVersionTypes = {
  VIETSUB: "Phụ đề tiếng Việt",
  VOICEOVER: "Lồng tiếng",
  DUBBED: "Thuyết minh",
};

const VideoTypeSelection = ({
  movieId,
  onSuccess,
  existingVideoTypes = [],
}) => {
  const [createVideoVersion, { isLoading }] = useCreateVideoVersionMutation();
  const { showNotification } = useNotification();

  // Lọc ra những videoType chưa có
  const availableVideoTypes = Object.entries(videoVersionTypes).filter(
    ([type]) => !existingVideoTypes.includes(type),
  );

  const handleCreateVersion = async (videoType) => {
    try {
      await createVideoVersion({
        movieId,
        videoType,
      }).unwrap();

      showNotification(
        "success",
        `Đã thêm bản chiếu ${videoVersionTypes[videoType]} thành công!`,
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating video version:", error);
      showNotification(
        "error",
        error?.data?.message ||
          `Thêm bản chiếu ${videoVersionTypes[videoType]} thất bại!`,
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-dark-200 p-6">
      <div className="flex w-full flex-col gap-5">
        {availableVideoTypes.length > 0 ? (
          availableVideoTypes.map(([type, label]) => (
            <Button
              key={type}
              className="border-none bg-createButton p-5 font-bold text-white hover:!bg-createButton/80 hover:text-white"
              onClick={() => handleCreateVersion(type)}
              loading={isLoading}
            >
              <Text className="text-lg text-white">{label}</Text>
            </Button>
          ))
        ) : (
          <Empty
            description={
              <Text className="text-white">
                Tất cả các loại bản chiếu đã được thêm
              </Text>
            }
            className="my-8"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
    </div>
  );
};

export default VideoTypeSelection;
