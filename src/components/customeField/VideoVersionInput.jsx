import React, { useState, useEffect } from "react";
import { Card, Button, Collapse, message, Typography, Alert } from "antd";
import {
  SaveOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import VideoSourceInput from "./VideoSourceInput";
import { useMovieCRUD } from "@hooks/useMovieCRUD";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;
const { Panel } = Collapse;

// setValue is passed to VideoSourceInput component
// eslint-disable-next-line no-unused-vars
const VideoVersionInput = ({ control, watch, errors, setValue, isUpdate }) => {
  const { movieId } = useParams();
  const [loadingStates, setLoadingStates] = useState({
    VIETSUB: false,
    VOICEOVER: false,
    DUBBED: false,
  });
  const { updateVideoVersions } = useMovieCRUD();
  const [debugInfo, setDebugInfo] = useState(null);

  // Lưu trữ giá trị ban đầu để so sánh
  const [initialValues, setInitialValues] = useState({
    VIETSUB: { videoSource: "url", videoUrl: "" },
    VOICEOVER: { videoSource: "url", videoUrl: "" },
    DUBBED: { videoSource: "url", videoUrl: "" },
  });

  // Initialize file lists state for each video version type
  const [fileListsState, setFileListsState] = useState({
    VIETSUB: [],
    VOICEOVER: [],
    DUBBED: [],
  });

  // Object to track if a version has been edited
  const [editedVersions, setEditedVersions] = useState({
    VIETSUB: false,
    VOICEOVER: false,
    DUBBED: false,
  });

  // Mapping videoType to display name
  const videoTypeNames = {
    VIETSUB: "Vietsub",
    VOICEOVER: "Lồng tiếng",
    DUBBED: "Thuyết minh",
  };

  // Hàm giúp kiểm tra URL hợp lệ
  const isValidUrl = (url) => {
    if (!url || url.trim() === "") return false;

    try {
      // Kiểm tra xem có thể tạo đối tượng URL hay không
      // Nếu URL không bắt đầu bằng http:// hoặc https://, thử thêm https://
      let urlToCheck = url.trim();
      if (
        !urlToCheck.startsWith("http://") &&
        !urlToCheck.startsWith("https://")
      ) {
        urlToCheck = "https://" + urlToCheck;
      }

      // eslint-disable-next-line no-new
      new URL(urlToCheck);
      return true;
    } catch {
      return false;
    }
  };

  // Debug function to check video data
  const checkVideoData = () => {
    // Get current video data
    const videoInfo = {
      VIETSUB: {
        source: watch("VIETSUB.videoSource") || "url",
        url: watch("VIETSUB.videoUrl") || "",
        hasFile: watch("VIETSUB.videoFile") != null,
        isValidUrl: isValidUrl(watch("VIETSUB.videoUrl")),
      },
      VOICEOVER: {
        source: watch("VOICEOVER.videoSource") || "url",
        url: watch("VOICEOVER.videoUrl") || "",
        hasFile: watch("VOICEOVER.videoFile") != null,
        isValidUrl: isValidUrl(watch("VOICEOVER.videoUrl")),
      },
      DUBBED: {
        source: watch("DUBBED.videoSource") || "url",
        url: watch("DUBBED.videoUrl") || "",
        hasFile: watch("DUBBED.videoFile") != null,
        isValidUrl: isValidUrl(watch("DUBBED.videoUrl")),
      },
    };

    // Kiểm tra xem có ít nhất một video URL hợp lệ hoặc file không
    const hasVietSubVideo =
      (videoInfo.VIETSUB.source === "url" && videoInfo.VIETSUB.isValidUrl) ||
      (videoInfo.VIETSUB.source === "upload" && videoInfo.VIETSUB.hasFile);

    const hasVoiceOverVideo =
      (videoInfo.VOICEOVER.source === "url" &&
        videoInfo.VOICEOVER.isValidUrl) ||
      (videoInfo.VOICEOVER.source === "upload" && videoInfo.VOICEOVER.hasFile);

    const hasDubbedVideo =
      (videoInfo.DUBBED.source === "url" && videoInfo.DUBBED.isValidUrl) ||
      (videoInfo.DUBBED.source === "upload" && videoInfo.DUBBED.hasFile);

    const hasAnyVideo = hasVietSubVideo || hasVoiceOverVideo || hasDubbedVideo;

    setDebugInfo({
      videoInfo,
      hasVietSubVideo,
      hasVoiceOverVideo,
      hasDubbedVideo,
      hasAnyVideo,
    });
  };

  useEffect(() => {
    // Call on mount to show initial state
    checkVideoData();
  }, []);

  // Cập nhật giá trị ban đầu khi form được khởi tạo
  useEffect(() => {
    // Thiết lập giá trị ban đầu cho mỗi phiên bản
    const vietsub = {
      videoSource: watch("VIETSUB.videoSource") || "url",
      videoUrl: watch("VIETSUB.videoUrl") || "",
    };

    const voiceover = {
      videoSource: watch("VOICEOVER.videoSource") || "url",
      videoUrl: watch("VOICEOVER.videoUrl") || "",
    };

    const dubbed = {
      videoSource: watch("DUBBED.videoSource") || "url",
      videoUrl: watch("DUBBED.videoUrl") || "",
    };

    setInitialValues({
      VIETSUB: vietsub,
      VOICEOVER: voiceover,
      DUBBED: dubbed,
    });

    console.log("Initial video values set:", { vietsub, voiceover, dubbed });
  }, []);

  // Mark a version as edited when it changes
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // Chỉ kiểm tra khi giá trị thay đổi bởi người dùng, không phải khi khởi tạo
      if (!name || type !== "change") return;

      if (name.startsWith("VIETSUB.")) {
        const currentSource = watch("VIETSUB.videoSource");
        const currentUrl = watch("VIETSUB.videoUrl");
        const initial = initialValues.VIETSUB;

        // Chỉ đánh dấu đã chỉnh sửa nếu thực sự thay đổi so với giá trị ban đầu
        const hasChanged =
          currentSource !== initial.videoSource ||
          currentUrl !== initial.videoUrl;
        setEditedVersions((prev) => ({ ...prev, VIETSUB: hasChanged }));
      } else if (name.startsWith("VOICEOVER.")) {
        const currentSource = watch("VOICEOVER.videoSource");
        const currentUrl = watch("VOICEOVER.videoUrl");
        const initial = initialValues.VOICEOVER;

        const hasChanged =
          currentSource !== initial.videoSource ||
          currentUrl !== initial.videoUrl;
        setEditedVersions((prev) => ({ ...prev, VOICEOVER: hasChanged }));
      } else if (name.startsWith("DUBBED.")) {
        const currentSource = watch("DUBBED.videoSource");
        const currentUrl = watch("DUBBED.videoUrl");
        const initial = initialValues.DUBBED;

        const hasChanged =
          currentSource !== initial.videoSource ||
          currentUrl !== initial.videoUrl;
        setEditedVersions((prev) => ({ ...prev, DUBBED: hasChanged }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, initialValues]);

  const getFileList = (type) => fileListsState[type] || [];

  const setFileList = (type, newFileList) => {
    setFileListsState((prev) => ({
      ...prev,
      [type]: newFileList,
    }));

    // Mark this version as edited since file has changed
    setEditedVersions((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  // Handle updating a single video version
  const handleUpdateVersion = async (type) => {
    if (!movieId) {
      message.warning(
        "Vui lòng lưu thông tin phim trước khi cập nhật phiên bản video!",
      );
      return;
    }

    // If this version hasn't been edited, no need to update
    if (!editedVersions[type]) {
      message.info(`Phiên bản ${videoTypeNames[type]} chưa được thay đổi!`);
      return;
    }

    // Kiểm tra video data trước khi submit
    checkVideoData();

    try {
      // Update loading state
      setLoadingStates((prev) => ({ ...prev, [type]: true }));

      // Get form data for this version
      const videoData = {
        videoType: type,
        videoSource: watch(`${type}.videoSource`),
        videoUrl:
          watch(`${type}.videoSource`) === "url"
            ? watch(`${type}.videoUrl`)
            : null,
        videoFile:
          watch(`${type}.videoSource`) === "upload"
            ? watch(`${type}.videoFile`)
            : null,
      };

      // Don't update if no URL or file provided
      if (
        (videoData.videoSource === "url" &&
          (!videoData.videoUrl || videoData.videoUrl.trim() === "")) ||
        (videoData.videoSource === "upload" && !videoData.videoFile)
      ) {
        message.warning(
          `Vui lòng nhập URL hoặc chọn file cho phiên bản ${videoTypeNames[type]}!`,
        );
        setLoadingStates((prev) => ({ ...prev, [type]: false }));
        return;
      }

      // Gửi dữ liệu về updateVideoVersions sẽ xử lý chuyển đổi sang định dạng phù hợp với API
      await updateVideoVersions(movieId, [videoData]);
      message.success(
        `Đã cập nhật phiên bản ${videoTypeNames[type]} thành công!`,
      );

      // Cập nhật giá trị ban đầu và đặt lại trạng thái đã chỉnh sửa
      setInitialValues((prev) => ({
        ...prev,
        [type]: {
          videoSource: videoData.videoSource,
          videoUrl: videoData.videoUrl || "",
        },
      }));

      // Reset edited state after successful update
      setEditedVersions((prev) => ({ ...prev, [type]: false }));
    } catch (error) {
      console.error(`Lỗi khi cập nhật phiên bản ${type}:`, error);
      message.error(`Cập nhật phiên bản ${videoTypeNames[type]} thất bại!`);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [type]: false }));
    }
  };

  // Render a single video version panel
  const renderVersionPanel = (type) => {
    // Kiểm tra URL có hợp lệ không nếu nguồn là URL
    const currentUrl = watch(`${type}.videoUrl`);
    const currentSource = watch(`${type}.videoSource`);
    const isUrlInvalid =
      currentSource === "url" && currentUrl && !isValidUrl(currentUrl);

    return (
      <Card
        className="mb-4 border-gray-300 bg-dark-100"
        title={
          <div className="flex items-center justify-between">
            <span className="text-white">{videoTypeNames[type]}</span>
            {isUpdate && (
              <Button
                type="primary"
                icon={
                  loadingStates[type] ? <LoadingOutlined /> : <SaveOutlined />
                }
                loading={loadingStates[type]}
                onClick={() => handleUpdateVersion(type)}
                disabled={!editedVersions[type]}
              >
                {loadingStates[type] ? "Đang lưu..." : "Lưu phiên bản"}
              </Button>
            )}
          </div>
        }
      >
        <div className="video-source-container">
          <VideoSourceInput
            control={control}
            watch={watch}
            errors={errors}
            fileList={getFileList(type)}
            setFileList={(newFileList) => setFileList(type, newFileList)}
            fieldNamePrefix={`${type}.`}
          />
        </div>

        {isUrlInvalid && (
          <Alert
            message="URL không hợp lệ"
            description={`URL '${currentUrl}' không đúng định dạng. URL phải bắt đầu bằng http:// hoặc https:// và có định dạng hợp lệ.`}
            type="error"
            showIcon
            className="mb-2 mt-2"
          />
        )}

        {debugInfo && debugInfo.videoInfo && (
          <div className="mt-2 text-xs text-white opacity-60">
            <div>
              Trạng thái:{" "}
              {editedVersions[type] ? "Đã chỉnh sửa" : "Chưa thay đổi"}
            </div>
            <div>Source: {debugInfo.videoInfo[type].source}</div>
            <div>URL: {debugInfo.videoInfo[type].url || "(Không có)"}</div>
            <div>
              URL hợp lệ: {debugInfo.videoInfo[type].isValidUrl ? "✓" : "✗"}
            </div>
            <div>
              File: {debugInfo.videoInfo[type].hasFile ? "Có" : "Không có"}
            </div>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <Button
          icon={<InfoCircleOutlined />}
          onClick={checkVideoData}
          size="small"
        >
          Kiểm tra dữ liệu video
        </Button>

        {debugInfo && (
          <div className="text-sm text-white">
            {debugInfo.hasAnyVideo ? (
              <span className="text-green-500">✓ Có ít nhất một video</span>
            ) : (
              <span className="text-red-500">✗ Chưa có video nào</span>
            )}
          </div>
        )}

        <Button
          size="small"
          onClick={() => {
            console.log("DEBUG VIETSUB VALUE:", {
              source: watch("VIETSUB.videoSource"),
              url: watch("VIETSUB.videoUrl"),
              sourceNested: watch("VIETSUB")?.videoSource,
              urlNested: watch("VIETSUB")?.videoUrl,
            });
          }}
        >
          Log Value
        </Button>
      </div>

      {!debugInfo?.hasAnyVideo && (
        <Alert
          message="Cảnh báo"
          description="Bạn chưa cung cấp video nào. Hãy nhập ít nhất một URL hoặc upload ít nhất một file video."
          type="warning"
          showIcon
          className="mb-4"
        />
      )}

      <div className="video-versions-container">
        {renderVersionPanel("VIETSUB")}
        {renderVersionPanel("VOICEOVER")}
        {renderVersionPanel("DUBBED")}
      </div>
    </div>
  );
};

export default VideoVersionInput;
