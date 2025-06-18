/* eslint-disable no-unused-vars */
import { PlusCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Tabs, Popconfirm, message, Empty } from "antd";
import { Children, useEffect, useState } from "react";
import EpisodeList from "@pages/admin/episode/EpisodeList";
import { useLocation, useParams } from "react-router-dom";
import {
  useGetVideoVersionQuery,
  useDeleteVideoVersionMutation,
} from "@service/admin/videoVersionApi";
import { useLazyGetEpisodesQuery } from "@service/admin/episodeApi";
import EpisodeFormInfo from "@pages/admin/movie/EpisodeFormInfo";
import GenericModal from "@context/GenericModal";
import VideoTypeSelection from "./VideoTypeSelection";
import { useNotification } from "@hooks/useNotification";
import "@styles/styles.css";
import { videoVersionTypes } from "@consts/videoVersionTypes";
import VideoVersionCard from "@components/common/VideoVersionCard";
import { useEpisodeMutations } from "@hooks/useEpisodeMutations";
import ConfirmDeleteModal from "@pages/admin/ConfirmDeleteModal";

const VideoVersionManage = () => {
  const { movieId } = useParams();
  const [activeTab, setActiveTab] = useState(null);
  const location = useLocation();
  const movieType = location.state?.movieType;
  const videoVersionsResponse = useGetVideoVersionQuery(movieId);
  const [getEpisode, { data: episodeData, isLoading }] =
    useLazyGetEpisodesQuery();
  const [deleteVideoVersion] = useDeleteVideoVersionMutation();

  useEffect(() => {
    if (videoVersionsResponse.isSuccess) {
      const firstVideoVersion = videoVersionsResponse.data.data[0];
      if (firstVideoVersion) {
        setActiveTab(firstVideoVersion.id);
        getEpisode({
          videoVersionId: firstVideoVersion.id,
        });
      } else {
        setActiveTab(null);
      }
    }
  }, [videoVersionsResponse, setActiveTab, getEpisode]);
  const { showNotification } = useNotification();

  // Handle deleting a video version
  const handleDeleteVideoVersion = async (videoVersionId, videoType) => {
    try {
      await deleteVideoVersion(videoVersionId).unwrap();
      showNotification(
        "success",
        `Đã xóa bản chiếu ${videoVersionTypes[videoType].label} thành công!`,
      );
      videoVersionsResponse.refetch();

      // If we deleted the active tab, select another tab if available
      if (videoVersionId === activeTab) {
        const remainingVersions = videoVersionsResponse.data.data.filter(
          (version) => version.id !== videoVersionId,
        );

        if (remainingVersions.length > 0) {
          setActiveTab(remainingVersions[0].id);
          getEpisode({ videoVersionId: remainingVersions[0].id });
        } else {
          setActiveTab(null);
        }
      }
    } catch (error) {
      console.error("Error deleting video version:", error);
      showNotification("error", `${error.data?.message || "Đã xảy ra lỗi"}`);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    getEpisode({ videoVersionId: key });
  };

  const [modalContent, setModalContent] = useState(null);
  const { handleDeleteEpisode } = useEpisodeMutations();

  // Handle opening the VideoTypeSelection modal
  const handleOpenVideoTypeSelectionModal = () => {
    // Lấy danh sách các videoType hiện tại từ API response
    const existingVideoTypes = videoVersionsResponse.isSuccess
      ? videoVersionsResponse.data.data.map((version) => version.videoType)
      : [];

    setModalContent({
      title: "Chọn loại bản chiếu",
      open: true,
      onCancel: () => setModalContent(null),
      Component: VideoTypeSelection,
      width: 350,
      componentProps: {
        movieId,
        existingVideoTypes,
        onSuccess: () => {
          setModalContent(null);
          // Refresh the video versions list
          videoVersionsResponse.refetch();
        },
        onCancel: () => setModalContent(null),
      },
    });
  };

  const handleOpenCreateEpisodeModal = () => {
    setModalContent({
      title: "Thêm tập phim",
      open: true,
      onCancel: () => setModalContent(null),
      Component: EpisodeFormInfo,
      width: 700,
      componentProps: {
        videoVersionId: activeTab,
        onSuccess: () => {
          setModalContent(null);
        },
        onCancel: () => setModalContent(null),
      },
    });
  };

  const handleOpenViewDetailEpisodeModal = ({ episodeId }) => {
    setModalContent({
      title: "Cập nhập tập phim",
      open: true,
      onCancel: () => setModalContent(null),
      Component: EpisodeFormInfo,
      width: 700,
      componentProps: {
        episodeId,
        isUpdate: true,
        onSuccess: () => {
          setModalContent(null);
        },
        onCancel: () => setModalContent(null),
      },
    });
  };
  const handleOpenDeleteEpisodeModal = (episodeId) => {
    setModalContent({
      title: "Xóa tập phim",
      open: true,
      onCancel: () => setModalContent(null),
      Component: ConfirmDeleteModal,
      componentProps: {
        itemType: "Tập phim",
        onConfirm: () => {
          handleDeleteEpisode({ episodeId });
          setModalContent(null);
        },
        onCancel: () => setModalContent(null),
      },
    });
  };

  // Tab items configuration with delete button
  const tabItems = videoVersionsResponse.isSuccess
    ? videoVersionsResponse.data.data.map((videoVersion) => ({
        key: videoVersion.id,
        label: (
          <div className="flex items-center gap-2">
            <span>{videoVersionTypes[videoVersion.videoType].label}</span>
            <Popconfirm
              title="Xóa bản chiếu"
              description={`Bạn có chắc muốn xóa bản chiếu ${videoVersionTypes[videoVersion.videoType].label}?`}
              onConfirm={(e) => {
                e.stopPropagation(); // Prevent tab from being selected
                handleDeleteVideoVersion(
                  videoVersion.id,
                  videoVersion.videoType,
                );
              }}
              onCancel={(e) => e.stopPropagation()} // Prevent tab from being selected
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button
                type="text"
                danger
                icon={<CloseCircleOutlined />}
                size="small"
                onClick={(e) => e.stopPropagation()} // Prevent tab from being selected when clicking the button
                className="ml-2 flex items-center"
              />
            </Popconfirm>
          </div>
        ),
        children: (
          <EpisodeList
            episodes={
              activeTab === videoVersion.id
                ? episodeData?.data?.result || []
                : []
            }
            handleOpenViewDetailEpisodeModal={handleOpenViewDetailEpisodeModal}
            handleOpenDeleteEpisodeModal={handleOpenDeleteEpisodeModal}
          />
        ),
      }))
    : [];

  const videoVersions =
    videoVersionsResponse.isSuccess &&
    Array.isArray(videoVersionsResponse.data?.data)
      ? videoVersionsResponse.data.data
      : [];

  return (
    <div className="mx-auto flex h-full w-full flex-col gap-5 bg-dark-200 p-10">
      <div className="flex justify-between">
        <p className="mb-3 text-[1.8vw] font-bold text-white">Các bản chiếu</p>
        <Button
          className="btn-create"
          type="primary"
          icon={<PlusCircleFilled size={50} />}
          onClick={handleOpenVideoTypeSelectionModal}
        >
          Thêm bản chiếu
        </Button>
      </div>
      <div className="rounded-lg bg-dark-100 p-5">
        {movieType === "SERIES" ? (
          <Tabs
            items={tabItems}
            onChange={handleTabChange}
            activeKey={activeTab}
            className="video-version-tabs"
            type="card"
            tabBarExtraContent={
              activeTab && (
                <Button
                  color="pink"
                  variant="outlined"
                  onClick={() => handleOpenCreateEpisodeModal()}
                >
                  Thêm tập phim
                </Button>
              )
            }
          />
        ) : (
          <div className="flex flex-wrap gap-5">
            {videoVersions.length > 0 ? (
              videoVersions.map((videoVersion) => (
                <VideoVersionCard
                  key={videoVersion.id}
                  videoVersion={videoVersion}
                  handleOpenViewDetailEpisodeModal={
                    handleOpenViewDetailEpisodeModal
                  }
                  handleDeleteVideoVersion={handleDeleteVideoVersion}
                />
              ))
            ) : (
              <Empty description="Không có bản chiếu" />
            )}
          </div>
        )}
      </div>
      {modalContent && <GenericModal {...modalContent} />}
    </div>
  );
};

export default VideoVersionManage;
