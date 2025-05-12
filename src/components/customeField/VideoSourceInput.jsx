import React, { useState } from "react";
import { Radio, Button, Upload, message, Spin } from "antd";
import { Controller } from "react-hook-form";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import FormField from "@components/FormField";
import CustomInputField from "@components/customeField/CustomInputField";
import "@styles/styles.css";
/**
 * Component xử lý nhập URL video hoặc upload file video
 */
const VideoSourceInput = ({
  control,
  watch,
  errors,
  fileList,
  setFileList,
  fieldNamePrefix = "",
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Add prefix to field names
  const videoSourceName = `${fieldNamePrefix}videoSource`;
  const videoUrlName = `${fieldNamePrefix}videoUrl`;
  const videoFileName = `${fieldNamePrefix}videoFile`;

  // Theo dõi nguồn video được chọn
  const videoSource = watch(videoSourceName);

  // Xử lý upload video
  const handleFileChange = (info) => {
    const { status, name, size } = info.file;

    // Cập nhật trạng thái uploading
    if (status === "uploading") {
      setUploading(true);
      return;
    }

    // Khi không còn uploading
    if (status === "done" || status === "error" || status === "removed") {
      setUploading(false);
    }

    // Chỉ cho phép 1 file
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);

    // Kiểm tra kích thước file (max 500MB)
    const isLt500M = size / 1024 / 1024 < 500;
    if (!isLt500M) {
      message.error("File không được vượt quá 500MB!");
      return;
    }

    // Kiểm tra định dạng file
    const isVideoFormat = name.match(/\.(mp4|mov|avi|mkv)$/i);
    if (!isVideoFormat) {
      message.error("Chỉ chấp nhận định dạng video (mp4, mov, avi, mkv)!");
      return;
    }

    if (status === "done") {
      message.success(`${info.file.name} đã tải lên thành công.`);
    } else if (status === "error") {
      message.error(`${info.file.name} tải lên thất bại.`);
    }

    setFileList(newFileList);
  };

  // Helper function to get error message for a field
  const getError = (fieldName) => {
    if (!errors || !fieldName) return null;

    // Handle nested paths like 'videoVersions.0.videoUrl'
    const parts = fieldName.split(".");
    let current = errors;

    for (const part of parts) {
      if (!current[part]) return null;
      current = current[part];
    }

    return current?.message;
  };

  return (
    <div>
      <label className="mb-2 block text-white">Nguồn video</label>
      <Controller
        name={videoSourceName}
        control={control}
        render={({ field }) => (
          <Radio.Group {...field} className="mb-4" buttonStyle="solid">
            <Radio.Button value="url" className="radio-url-btn">
              Nhập URL
            </Radio.Button>
            <Radio.Button value="upload" className="radio-upload-btn">
              Upload video
            </Radio.Button>
          </Radio.Group>
        )}
      />

      {/* Hiển thị form tương ứng với nguồn video */}
      {videoSource != null && videoSource === "url" ? (
        <div>
          <FormField
            control={control}
            name={videoUrlName}
            label="URL video"
            Component={CustomInputField}
            error={getError(videoUrlName)}
          />

          {/* Preview video nếu có URL */}
          {watch(videoUrlName) && (
            <div className="mt-4">
              <div className="mb-2 flex items-center">
                <label className="mr-4 text-white">Xem thử video</label>
                <Button
                  size="medium"
                  color="pink"
                  variant="filled"
                  onClick={() => {
                    setShowPreview((prev) => !prev);
                    setVideoError(false); // Reset lỗi khi bật/tắt preview
                  }}
                >
                  {showPreview ? "Ẩn video" : "Xem video"}
                </Button>
              </div>

              {showPreview && (
                <div className="w-full overflow-hidden rounded">
                  <div className="bg-black">
                    <ReactPlayer
                      url={
                        watch(videoUrlName).includes("player.phimapi.com")
                          ? watch(videoUrlName).split("url=")[1] // Trích xuất URL thực từ player URL
                          : watch(videoUrlName)
                      }
                      controls={true}
                      width="100%"
                      height="450px"
                      config={{
                        file: {
                          forceVideo: true,
                          attributes: {
                            controlsList: "nodownload",
                          },
                          // Cấu hình HLS
                          hlsOptions: {
                            enableWorker: true,
                            debug: false,
                          },
                        },
                      }}
                      onError={(e) => {
                        console.error("Lỗi phát video:", e);
                        setVideoError(true);
                      }}
                      onReady={() => {
                        setVideoError(false);
                      }}
                    />
                  </div>

                  {videoError && (
                    <div className="mt-2 rounded bg-red-100 px-2 py-1 text-sm text-red-700">
                      Không thể phát video. URL không hợp lệ hoặc không hỗ trợ.
                      Hãy thử mở trong tab mới.
                    </div>
                  )}

                  <div className="mt-2">
                    <Button
                      size="small"
                      type="link"
                      href={watch(videoUrlName)}
                      target="_blank"
                      className="text-blue-500"
                    >
                      Mở video trong tab mới
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          <label className="mb-2 block text-white">Upload file video</label>
          <Controller
            name={videoFileName}
            control={control}
            render={({ field }) => (
              <div>
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={(info) => {
                    handleFileChange(info);
                    // Quan trọng: Set giá trị cho field khi có file
                    if (info.fileList.length > 0) {
                      field.onChange(info.fileList[0]?.originFileObj);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  beforeUpload={() => false}
                  accept="video/*"
                  maxCount={1}
                  showUploadList={{
                    showRemoveIcon: true,
                    removeIcon: !uploading && (
                      <Button
                        size="small"
                        className="mr-8"
                        color="danger"
                        variant="outlined"
                      >
                        Xóa
                      </Button>
                    ),
                  }}
                >
                  <Button
                    icon={uploading ? <LoadingOutlined /> : <UploadOutlined />}
                    // className="btn-create"
                    color="pink"
                    variant="filled"
                    disabled={uploading}
                  >
                    {uploading ? "Đang xử lý..." : "Chọn file video"}
                  </Button>
                </Upload>

                {uploading && (
                  <div className="mt-2 flex items-center">
                    <Spin size="small" />
                    <span className="ml-2 text-gray-300">
                      Đang xử lý file video...
                    </span>
                  </div>
                )}
              </div>
            )}
          />
          {getError(videoFileName) && (
            <div className="mt-1 text-red-500">{getError(videoFileName)}</div>
          )}
          <p className="mt-2 text-xs text-gray-400">
            Hỗ trợ định dạng: MP4, MOV, AVI, MKV. Kích thước tối đa: 500MB
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoSourceInput;
